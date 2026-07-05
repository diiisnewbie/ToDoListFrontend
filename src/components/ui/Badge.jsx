import { STATUS_LABEL } from '../../constants/todoStatus';

const STATUS_STYLES = {
  TODO: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  IN_PROGRESS: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  DONE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
};

export default function Badge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.TODO;

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${style}`}>
      {STATUS_LABEL[status] || status}
    </span>
  );
}