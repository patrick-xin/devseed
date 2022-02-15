import { Dialog } from '@headlessui/react'
import { LoadingIcon } from './icons'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  isLoading?: boolean
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  isLoading,
}) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={onClose}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black/70" />

        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="my-8 inline-block w-full max-w-sm transform overflow-hidden rounded-xl bg-primary p-6 text-left align-middle shadow-xl lg:max-w-2xl lg:p-10">
          <Dialog.Title
            as="h3"
            className="text-center text-lg font-medium leading-6 lg:text-2xl"
          >
            {title}
          </Dialog.Title>

          <div className="relative mt-8 min-h-[50vh]">
            {isLoading ? (
              <div className="absolute h-full w-full translate-y-1/2 translate-x-1/2 justify-center">
                <LoadingIcon />
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal
