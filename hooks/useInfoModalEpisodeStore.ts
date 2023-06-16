import { create } from 'zustand';

export interface ModalStoreInterface {
  episodeId?: string;
  isOpen: boolean;
  openModal: (episodeId: string) => void;
  closeModal: () => void;
}

const useInfoModalEpisodeStore = create<ModalStoreInterface>((set) => ({
  episodeId: undefined,
  isOpen: false,
  openModal: (episodeId: string) => set({ isOpen: true, episodeId }),
  closeModal: () => set({ isOpen: false, episodeId: undefined }),
}));

export default useInfoModalEpisodeStore;
