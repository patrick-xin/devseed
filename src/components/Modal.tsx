import { useMarkFormModalStore } from '@/lib/store/modal'
import { Dialog } from '@headlessui/react'

const Modal: React.FC = ({ children }) => {
  const { isModalOpen, closeModal, title } = useMarkFormModalStore()

  return (
    <Dialog
      open={isModalOpen}
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={closeModal}
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

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal
