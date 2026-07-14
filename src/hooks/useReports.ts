import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toReport } from "../services/adapters/report";
import type { ReportCreatePayload } from "../services/adapters/report";
import { createReport, fetchReports, updateReportAction } from "../services/api/reports";
import type { ReportAction } from "../services/api/reports";
import { queryKeys } from "../services/queryKeys";
import type { Report } from "../types";

export interface UseReportsResult {
  reports: Report[];
  isLoading: boolean;
}

export function useReports(): UseReportsResult {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.reports(),
    queryFn: async () => (await fetchReports()).map(toReport),
  });

  return { reports: data ?? [], isLoading };
}

export function useCreateReport() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ReportCreatePayload) => createReport(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.reports() });
    },
  });

  return {
    submitReport: (
      payload: ReportCreatePayload,
      callbacks?: { onSuccess?: () => void; onError?: () => void }
    ) => mutate(payload, { onSuccess: callbacks?.onSuccess, onError: callbacks?.onError }),
    isSubmitting: isPending,
  };
}

export function useUpdateReportAction() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ reportId, action }: { reportId: string; action: ReportAction }) =>
      updateReportAction(reportId, action),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.reports() });
    },
  });

  return {
    updateReportAction: (
      reportId: string,
      action: ReportAction,
      callbacks?: { onSuccess?: () => void; onError?: () => void }
    ) =>
      mutate(
        { reportId, action },
        { onSuccess: callbacks?.onSuccess, onError: callbacks?.onError }
      ),
    isUpdating: isPending,
  };
}
