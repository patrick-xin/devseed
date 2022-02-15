import { Modal } from '@/components'
import MarkForm from './MarkForm'

import { useMarkFormModalStore } from '@/lib/store/modal'
import { useTags, useUserMark } from '@/lib/hooks'
const FormModal = () => {
  const { isModalOpen, closeModal, title, markId } = useMarkFormModalStore()
  const { isLoadingMark } = useUserMark(markId!)
  const { isLoadingTags } = useTags()
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={title}
      isLoading={isLoadingMark || isLoadingTags}
    >
      <MarkForm />
    </Modal>
  )
}

export default FormModal
