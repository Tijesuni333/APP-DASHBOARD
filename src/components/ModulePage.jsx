export default function ModulePage({
  title,
  description,
  actions,
  output,
  input,
  setInput,
  onDownload,
}) {
  return (
    <div className="module-page">

      <div className="module-header">
        <h1 className="text-page-title">{title}</h1>
        <p className="text-body">{description}</p>
      </div>

      <div className="module-actions">
        {actions}
      </div>

      <div className="module-grid">

        <div className="module-main">
          <textarea
            className="module-input"
            placeholder="Paste servers / assets / input data here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="module-output">

          <div className="module-output-header">

            <span>Execution Output</span>

            <button
              className="download-button"
              onClick={onDownload}
            >
              Download Report
            </button>

          </div>

          <pre className="module-console">
            {output || "No output yet..."}
          </pre>

        </div>

      </div>

    </div>
  );
}