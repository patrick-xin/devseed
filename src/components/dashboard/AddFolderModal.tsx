import { useCreateFolder } from '@/lib/hooks'
import { useAddFolderModalStore } from '@/lib/store/add-folder-modal'

import { Button } from '../buttons'
import Modal from '../Modal'

const AddFolderModal = () => {
  const { isOpen, closeModal, title, onChange, name } = useAddFolderModalStore()
  const { createFolder, isCreatingFolder } = useCreateFolder()

  return (
    <Modal
      isLoading={isCreatingFolder}
      isOpen={isOpen}
      onClose={closeModal}
      title={title}
    >
      <p className="my-6">add a folder</p>
      <input
        type="text"
        value={name}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex w-full justify-end">
        <Button
          className="w-fit"
          onClick={() =>
            createFolder(
              { name },
              {
                onSuccess: () => {
                  closeModal()
                },
              }
            )
          }
        >
          create
        </Button>
      </div>
    </Modal>
  )
}

export default AddFolderModal
