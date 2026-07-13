import type { Message } from "../../types";
import type { ApiMessage } from "./types";

export function toMessage(api: ApiMessage): Message {
  return {
    id: api.id,
    matchId: api.match_id,
    senderId: api.sender.id,
    senderName: api.sender.name,
    senderPhotoUrl: api.sender.photo_url ?? undefined,
    text: api.text,
    createdAt: api.created_at,
    type: api.type,
  };
}
