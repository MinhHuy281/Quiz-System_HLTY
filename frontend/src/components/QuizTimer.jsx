function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds)
  const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, '0')
  const seconds = String(safeSeconds % 60).padStart(2, '0')

  return `${minutes}:${seconds}`
}

export default function QuizTimer({ timeLeft, durationSeconds, answerCount }) {
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / durationSeconds) * 100))
  const isUrgent = timeLeft <= 15

  return (
    <div className={`quiz-timer ${isUrgent ? 'quiz-timer--urgent' : ''}`}>
      <div className="quiz-timer__meta">
        <span>Thời gian còn lại</span>
        <strong>{formatTime(timeLeft)}</strong>
      </div>
      <div className="quiz-timer__bar" aria-hidden="true">
        <span style={{ width: `${progressPercent}%` }} />
      </div>
      <div className="quiz-timer__footer">
        <span>{answerCount} đã chọn</span>
        <span>Tổng {formatTime(durationSeconds)}</span>
      </div>
    </div>
  )
}