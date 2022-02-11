import create from 'zustand'

type Position = 'topCenter' | 'bottomCenter' | 'topRight' | 'bottomRight'
type ToastType = 'success' | 'error' | 'warning'
type Direction = 'fadeUp' | 'fadeLeft'
type ToastState = {
  isToastOpen: boolean
  closeToast: () => void
  message: string
  toastType: ToastType
  position: Position
  direction: Direction
  toast: {
    success: (
      message: string,
      position?: Position,
      direction?: Direction
    ) => void
    error: (message: string, position?: Position, direction?: Direction) => void
    warning: (
      message: string,
      position?: Position,
      direction?: Direction
    ) => void
  }
}

export const useToastStore = create<ToastState>((set) => ({
  isToastOpen: false,
  closeToast: () => set(() => ({ isToastOpen: false })),
  message: '',
  toastType: 'success',
  position: 'bottomCenter',
  direction: 'fadeUp',
  toast: {
    success: (message, position?, direction?) =>
      set((state) => ({
        isToastOpen: true,
        toastType: 'success',
        message,
        position: position ?? state.position,
        direction: direction ?? state.direction,
      })),
    error: (message, position?, direction?) =>
      set((state) => ({
        isToastOpen: true,
        toastType: 'error',
        message,
        position: position ?? state.position,
        direction: direction ?? state.direction,
      })),
    warning: (message, position?, direction?) =>
      set((state) => ({
        isToastOpen: true,
        toastType: 'warning',
        message,
        position: position ?? state.position,
        direction: direction ?? state.direction,
      })),
  },
}))
