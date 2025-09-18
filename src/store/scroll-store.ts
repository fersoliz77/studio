import { create } from 'zustand';

interface ScrollState {
  isHeroImageVisible: boolean;
  setIsHeroImageVisible: (isVisible: boolean) => void;
}

export const useScrollStore = create<ScrollState>()((set) => ({
  isHeroImageVisible: true,
  setIsHeroImageVisible: (isVisible) => set({ isHeroImageVisible: isVisible }),
}));
