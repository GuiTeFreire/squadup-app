import type { Report, ReportReason } from "../../types";
import type { ApiReport } from "./types";
import { toMatchRef } from "./match";
import { toPublicUser } from "./user";

export function toReport(api: ApiReport): Report {
  return {
    id: api.id,
    reportedUser: toPublicUser(api.reported_user),
    reporterUser: toPublicUser(api.reporter),
    match: api.match ? toMatchRef(api.match) : undefined,
    reason: api.reason,
    description: api.description,
    createdAt: api.created_at,
    status: api.status,
  };
}

export interface ReportCreatePayload {
  reported_user_id: string;
  match_id?: string;
  reason: ReportReason;
  description: string;
}
