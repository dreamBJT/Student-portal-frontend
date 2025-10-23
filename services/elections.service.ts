export const electionsService = {
  async getElections() {
    return [
      { id: 1, title: "Presidential Election 2025", status: "active", startDate: "2025-10-25", endDate: "2025-10-30" },
      { id: 2, title: "Vice President Election 2025", status: "upcoming", startDate: "2025-11-01", endDate: "2025-11-05" },
    ];
  },

  async getElectionById(id: string) {
    return { id, title: "Presidential Election 2025", status: "active", startDate: "2025-10-25", endDate: "2025-10-30" };
  },

  async vote(electionId: string, candidateId: string) {
    return { success: true, message: "Vote cast successfully" };
  },

  async getResults(electionId: string) {
    return [
      { candidateId: 1, name: "John Doe", votes: 450 },
      { candidateId: 2, name: "Jane Smith", votes: 350 },
      { candidateId: 3, name: "Mike Johnson", votes: 200 },
    ];
  },
};
