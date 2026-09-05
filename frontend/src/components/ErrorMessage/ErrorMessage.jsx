import "./ErrorMessage.css";

export function ErrorMessage({
  title = "Something went wrong",
  message,
  onRetry,
}) {
  return (
    <div className="error-panel" role="alert">
      <div className="error-icon" aria-hidden="true">!</div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {onRetry && (
        <button className="btn btn-outline" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
