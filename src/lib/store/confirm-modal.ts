import create from 'zustand'

type useConfirmModalState = {
  isOpen: boolean
  title: string
  markId: string | null
  openModal: ({ title, markId }: { title: string; markId: string }) => void
  closeModal: () => void
}
export const useConfirmModalStore = create<useConfirmModalState>((set) => ({
  isOpen: false,
  title: '',
  markId: null,
  openModal: ({ title, markId }: { title: string; markId: string }) =>
    set({ isOpen: true, title, markId }),
  closeModal: () => set({ isOpen: false, markId: null }),
}))
