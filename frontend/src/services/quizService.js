import api from './api.js'
import { mockQuizzes } from './mockQuizData.js'

const QUIZ_RESULTS_KEY = 'quiz-system-results'

function delay(ms = 300) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function readStoredResults() {
  try {
    const storedValue = localStorage.getItem(QUIZ_RESULTS_KEY)

    return storedValue ? JSON.parse(storedValue) : []
  } catch {
    return []
  }
}

function storeResults(results) {
  localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(results))
}

function buildQuizSummary(quiz) {
  return {
    id: quiz.id,
    title: quiz.title,
    slug: quiz.slug,
    category: quiz.category,
    description: quiz.description,
    durationSeconds: quiz.durationSeconds,
    questionCount: quiz.questions.length,
  }
}

function normalizeQuizResponse(data) {
  const payload = data?.data ?? data?.result ?? data ?? {}
  const quizzes = Array.isArray(payload) ? payload : payload.quizzes || payload.items || []

  return quizzes.map((quiz) => ({
    id: String(quiz.id),
    title: quiz.title,
    slug: quiz.slug,
    category: quiz.category,
    description: quiz.description,
    durationSeconds: quiz.durationSeconds ?? quiz.duration ?? 60,
    questionCount: quiz.questionCount ?? quiz.questions?.length ?? 0,
  }))
}

function normalizeQuizDetailResponse(data, quizId) {
  const payload = data?.data ?? data?.result ?? data ?? {}
  const quiz = payload.quiz || payload.item || payload

  if (!quiz || !quiz.questions) {
    return null
  }

  return {
    id: String(quiz.id ?? quizId),
    title: quiz.title,
    slug: quiz.slug,
    category: quiz.category,
    description: quiz.description,
    durationSeconds: quiz.durationSeconds ?? quiz.duration ?? 60,
    questions: quiz.questions.map((question) => ({
      id: question.id,
      text: question.text,
      options: question.options.map((option) => ({
        id: option.id,
        text: option.text,
      })),
      correctOptionId: question.correctOptionId,
    })),
  }
}

function calculateResult(quiz, answers, startedAt, finishedAt, autoSubmitted) {
  const review = quiz.questions.map((question) => {
    const selectedOptionId = answers[question.id] || null
    const selectedOption = question.options.find((option) => option.id === selectedOptionId) || null
    const correctOption = question.options.find((option) => option.id === question.correctOptionId)
    const isCorrect = selectedOptionId === question.correctOptionId

    return {
      questionId: question.id,
      questionText: question.text,
      selectedOptionId,
      selectedOptionText: selectedOption?.text || 'No answer selected',
      correctOptionId: correctOption.id,
      correctOptionText: correctOption.text,
      isCorrect,
    }
  })

  const correctAnswers = review.filter((item) => item.isCorrect).length
  const wrongAnswers = quiz.questions.length - correctAnswers
  const score = Math.round((correctAnswers / quiz.questions.length) * 100)

  return {
    id: `result-${Date.now()}`,
    quizId: quiz.id,
    quizTitle: quiz.title,
    totalQuestions: quiz.questions.length,
    correctAnswers,
    wrongAnswers,
    score,
    autoSubmitted,
    answers: review,
    startedAt,
    finishedAt,
    timeSpentSeconds: Math.max(0, Math.round((finishedAt - startedAt) / 1000)),
    submittedAt: new Date(finishedAt).toISOString(),
  }
}

function persistResult(result) {
  const storedResults = readStoredResults()
  const nextResults = [result, ...storedResults.filter((item) => item.id !== result.id)]

  storeResults(nextResults)

  return result
}

export async function getQuizzes() {
  try {
    const response = await api.get('/quizzes')

    return normalizeQuizResponse(response.data)
  } catch {
    await delay()

    return mockQuizzes.map(buildQuizSummary)
  }
}

export async function getQuizById(quizId) {
  try {
    const response = await api.get(`/quizzes/${quizId}`)
    const quiz = normalizeQuizDetailResponse(response.data, quizId)

    if (quiz) {
      return quiz
    }
  } catch {
    await delay()
  }

  const quiz = mockQuizzes.find((item) => item.id === String(quizId))

  return quiz ? clone(quiz) : null
}

export async function submitQuiz({ quizId, answers, startedAt, finishedAt, autoSubmitted = false }) {
  const quiz = await getQuizById(quizId)

  if (!quiz) {
    throw new Error('Không tìm thấy đề thi')
  }

  const payload = {
    quizId,
    answers,
    startedAt,
    finishedAt,
    autoSubmitted,
  }

  try {
    const response = await api.post(`/quizzes/${quizId}/submit`, payload)
    const responseData = response.data?.data ?? response.data?.result ?? response.data ?? {}
    const computedResult = calculateResult(quiz, answers, startedAt, finishedAt, autoSubmitted)

    return persistResult({
      ...computedResult,
      ...responseData,
      quizId: String(responseData.quizId ?? quiz.id),
      quizTitle: responseData.quizTitle ?? quiz.title,
      totalQuestions: responseData.totalQuestions ?? quiz.questions.length,
      correctAnswers: responseData.correctAnswers ?? computedResult.correctAnswers,
      wrongAnswers: responseData.wrongAnswers ?? computedResult.wrongAnswers,
      score: responseData.score ?? computedResult.score,
      answers: responseData.answers ?? computedResult.answers,
      startedAt: responseData.startedAt ?? startedAt,
      finishedAt: responseData.finishedAt ?? finishedAt,
      autoSubmitted: responseData.autoSubmitted ?? autoSubmitted,
      submittedAt: responseData.submittedAt ?? new Date(finishedAt).toISOString(),
    })
  } catch {
    await delay()

    return persistResult(calculateResult(quiz, answers, startedAt, finishedAt, autoSubmitted))
  }
}

export async function getResults(quizId = null) {
  try {
    const response = await api.get('/results')
    const payload = response.data?.data ?? response.data?.result ?? response.data ?? {}
    const results = Array.isArray(payload) ? payload : payload.results || payload.items || []

    return quizId ? results.filter((result) => String(result.quizId) === String(quizId)) : results
  } catch {
    await delay()

    const results = readStoredResults()

    return quizId ? results.filter((result) => String(result.quizId) === String(quizId)) : results
  }
}