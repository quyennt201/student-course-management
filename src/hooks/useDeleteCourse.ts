import { useCourseStore } from '@/stores/useCourseStore'

export function useDeleteCourse() {
  const deleteCourse = useCourseStore((s) => s.deleteCourse)

  return {
    removeCourse: (id: string) => deleteCourse(id),
  }
}
