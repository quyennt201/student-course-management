import { CourseFormModal } from '@/components/CourseFormModal'

type AddCourseModalProps = {
  open: boolean
  onClose: () => void
}

export function AddCourseModal({ open, onClose }: AddCourseModalProps) {
  return <CourseFormModal mode={{ type: 'add' }} open={open} onClose={onClose} />
}
