export const newsService = {
  async getNews() {
    return [
      { id: 1, title: "Election Registration Opens", content: "Lorem ipsum", date: "2025-10-20" },
      { id: 2, title: "Candidate Debates Scheduled", content: "Lorem ipsum", date: "2025-10-19" },
      { id: 3, title: "Voting Guidelines Released", content: "Lorem ipsum", date: "2025-10-18" },
    ];
  },

  async getNewsById(id: string) {
    return { id, title: "Election Registration Opens", content: "Full article content here", date: "2025-10-20" };
  },
};
