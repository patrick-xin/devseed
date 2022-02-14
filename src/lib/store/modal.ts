import create from 'zustand'
import { markTypes } from '../constants'

type ModalType = 'create' | 'edit' | undefined

type MarkFormModalState = {
  isModalOpen: boolean
  modalType: ModalType
  openModal: ({ type, markId }: { type: ModalType; markId?: string }) => void
  closeModal: () => void
  title: string
  buttonTitle: string
  markId?: string
  markType: string
  selectedTags: []
  setMarkType: (markType: string) => void
  setSelecedTags: (value: []) => void
}

export const useMarkFormModalStore = create<MarkFormModalState>((set) => ({
  isModalOpen: false,
  title: '',
  buttonTitle: '',
  modalType: undefined,
  openModal: ({ type, markId }: { type: ModalType; markId?: string }) => {
    if (type === 'create') {
      set({
        isModalOpen: true,
        modalType: 'create',
        title: 'Creare a Mark',
        buttonTitle: 'Create',
      })
    }
    if (type === 'edit') {
      set({
        isModalOpen: true,
        modalType: 'edit',
        title: 'Update Mark',
        buttonTitle: 'Update',
        markId: markId,
      })
    }
  },
  closeModal: () =>
    set({
      isModalOpen: false,
      modalType: undefined,
      title: '',
      buttonTitle: '',
      markId: '',
      selectedTags: [],
      markType: '',
    }),
  setMarkType: (markType: string) => set({ markType }),
  markType: markTypes[0],
  selectedTags: [],
  setSelecedTags: (value) => set({ selectedTags: value }),
}))