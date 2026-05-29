import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  createCourse,
  deleteCourseRecord,
  updateCourseRecord,
} from '@/services/courseService'
import type { Course, CourseInput } from '@/types/course'

type CourseState = {
  courses: Course[]
  addCourse: (input: CourseInput) => void
  updateCourse: (id: string, input: CourseInput) => void
  deleteCourse: (id: string) => void
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      courses: [],
      addCourse: (input) =>
        set((state) => ({
          courses: [...state.courses, createCourse(state.courses, input)],
        })),
      updateCourse: (id, input) =>
        set((state) => ({
          courses: updateCourseRecord(state.courses, id, input),
        })),
      deleteCourse: (id) =>
        set((state) => ({
          courses: deleteCourseRecord(state.courses, id),
        })),
    }),
    {
      name: 'course-app-storage',
      partialize: (state) => ({ courses: state.courses }),
    },
  ),
)
