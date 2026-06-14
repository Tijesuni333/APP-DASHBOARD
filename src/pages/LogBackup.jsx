import { useState } from "react";
import ModulePage from "../components/ModulePage";

export default function LogBackup() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const handleRun = async () => {
    setLoading(true);
    setOutput("");

    setTimeout(() => {
      setOutput("Log backup completed successfully. Files archived.");
      setLoading(false);
    }, 2500);
  };

  return (
    <ModulePage
      title="Log Backup"
      description="Archive and compress system logs from all servers"
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