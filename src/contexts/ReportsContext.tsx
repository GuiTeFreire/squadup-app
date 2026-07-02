import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import { MOCK_REPORTS } from "../mocks/reports";
import type { Report, ReportStatus } from "../types";

interface ReportsContextValue {
  reports: Report[];
  addReport: (report: Report) => void;
  updateReportStatus: (reportId: string, status: ReportStatus) => void;
}

const ReportsContext = createContext<ReportsContextValue | null>(null);

export function ReportsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);

  const addReport = useCallback((report: Report) => {
    setReports((prev) => [report, ...prev]);
  }, []);

  const updateReportStatus = useCallback((reportId: string, status: ReportStatus) => {
    setReports((prev) => prev.map((r) => (r.id === reportId ? { ...r, status } : r)));
  }, []);

  const value = useMemo(
    () => ({ reports, addReport, updateReportStatus }),
    [reports, addReport, updateReportStatus]
  );

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
}

export function useReportsContext(): ReportsContextValue {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error("useReportsContext must be used inside ReportsProvider");
  return ctx;
}
