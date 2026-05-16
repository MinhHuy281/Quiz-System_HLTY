import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import QuizTimer from './QuizTimer.jsx'

function getInitialAnswers(quiz) {
  return quiz.questions.reduce((accumulator, question) => {
    accumulator[question.id] = ''

    return accumulator
  }, {})
}

export default function QuizRunner({ quiz, onSubmitQuiz, onSubmitted }) {
  const [answers, setAnswers] = useState(() => getInitialAnswers(quiz))
  const [timeLeft, setTimeLeft] = useState(quiz.durationSeconds)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const startedAtRef = useRef(Date.now())
  const hasSubmittedRef = useRef(false)

  const answeredCount = useMemo(
    () => Object.values(answers).filter(Boolean).length,
    [answers],
  )

  useEffect(() => {
    setAnswers(getInitialAnswers(quiz))
    setTimeLeft(quiz.durationSeconds)
    setIsSubmitting(false)
    setSubmitError('')
    startedAtRef.current = Date.now()
    hasSubmittedRef.current = false
  }, [quiz])

  useEffect(() => {
    if (hasSubmittedRef.current) {
      return undefined
    }

    const timerId = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timerId)

          return 0
        }

        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [quiz.id])

  const handleSubmit = useCallback(
    async (autoSubmitted = false) => {
      if (hasSubmittedRef.current) {
        return
      }

      hasSubmittedRef.current = true
      setIsSubmitting(true)
      setSubmitError('')

      try {
        const finishedAt = Date.now()
        const result = await onSubmitQuiz({
          quizId: quiz.id,
          answers,
          startedAt: startedAtRef.current,
          finishedAt,
          autoSubmitted,
        })

        onSubmitted(result)
      } catch (error) {
        hasSubmittedRef.current = false
        setSubmitError(error?.message || 'Không thể nộp bài lúc này.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [answers, onSubmitted, onSubmitQuiz, quiz.id],
  )

  useEffect(() => {
    if (timeLeft === 0 && !hasSubmittedRef.current) {
      void handleSubmit(true)
    }
  }, [handleSubmit, timeLeft])

  const handleAnswerSelect = (questionId, optionId) => {
    if (hasSubmittedRef.current) {
      return
    }

    setAnswers((current) => ({
      ...current,
      [questionId]: optionId,
    }))
  }

  return (
    <div className="quiz-runner">
      <QuizTimer
        timeLeft={timeLeft}
        durationSeconds={quiz.durationSeconds}
        answerCount={answeredCount}
      />

      {submitError ? <div className="quiz-inline-error">{submitError}</div> : null}

      <div className="quiz-questions">
        {quiz.questions.map((question, index) => (
          <article key={question.id} className="quiz-question-card">
            <div className="quiz-question-head">
              <span className="question-index">Q{index + 1}</span>
              <span className="question-status">
                {answers[question.id] ? 'Đã trả lời' : 'Chưa trả lời'}
              </span>
            </div>

            <h2>{question.text}</h2>

            <div className="quiz-options">
              {question.options.map((option) => {
                const isSelected = answers[question.id] === option.id

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`quiz-option ${isSelected ? 'quiz-option--selected' : ''}`}
                    onClick={() => handleAnswerSelect(question.id, option.id)}
                    disabled={hasSubmittedRef.current}
                  >
                    <span className="quiz-option__marker" aria-hidden="true" />
                    <span>{option.text}</span>
                  </button>
                )
              })}
            </div>
          </article>
        ))}
      </div>

      <div className="quiz-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => void handleSubmit(false)}
          disabled={isSubmitting || hasSubmittedRef.current}
        >
          {isSubmitting ? 'Đang nộp bài...' : 'Nộp bài'}
        </button>
      </div>
    </div>
  )
}