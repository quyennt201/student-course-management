import { useStudentStore } from '@/stores/useStudentStore'

export function useDeleteStudent() {
  const deleteStudent = useStudentStore((s) => s.deleteStudent)

  const removeStudent = (id: string) => {
    deleteStudent(id)
  }

  return { removeStudent }
}
