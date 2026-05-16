export default function LoadingSpinner({ label = 'Đang tải...' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite" aria-busy="true">
      <span className="spinner" />
      <span>{label}</span>
    </div>
  )
}