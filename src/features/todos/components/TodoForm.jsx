import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import StatusSelect from './StatusSelect';
import { TODO_STATUS } from '../../../constants/todoStatus';

// mode="create": chỉ gửi { title, description }
// mode="edit": gửi thêm { status }
export default function TodoForm({ mode = 'create', initialValues, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [status, setStatus] = useState(initialValues?.status || TODO_STATUS.TODO);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);
    try {
      const payload = mode === 'create' ? { title, description } : { title, description, status };
      await onSubmit(payload);
      if (mode === 'create') {
        setTitle('');
        setDescription('');
      }
    } catch (err) {
      // Backend trả lỗi validation dạng { code: 1003, result: { title: "..." } }
      if (err?.code === 1003 && err?.result) {
        setErrors(err.result);
      } else {
        setErrors({ general: err?.message || 'Có lỗi xảy ra, vui lòng thử lại.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4">
      <Input
        label="Tiêu đề"
        name="title"
        placeholder="Việc cần làm là gì?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        maxLength={255}
        required
      />
      {mode === 'edit' && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Trạng thái</label>
          <StatusSelect value={status} onChange={setStatus} className="w-fit" />
        </div>
      )}
      {errors.general && <p className="text-sm text-rose-600">{errors.general}</p>}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={submitting}>
            Hủy
          </Button>
        )}
        <Button type="submit" disabled={submitting || !title.trim()}>
          {submitting ? 'Đang lưu...' : mode === 'create' ? 'Thêm việc' : 'Lưu thay đổi'}
        </Button>
      </div>
    </form>
  );
}