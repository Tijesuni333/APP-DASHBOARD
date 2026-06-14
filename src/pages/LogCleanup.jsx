import { useState } from "react";
import ModulePage from "../components/ModulePage";

export default function LogCleanup() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const handleRun = async () => {
    setLoading(true);
    setOutput("");

    // simulate processing delay (backend later replaces this)
    setTimeout(() => {
      setOutput("Log cleanup completed successfully.");
      setLoading(false);
    }, 2000);
  };

  return (
    <ModulePage
      title="Log Cleanup"
      description="Clean expired logs from selected servers"
      input={input}
      setInput={setInput}
      output={output}
      actions={
        <button
          className="run-button"
          onClick={handleRun}
          disabled={loading}
        >
          {loading ? "Processing request..." : "Run Script"}
        </button>
      }
    />
  );
}