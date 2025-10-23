export interface Election {
  id: string;
  title: string;
  description: string;
  status: "draft" | "active" | "completed" | "cancelled";
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vote {
  id: string;
  electionId: string;
  candidateId: string;
  voterId: string;
  timestamp: string;
}
