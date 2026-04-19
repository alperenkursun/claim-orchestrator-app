import { create } from 'zustand';
import type { ClaimDataType, ProcessDetailType } from '../types/schema';

interface ClaimState {
  claimData: ClaimDataType | null;
  isLoading: boolean;
  setClaimData: (data: ClaimDataType) => void;
  addNode: (index: number, node: ProcessDetailType) => void;
  removeNode: (id: string) => void;
}

export const useClaimStore = create<ClaimState>((set) => ({
  claimData: null,
  isLoading: true,
  setClaimData: (data) => set({ claimData: data, isLoading: false }),
  
  addNode: (index, node) => set((state) => {
    if (!state.claimData) return state;
    
    const newDetails = [...state.claimData.processDetails];
    newDetails.splice(index, 0, node);
    
    return {
      claimData: {
        ...state.claimData,
        processDetails: newDetails
      }
    };
  }),

  removeNode: (id) => set((state) => {
    if (!state.claimData) return state;

    return {
      claimData: {
        ...state.claimData,
        processDetails: state.claimData.processDetails.filter(
          (node) => !('id' in node && node.id === id)
        )
      }
    };
  }),
}));