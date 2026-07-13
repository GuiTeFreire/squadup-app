import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

import { toMessage } from "../services/adapters/message";
import { fetchMessages, postMessage } from "../services/api/messages";
import { queryKeys } from "../services/queryKeys";
import type { Message } from "../types";

const PAGE_SIZE = 30;
const MAX_PAGE_SIZE = 100;

export interface UseMessagesResult {
  messages: Message[];
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  loadMore: () => void;
  sendMessage: (text: string) => void;
}

export function useMessages(matchId: string): UseMessagesResult {
  const queryClient = useQueryClient();

  // `GET /matches/{id}/messages` devolve em ordem cronológica crescente (mais antiga
  // primeiro) e não expõe o total de mensagens — sem contagem, não dá para paginar de trás
  // pra frente com skip/limit. Em vez disso, cada "página" busca do início (skip=0) com um
  // limit maior (até o teto de 100 do backend), trocando eficiência de rede por corretude.
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: queryKeys.messages(matchId),
    queryFn: async ({ pageParam }) => {
      const apiMessages = await fetchMessages(matchId, { skip: 0, limit: pageParam });
      return apiMessages.map(toMessage);
    },
    initialPageParam: PAGE_SIZE,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length < lastPageParam || lastPageParam >= MAX_PAGE_SIZE
        ? undefined
        : Math.min(lastPageParam + PAGE_SIZE, MAX_PAGE_SIZE),
  });

  // Cada página já contém o histórico inteiro buscado até então (skip=0); usa só a última.
  // Backend devolve cronológico crescente; a FlatList é invertida, então inverte aqui para
  // que o item 0 (topo visual) seja a mensagem mais recente.
  const messages = useMemo(() => {
    const lastPage = data?.pages.at(-1) ?? [];
    return [...lastPage].reverse();
  }, [data]);

  const { mutate: sendMessage } = useMutation({
    mutationFn: (text: string) => postMessage(matchId, text),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.messages(matchId) });
    },
  });

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    messages,
    isLoading,
    isFetchingMore: isFetchingNextPage,
    hasMore: hasNextPage ?? false,
    loadMore,
    sendMessage: (text: string) => {
      const trimmed = text.trim();
      if (trimmed) sendMessage(trimmed);
    },
  };
}
