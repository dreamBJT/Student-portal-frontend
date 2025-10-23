import { create } from "zustand";

interface Election {
  id: string;
  title: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface ElectionStore {
  elections: Election[];
  currentElection: Election | null;
  setElections: (elections: Election[]) => void;
  setCurrentElection: (election: Election | null) => void;
}

export const useElectionStore = create<ElectionStore>((set) => ({
  elections: [],
  currentElection: null,
  setElections: (elections) => set({ elections }),
  setCurrentElection: (election) => set({ currentElection: election }),
}));
