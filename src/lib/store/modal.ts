import create from 'zustand'
import { markTypes } from '../constants'

type ModalType = 'create' | 'edit' | undefined

type MarkFormModalState = {
  isModalOpen: boolean
  modalType: ModalType
  openModal: ({ type, markId }: { type: ModalType; markId?: string }) => void
  closeModal: () => void
  title: string
  markId?: string
  markType: string
  selectedTags: []
  setMarkType: (markType: string) => void
  setSelecedTags: (value: []) => void
}

export const useMarkFormModalStore = create<MarkFormModalState>((set) => ({
  isModalOpen: false,
  title: '',
  modalType: undefined,
  openModal: ({ type, markId }: { type: ModalType; markId?: string }) => {
    if (type === 'create') {
      set({
        isModalOpen: true,
        modalType: 'create',
        title: 'Creare a Mark',
      })
    }
    if (type === 'edit') {
      set({
        isModalOpen: true,
        modalType: 'edit',
        title: 'Update Mark',
        markId: markId,
      })
    }
  },
  closeModal: () =>
    set({
      isModalOpen: false,
      modalType: undefined,
      title: '',
      markId: '',
      selectedTags: [],
      markType: markTypes[0],
    }),
  setMarkType: (markType: string) => set({ markType }),
  markType: markTypes[0],
  selectedTags: [],
  setSelecedTags: (value) => set({ selectedTags: value }),
}))
