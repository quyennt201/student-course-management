import { useMemo, useState } from 'react'
import { AddCourseModal } from '@/components/AddCourseModal'
import { CourseTable } from '@/components/CourseTable'
import { DeleteCourseConfirmModal } from '@/components/DeleteCourseConfirmModal'
import { EditCourseModal } from '@/components/EditCourseModal'
import { useDeleteCourse } from '@/hooks/useDeleteCourse'
import {
  courseStatusFilterOptions,
  filterCoursesByStatus,
  type CourseStatusFilter,
} from '@/lib/courses/course.filter'
import { filterCoursesByQuery } from '@/lib/courses/course.search'
import { sortCoursesByStatus } from '@/lib/courses/course.sort'
import { useCourseStore } from '@/stores/useCourseStore'
import type { Course } from '@/types/course'

export function CoursesPage() {
  const courses = useCourseStore((s) => s.courses)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<CourseStatusFilter>('all')
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null)
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null)
  const { removeCourse } = useDeleteCourse()

  const displayCourses = useMemo(() => {
    const bySearch = filterCoursesByQuery(courses, search)
    const byStatus = filterCoursesByStatus(bySearch, statusFilter)
    return sortCoursesByStatus(byStatus)
  }, [courses, search, statusFilter])

  const hasCourses = courses.length > 0

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Quản lý khóa học
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Theo dõi bản nháp, mở/đóng, giới hạn học viên và chỗ còn trống
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Thêm khóa học
          </button>
        </header>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1 sm:max-w-md">
            <label htmlFor="course-search" className="mb-1 block text-sm font-medium text-slate-700">
              Tìm kiếm
            </label>
            <input
              id="course-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên, mã khóa..."
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="sm:min-w-[200px]">
            <label htmlFor="course-status" className="mb-1 block text-sm font-medium text-slate-700">
              Trạng thái
            </label>
            <select
              id="course-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as CourseStatusFilter)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {courseStatusFilterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <CourseTable
          courses={displayCourses}
          hasCourses={hasCourses}
          onEdit={(course) => setEditingCourseId(course.id)}
          onDelete={(course) => setDeletingCourse(course)}
        />
      </div>

      <AddCourseModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
      <EditCourseModal
        courseId={editingCourseId}
        open={editingCourseId !== null}
        onClose={() => setEditingCourseId(null)}
      />
      <DeleteCourseConfirmModal
        course={deletingCourse}
        open={deletingCourse !== null}
        onClose={() => setDeletingCourse(null)}
        onConfirm={() => {
          if (!deletingCourse) return
          removeCourse(deletingCourse.id)
          if (editingCourseId === deletingCourse.id) {
            setEditingCourseId(null)
          }
          setDeletingCourse(null)
        }}
      />
    </>
  )
}
