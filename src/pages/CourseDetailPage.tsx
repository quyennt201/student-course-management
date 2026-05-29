import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Pagination } from '@/components/Pagination'
import { useEnrollment } from '@/hooks/useEnrollment'
import { usePagination } from '@/hooks/usePagination'
import {
  getCourseCapacityInfo,
  getCourseSlotLabel,
  getCourseStatusLabel,
} from '@/lib/courses/course.capacity'
import {
  canEnrollMoreStudents,
  getEnrolledStudentsForCourse,
  getStudentsNotEnrolledInCourse,
} from '@/lib/enrollments/enrollment.queries'
import { useCourseStore } from '@/stores/useCourseStore'
import { useStudentStore } from '@/stores/useStudentStore'

const statusBadgeClass = {
  draft: 'bg-slate-100 text-slate-600',
  open: 'bg-emerald-50 text-emerald-700',
  closed: 'bg-red-50 text-red-700',
} as const

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const courses = useCourseStore((s) => s.courses)
  const students = useStudentStore((s) => s.students)
  const { enroll, unenroll } = useEnrollment()

  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(
    null,
  )

  const course = courses.find((item) => item.id === courseId)

  const enrolledStudents = useMemo(
    () => (course ? getEnrolledStudentsForCourse(students, course) : []),
    [students, course],
  )

  const studentsNotEnrolled = useMemo(
    () => (course ? getStudentsNotEnrolledInCourse(students, course) : []),
    [students, course],
  )

  const pagination = usePagination(enrolledStudents)
  const allowEnroll = course ? canEnrollMoreStudents(course) : false

  if (!course) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-slate-600">Không tìm thấy khóa học.</p>
        <Link to="/course" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
          ← Quay lại danh sách khóa học
        </Link>
      </div>
    )
  }

  const { enrolledCount, maxStudents } = getCourseCapacityInfo(course)

  const handleEnroll = () => {
    if (!selectedStudentId) {
      setFeedback({ type: 'error', text: 'Vui lòng chọn học viên' })
      return
    }

    const result = enroll(course.id, selectedStudentId)
    if (!result.ok) {
      setFeedback({ type: 'error', text: result.message })
      return
    }

    setSelectedStudentId('')
    setFeedback({ type: 'success', text: 'Đã thêm học viên vào khóa' })
  }

  const handleUnenroll = (studentId: string) => {
    const result = unenroll(course.id, studentId)
    if (!result.ok) {
      setFeedback({ type: 'error', text: result.message })
      return
    }
    setFeedback({ type: 'success', text: 'Đã xóa học viên khỏi khóa' })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/course"
        className="inline-flex items-center text-sm font-medium text-slate-600 transition hover:text-slate-900"
      >
        ← Quay lại danh sách khóa học
      </Link>

      <header className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-xs text-slate-500">{course.id}</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              {course.name}
            </h1>
            {course.description && (
              <p className="mt-2 text-sm text-slate-600">{course.description}</p>
            )}
          </div>
          <span
            className={[
              'inline-flex shrink-0 rounded-full px-3 py-1 text-sm font-medium',
              statusBadgeClass[course.status],
            ].join(' ')}
          >
            {getCourseStatusLabel(course.status)}
          </span>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-medium text-slate-500">Đăng ký / Giới hạn</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-slate-900">
              {enrolledCount}/{maxStudents}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium text-slate-500">Tình trạng chỗ</dt>
            <dd className="mt-1 text-sm text-slate-700">{getCourseSlotLabel(course)}</dd>
          </div>
        </dl>

      </header>

      {feedback && (
        <p
          className={[
            'mt-4 rounded-lg px-3 py-2 text-sm',
            feedback.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700',
          ].join(' ')}
          role="alert"
        >
          {feedback.text}
        </p>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">Thêm học viên vào khóa</h2>

        {!allowEnroll ? (
          <p className="mt-2 text-sm text-slate-500">
            {course.status !== 'open'
              ? 'Khóa chưa mở hoặc đã đóng — không thể thêm học viên mới.'
              : 'Khóa đã đầy — không thể thêm học viên mới.'}
          </p>
        ) : studentsNotEnrolled.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500 italic">
            Tất cả học viên đã có trong khóa hoặc chưa có học viên nào trong hệ thống.
          </p>
        ) : (
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1 sm:max-w-md">
              <label htmlFor="add-student" className="mb-1 block text-sm font-medium text-slate-700">
                Chọn học viên
              </label>
              <select
                id="add-student"
                value={selectedStudentId}
                onChange={(e) => {
                  setSelectedStudentId(e.target.value)
                  setFeedback(null)
                }}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Chọn học viên...</option>
                {studentsNotEnrolled.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.fullName} ({student.id})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={handleEnroll}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover"
            >
              Thêm vào khóa
            </button>
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">
          Học viên đã đăng ký ({enrolledStudents.length})
        </h2>

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {enrolledStudents.length === 0 ? (
            <p className="px-4 py-12 text-center text-sm text-slate-500 italic">
              Chưa có học viên nào trong khóa
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-4 py-3 font-medium text-slate-600">Mã HV</th>
                      <th className="px-4 py-3 font-medium text-slate-600">Họ và tên</th>
                      <th className="px-4 py-3 font-medium text-slate-600">Email</th>
                      <th className="px-4 py-3 font-medium text-slate-600">Số điện thoại</th>
                      <th className="px-4 py-3 text-right font-medium text-slate-600">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagination.items.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/80"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-slate-600">
                          {student.id}
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {student.fullName}
                        </td>
                        <td className="px-4 py-3 text-slate-600">{student.email}</td>
                        <td className="px-4 py-3 text-slate-600">{student.phone}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleUnenroll(student.id)}
                            className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                          >
                            Xóa khỏi khóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-4">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  totalItems={pagination.totalItems}
                  pageSize={pagination.pageSize}
                  startIndex={pagination.startIndex}
                  endIndex={pagination.endIndex}
                  onPageChange={pagination.setPage}
                  onPageSizeChange={pagination.setPageSize}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
