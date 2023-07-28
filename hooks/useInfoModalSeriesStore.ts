import { create } from 'zustand';

export interface ModalStoreSeriesInterface {
  showId?: string;
  isOpen: boolean;
  openModal: (seriesId: string) => void;
  closeModal: () => void;
}

const useInfoModalSeriesStore = create<ModalStoreSeriesInterface>((set) => ({
  showId: undefined,
  isOpen: false,
  openModal: (showId: string) => set({ isOpen: true, showId }),
  closeModal: () => set({ isOpen: false, showId: undefined }),
}));

export default useInfoModalSeriesStore;
