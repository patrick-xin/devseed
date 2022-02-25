import create from 'zustand'

type useAddFolderModalState = {
  isOpen: boolean
  title: string
  name: string
  openModal: () => void
  closeModal: () => void
  onChange: (name: string) => void
}
export const useAddFolderModalStore = create<useAddFolderModalState>((set) => ({
  isOpen: false,
  title: '',
  name: '',
  openModal: () => set({ isOpen: true, title: '' }),
  closeModal: () => set({ isOpen: false, title: '' }),
  onChange: (name: string) => set({ name }),
}))
