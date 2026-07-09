import { toMessage } from "../message";
import type { ApiMessage, ApiPublicUser } from "../types";

const API_SENDER: ApiPublicUser = {
  id: "user-1",
  name: "Ana Souza",
  photo_url: "https://example.com/avatar.jpg",
  age: 28,
  location: "São Paulo, SP",
  bio: null,
  favorite_sports: ["football"],
  level: "intermediate",
  is_verified: true,
  average_rating: 4.5,
  matches_played: 12,
};

describe("toMessage", () => {
  it("achata o sender expandido em senderId/senderName/senderPhotoUrl", () => {
    const api: ApiMessage = {
      id: "message-1",
      match_id: "match-1",
      sender: API_SENDER,
      text: "Confirmado, chego 10 minutos antes!",
      created_at: "2026-05-25T08:45:00Z",
      type: "message",
    };

    expect(toMessage(api)).toEqual({
      id: "message-1",
      matchId: "match-1",
      senderId: "user-1",
      senderName: "Ana Souza",
      senderPhotoUrl: "https://example.com/avatar.jpg",
      text: "Confirmado, chego 10 minutos antes!",
      createdAt: "2026-05-25T08:45:00Z",
      type: "message",
    });
  });

  it("converte photo_url nulo do sender em undefined", () => {
    const api: ApiMessage = {
      id: "message-1",
      match_id: "match-1",
      sender: { ...API_SENDER, photo_url: null },
      text: "Bem-vindos!",
      created_at: "2026-05-25T08:00:00Z",
      type: "system",
    };

    expect(toMessage(api).senderPhotoUrl).toBeUndefined();
  });
});
