export default function FeedbackState({ type = 'empty', title, description, action }) {
  return (
    <div className={`feedback-state feedback-state--${type}`}>
      <h2>{title}</h2>
      <p>{description}</p>
      {action ? <div className="feedback-action">{action}</div> : null}
    </div>
  )
}