import { useState } from 'react'
import { getCourseStatusLabel } from '@/lib/courses/course.capacity'
import {
  getAvailableCoursesForEnrollment,
  getEnrolledCourses,
} from '@/lib/enrollments/enrollment.queries'
import { useEnrollment } from '@/hooks/useEnrollment'
import { useCourseStore } from '@/stores/useCourseStore'
import type { Student } from '@/types/student'

type StudentEnrollmentModalProps = {
  student: Student | null
  open: boolean
  onClose: () => void
}

export function StudentEnrollmentModal({
  student,
  open,
  onClose,
}: StudentEnrollmentModalProps) {
  const courses = useCourseStore((s) => s.courses)
  const { enroll, unenroll, messages } = useEnrollment()
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(
    null,
  )

  if (!open || !student) return null

  const enrolledCourses = getEnrolledCourses(courses, student.id)
  const availableCourses = getAvailableCoursesForEnrollment(courses, student.id)

  const handleClose = () => {
    setSelectedCourseId('')
    setFeedback(null)
    onClose()
  }

  const handleEnroll = () => {
    if (!selectedCourseId) {
      setFeedback({ type: 'error', text: 'Vui lòng chọn khóa học' })
      return
    }

    const result = enroll(selectedCourseId, student.id)
    if (!result.ok) {
      setFeedback({ type: 'error', text: result.message })
      return
    }

    setSelectedCourseId('')
    setFeedback({ type: 'success', text: messages.enrollSuccess })
  }

  const handleUnenroll = (courseId: string) => {
    const result = unenroll(courseId, student.id)
    if (!result.ok) {
      setFeedback({ type: 'error', text: result.message })
      return
    }
    setFeedback({ type: 'success', text: messages.unenrollSuccess })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enrollment-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Đóng"
        onClick={handleClose}
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="border-b border-slate-100 p-6 pb-4">
          <h2 id="enrollment-title" className="text-lg font-semibold text-slate-900">
            Đăng ký khóa học
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Học viên:{' '}
            <span className="font-medium text-slate-900">{student.fullName}</span> (
            <span className="font-mono">{student.id}</span>)
          </p>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6 pt-4">
          {feedback && (
            <p
              className={[
                'rounded-lg px-3 py-2 text-sm',
                feedback.type === 'error'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-emerald-50 text-emerald-700',
              ].join(' ')}
              role="alert"
            >
              {feedback.text}
            </p>
          )}

          <section>
            <h3 className="text-sm font-medium text-slate-900">Đăng ký khóa mới</h3>
            <p className="mt-1 text-xs text-slate-500">
              Chỉ khóa đang mở, còn chỗ và học viên chưa đăng ký
            </p>

            {availableCourses.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500 italic">
                Không có khóa học khả dụng để đăng ký
              </p>
            ) : (
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <select
                  value={selectedCourseId}
                  onChange={(e) => {
                    setSelectedCourseId(e.target.value)
                    setFeedback(null)
                  }}
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Chọn khóa học...</option>
                  {availableCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name} ({course.enrolledStudentIds.length}/{course.maxStudents})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleEnroll}
                  className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
                >
                  Đăng ký
                </button>
              </div>
            )}
          </section>

          <section>
            <h3 className="text-sm font-medium text-slate-900">
              Khóa đã đăng ký ({enrolledCourses.length})
            </h3>
            {enrolledCourses.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500 italic">Chưa đăng ký khóa nào</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {enrolledCourses.map((course) => (
                  <li
                    key={course.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {course.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {course.id} · {getCourseStatusLabel(course.status)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleUnenroll(course.id)}
                      className="shrink-0 rounded-md border border-red-200 bg-white px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Hủy đăng ký
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto sm:float-right"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}
