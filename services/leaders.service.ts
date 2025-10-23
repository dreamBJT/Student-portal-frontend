export const leadersService = {
  async getLeaders() {
    return [
      { id: 1, name: "John Doe", position: "Presidential Candidate", party: "Student Unity Party" },
      { id: 2, name: "Jane Smith", position: "Presidential Candidate", party: "Progressive Student Alliance" },
      { id: 3, name: "Mike Johnson", position: "Presidential Candidate", party: "Independent" },
    ];
  },

  async getLeaderById(id: string) {
    return { id, name: "John Doe", position: "Presidential Candidate", party: "Student Unity Party", bio: "Full biography here" };
  },
};
