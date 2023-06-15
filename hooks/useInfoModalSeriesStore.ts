import { create } from 'zustand';

export interface ModalStoreSeriesInterface {
  seriesId?: string;
  isOpen: boolean;
  openModal: (seriesId: string) => void;
  closeModal: () => void;
}

const useInfoModalSeriesStore = create<ModalStoreSeriesInterface>((set) => ({
  seriesId: undefined,
  isOpen: false,
  openModal: (seriesId: string) => set({ isOpen: true, seriesId }),
  closeModal: () => set({ isOpen: false, seriesId: undefined }),
}));

export default useInfoModalSeriesStore;
