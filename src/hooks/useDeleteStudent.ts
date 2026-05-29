import { useCourseStore } from '@/stores/useCourseStore'
import { useStudentStore } from '@/stores/useStudentStore'

export function useDeleteStudent() {
  const deleteStudent = useStudentStore((s) => s.deleteStudent)
  const removeStudentFromAllCourses = useCourseStore((s) => s.removeStudentFromAllCourses)

  const removeStudent = (id: string) => {
    removeStudentFromAllCourses(id)
    deleteStudent(id)
  }

  return { removeStudent }
}
