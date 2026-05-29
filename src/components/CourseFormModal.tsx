import { CourseFormFields } from '@/components/CourseFormFields'
import { useCourseForm, type CourseFormMode } from '@/hooks/useCourseForm'

type CourseFormModalProps = {
  mode: CourseFormMode
  open: boolean
  onClose: () => void
}

const copy = {
  add: {
    title: 'Thêm khóa học',
    description: 'Thiết lập thông tin khóa học, trạng thái và giới hạn học viên.',
    submit: 'Lưu',
  },
  edit: {
    title: 'Cập nhật khóa học',
    description: 'Chỉnh sửa thông tin khóa học.',
    submit: 'Cập nhật',
  },
} as const

export function CourseFormModal({ mode, open, onClose }: CourseFormModalProps) {
  const isEdit = mode.type === 'edit'
  const texts = isEdit ? copy.edit : copy.add
  const titleId = isEdit ? 'edit-course-title' : 'add-course-title'
  const idPrefix = isEdit ? 'edit-course' : 'add-course'

  const {
    values,
    errors,
    courseCode,
    enrolledCount,
    updateField,
    blurField,
    reset,
    handleSubmit,
  } = useCourseForm({
    mode,
    open,
    onSuccess: onClose,
  })

  if (!open) return null

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Đóng"
        onClick={handleClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
        <h2 id={titleId} className="text-lg font-semibold text-slate-900">
          {texts.title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{texts.description}</p>

        {isEdit && courseCode && (
          <p className="mt-2 text-sm text-slate-600">
            Mã khóa học:{' '}
            <span className="font-mono font-medium text-slate-900">{courseCode}</span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <CourseFormFields
            idPrefix={idPrefix}
            values={values}
            errors={errors}
            enrolledCount={enrolledCount}
            onFieldChange={updateField}
            onFieldBlur={blurField}
            autoFocus
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
            >
              {texts.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
