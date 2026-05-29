import { StudentFormModal } from '@/components/StudentFormModal'

type EditStudentModalProps = {
  studentId: string | null
  open: boolean
  onClose: () => void
}

export function EditStudentModal({ studentId, open, onClose }: EditStudentModalProps) {
  if (!studentId) return null

  return (
    <StudentFormModal
      mode={{ type: 'edit', studentId }}
      open={open}
      onClose={onClose}
    />
  )
}
