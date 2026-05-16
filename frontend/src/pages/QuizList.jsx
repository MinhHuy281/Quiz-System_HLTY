import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FeedbackState from '../components/FeedbackState.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { getQuizzes } from '../services/quizService.js'

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadQuizzes = async () => {
      try {
        setIsLoading(true)
        setError('')
        const nextQuizzes = await getQuizzes()

        if (isMounted) {
          setQuizzes(nextQuizzes)
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError?.message || 'Không thể tải danh sách đề thi.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadQuizzes()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Danh mục đề thi</p>
          <h1>Chọn một đề thi và bắt đầu luyện tập.</h1>
        </div>
      </div>

      {isLoading ? <LoadingSpinner label="Đang tải danh sách đề thi..." /> : null}

      {error ? (
        <FeedbackState
          type="error"
          title="Không thể tải đề thi"
          description={error}
        />
      ) : null}

      {!isLoading && !error && quizzes.length === 0 ? (
        <FeedbackState
          type="empty"
          title="Chưa có đề thi"
          description="Hiện tại chưa có đề thi nào để hiển thị."
          action={<Link to="/" className="btn btn-primary">Về trang chủ</Link>}
        />
      ) : null}

      <div className="card-grid">
        {quizzes.map((quiz) => (
          <article key={quiz.id} className="info-card">
            <span className="card-badge">{quiz.category}</span>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            <div className="card-meta">
              <span>{quiz.questionCount} câu hỏi · {Math.round(quiz.durationSeconds / 60)} phút</span>
              <Link to={`/quiz/${quiz.id}`} className="btn btn-secondary">
                Xem chi tiết
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}