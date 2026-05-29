import type { Student } from '@/types/student'

type DeleteStudentConfirmModalProps = {
  student: Student | null
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteStudentConfirmModal({
  student,
  open,
  onClose,
  onConfirm,
}: DeleteStudentConfirmModalProps) {
  if (!open || !student) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-student-title"
      aria-describedby="delete-student-description"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Đóng"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
        <h2 id="delete-student-title" className="text-lg font-semibold text-slate-900">
          Xác nhận xóa học viên
        </h2>
        <p id="delete-student-description" className="mt-3 text-sm leading-relaxed text-slate-600">
          Bạn có chắc chắn muốn xóa học viên{' '}
          <span className="font-medium text-slate-900">{student.fullName}</span> (mã{' '}
          <span className="font-mono font-medium text-slate-900">{student.id}</span>)? Hành động
          này không thể hoàn tác.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  )
}
