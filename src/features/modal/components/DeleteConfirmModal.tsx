import { useDeleteMark } from '@/mark/hooks'
import { useConfirmModalStore } from '@/lib/store/confirm-modal'

import { Button } from '@/components/buttons'
import Modal from './Modal'

const DeleteConfirmModal = () => {
  const { isOpen, closeModal, markId, title } = useConfirmModalStore()
  const { deleteMark, isDeleting } = useDeleteMark()
  return (
    <Modal
      isLoading={isDeleting}
      isOpen={isOpen}
      onClose={closeModal}
      title={title}
    >
      <p className="my-6">
        This action is unreversable, all the data of this mark will be lost, are
        you sure you want to procceed?
      </p>
      <div className="flex w-full justify-end">
        <Button className="w-fit" onClick={() => deleteMark(markId!)}>
          delete
        </Button>
      </div>
    </Modal>
  )
}

export default DeleteConfirmModal
