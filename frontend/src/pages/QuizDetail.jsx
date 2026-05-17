import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import FeedbackState from '../components/FeedbackState.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import QuizRunner from '../components/QuizRunner.jsx'
import { getQuizById, submitQuiz } from '../services/quizService.js'

export default function QuizDetail() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadQuiz = async () => {
      try {
        setIsLoading(true)
        setError('')
        const nextQuiz = await getQuizById(quizId)

        if (isMounted) {
          if (!nextQuiz) {
            setError('Không tìm thấy đề thi được yêu cầu.')
          } else {
            setQuiz(nextQuiz)
          }
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError?.message || 'Không thể tải chi tiết đề thi.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadQuiz()

    return () => {
      isMounted = false
    }
  }, [quizId])

  const handleSubmitQuiz = async (payload) => submitQuiz(payload)

  const handleSubmitted = (result) => {
    navigate('/result', { state: { result } })
  }

  if (isLoading) {
    return (
      <section className="page-shell">
        <LoadingSpinner label="Đang tải đề thi..." />
      </section>
    )
  }

  if (error) {
    return (
      <section className="page-shell">
        <FeedbackState
          type="error"
          title="Đề thi không khả dụng"
          description={error}
          action={<Link to="/quizzes" className="btn btn-primary">Quay lại danh sách đề thi</Link>}
        />
      </section>
    )
  }

  if (!quiz) {
    return (
      <section className="page-shell">
        <FeedbackState
          type="empty"
          title="Không tìm thấy đề thi"
          description="Đề thi này không có trong bộ dữ liệu demo."
          action={<Link to="/quizzes" className="btn btn-primary">Quay lại danh sách đề thi</Link>}
        />
      </section>
    )
  }

  return (
    <section className="page-shell">
      <div className="detail-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">Chi tiết đề thi</p>
            <h1>{quiz.title}</h1>
            <p className="detail-text">{quiz.description}</p>
          </div>
          <Link to="/quizzes" className="btn btn-secondary">
            Quay lại đề thi
          </Link>
        </div>

        <div className="quiz-meta-grid">
          <div className="detail-panel">
            <h2>Thời lượng</h2>
            <p>{Math.round(quiz.durationSeconds / 60)} phút</p>
          </div>

          <div className="detail-panel">
            <h2>Câu hỏi</h2>
            <p>{quiz.questions.length} câu hỏi</p>
          </div>

          <div className="detail-panel">
            <h2>Danh mục</h2>
            <p>{quiz.category}</p>
          </div>
        </div>

        <QuizRunner quiz={quiz} onSubmitQuiz={handleSubmitQuiz} onSubmitted={handleSubmitted} />
      </div>
    </section>
  )
}