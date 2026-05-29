import { CourseFormModal } from '@/components/CourseFormModal'

type EditCourseModalProps = {
  courseId: string | null
  open: boolean
  onClose: () => void
}

export function EditCourseModal({ courseId, open, onClose }: EditCourseModalProps) {
  if (!courseId) return null

  return (
    <CourseFormModal mode={{ type: 'edit', courseId }} open={open} onClose={onClose} />
  )
}
