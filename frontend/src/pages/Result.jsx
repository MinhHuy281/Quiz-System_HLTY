import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import FeedbackState from '../components/FeedbackState.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { getResults } from '../services/quizService.js'

export default function Result() {
  const { user } = useAuth()
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadResult = async () => {
      try {
        setIsLoading(true)
        setError('')
        const storedResults = await getResults()

        if (isMounted) {
          setResult(storedResults[0] || null)
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError?.message || 'Không thể tải kết quả bài thi.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadResult()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <section className="page-shell">
        <LoadingSpinner label="Đang tải kết quả..." />
      </section>
    )
  }

  if (error) {
    return (
      <section className="page-shell">
        <FeedbackState
          type="error"
          title="Kết quả không khả dụng"
          description={error}
          action={<Link to="/quizzes" className="btn btn-primary">Tới danh sách đề thi</Link>}
        />
      </section>
    )
  }

  if (!result) {
    return (
      <section className="page-shell">
        <FeedbackState
          type="empty"
          title="Chưa có kết quả"
          description="Hãy nộp một bài thi trước để xem bảng điểm ở đây."
          action={<Link to="/quizzes" className="btn btn-primary">Bắt đầu làm bài</Link>}
        />
      </section>
    )
  }

  const scoreCards = [
    { label: 'Correct', value: `${result.correctAnswers}` },
    { label: 'Wrong', value: `${result.wrongAnswers}` },
    { label: 'Score', value: `${result.score}%` },
  ]

  return (
    <section className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Tổng kết kết quả</p>
          <h1>{user ? `Kết quả gần nhất của ${user.name}` : 'Kết quả bài thi gần nhất'}</h1>
          <p className="detail-text">{result.quizTitle}</p>
        </div>
        <Link to="/quizzes" className="btn btn-primary">
          Làm đề khác
        </Link>
      </div>

      <div className="card-grid three-col">
        {scoreCards.map((card) => (
          <article key={card.label} className="info-card">
            <span className="card-badge">{card.label}</span>
            <h2>{card.value}</h2>
            <p>Đã nộp lúc {new Date(result.submittedAt).toLocaleString()}</p>
          </article>
        ))}
      </div>

      <div className="detail-card">
        <div className="detail-grid">
          <div className="detail-panel">
            <h2>Thời gian làm bài</h2>
            <p>{result.timeSpentSeconds} giây</p>
          </div>
          <div className="detail-panel">
            <h2>Hình thức nộp</h2>
            <p>{result.autoSubmitted ? 'Tự động nộp' : 'Nộp thủ công'}</p>
          </div>
        </div>

        <div className="result-review">
          {result.answers.map((answer) => (
            <div key={answer.questionId} className={`result-review-item ${answer.isCorrect ? 'is-correct' : 'is-wrong'}`}>
              <strong>{answer.questionText}</strong>
              <span>
                Câu trả lời của bạn: {answer.selectedOptionText} · Đáp án đúng: {answer.correctOptionText}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}