import { render, screen } from "@testing-library/react-native";
import React from "react";

import MessageBubble from "../MessageBubble";
import type { Message } from "../../types";
import { formatMessageTime } from "../../utils/date";

const ISO_09_10 = new Date(2026, 6, 8, 9, 10).toISOString();
const ISO_09_15 = new Date(2026, 6, 8, 9, 15).toISOString();
const ISO_09_00 = new Date(2026, 6, 8, 9, 0).toISOString();

const BASE_USER_MESSAGE: Message = {
  id: "msg-1",
  matchId: "match-1",
  senderId: "user-2",
  senderName: "Ana Lima",
  senderPhotoUrl: "https://i.pravatar.cc/150?img=5",
  text: "Galera, confirmem presença!",
  createdAt: ISO_09_10,
  type: "message",
};

const OWN_MESSAGE: Message = {
  ...BASE_USER_MESSAGE,
  id: "msg-2",
  senderId: "user-1",
  senderName: "Guilherme Freire",
  text: "Estarei lá!",
  createdAt: ISO_09_15,
};

const SYSTEM_MESSAGE: Message = {
  id: "msg-sys-1",
  matchId: "match-1",
  senderId: "system",
  senderName: "Sistema",
  text: "Partida amanhã às 09:00! ⚽",
  createdAt: ISO_09_00,
  type: "system",
};

describe("MessageBubble", () => {
  describe("mensagem de outro usuário", () => {
    it("renderiza o texto da mensagem", () => {
      render(<MessageBubble message={BASE_USER_MESSAGE} isOwn={false} />);
      expect(screen.getByText("Galera, confirmem presença!")).toBeTruthy();
    });

    it("renderiza o nome do remetente", () => {
      render(<MessageBubble message={BASE_USER_MESSAGE} isOwn={false} />);
      expect(screen.getByText("Ana Lima")).toBeTruthy();
    });

    it("renderiza o horário da mensagem", () => {
      render(<MessageBubble message={BASE_USER_MESSAGE} isOwn={false} />);
      expect(screen.getByText(formatMessageTime(ISO_09_10))).toBeTruthy();
    });
  });

  describe("mensagem própria", () => {
    it("renderiza o texto da mensagem", () => {
      render(<MessageBubble message={OWN_MESSAGE} isOwn={true} />);
      expect(screen.getByText("Estarei lá!")).toBeTruthy();
    });

    it("renderiza o horário da mensagem", () => {
      render(<MessageBubble message={OWN_MESSAGE} isOwn={true} />);
      expect(screen.getByText(formatMessageTime(ISO_09_15))).toBeTruthy();
    });

    it("não renderiza o nome do remetente na própria mensagem", () => {
      render(<MessageBubble message={OWN_MESSAGE} isOwn={true} />);
      expect(screen.queryByText("Guilherme Freire")).toBeNull();
    });
  });

  describe("mensagem de sistema", () => {
    it("renderiza o texto do aviso de sistema", () => {
      render(<MessageBubble message={SYSTEM_MESSAGE} isOwn={false} />);
      expect(screen.getByText("Partida amanhã às 09:00! ⚽")).toBeTruthy();
    });

    it("não renderiza nome de remetente em mensagem de sistema", () => {
      render(<MessageBubble message={SYSTEM_MESSAGE} isOwn={false} />);
      expect(screen.queryByText("Sistema")).toBeNull();
    });

    it("não renderiza horário em mensagem de sistema", () => {
      render(<MessageBubble message={SYSTEM_MESSAGE} isOwn={false} />);
      expect(screen.queryByText(formatMessageTime(ISO_09_00))).toBeNull();
    });
  });
});
