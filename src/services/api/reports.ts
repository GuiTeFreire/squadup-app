import type { ApiReport } from "../adapters/types";
import type { ReportCreatePayload } from "../adapters/report";
import { apiClient } from "./client";

export type ReportAction = "archive" | "warn" | "ban";

export async function fetchReports(): Promise<ApiReport[]> {
  return apiClient.get<ApiReport[]>("/reports");
}

export async function createReport(payload: ReportCreatePayload): Promise<ApiReport> {
  return apiClient.post<ApiReport>("/reports", payload);
}

export async function updateReportAction(
  reportId: string,
  action: ReportAction
): Promise<ApiReport> {
  return apiClient.patch<ApiReport>(`/reports/${reportId}`, { action });
}
