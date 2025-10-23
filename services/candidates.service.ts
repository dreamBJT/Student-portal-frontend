export const candidatesService = {
  async getCandidates(electionId?: string) {
    return [
      { id: 1, name: "John Doe", position: "Presidential Candidate", party: "Student Unity Party", bio: "Lorem ipsum" },
      { id: 2, name: "Jane Smith", position: "Presidential Candidate", party: "Progressive Student Alliance", bio: "Lorem ipsum" },
      { id: 3, name: "Mike Johnson", position: "Presidential Candidate", party: "Independent", bio: "Lorem ipsum" },
    ];
  },

  async getCandidateById(id: string) {
    return { id, name: "John Doe", position: "Presidential Candidate", party: "Student Unity Party", bio: "Lorem ipsum dolor sit amet" };
  },
};
