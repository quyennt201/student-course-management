import { StudentFormModal } from '@/components/StudentFormModal'

type AddStudentModalProps = {
  open: boolean
  onClose: () => void
}

export function AddStudentModal({ open, onClose }: AddStudentModalProps) {
  return <StudentFormModal mode={{ type: 'add' }} open={open} onClose={onClose} />
}
