import { useState } from "react";
import ModulePage from "../components/ModulePage";

export default function FetchUpdate() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const handleRun = async () => {
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch(
        "http://localhost:5000/run-fetch-update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: input,
          }),
        }
      );

      const data = await response.json();
      setOutput(data.logs?.join("\n"));
    } catch (error) {
      setOutput(
        `Error connecting to backend:\n${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:5000/download-report");
      const data = await response.json();

      if (response.ok) {
        // Assuming data.report contains the report content
        // You might want to format this into a downloadable file (e.g., JSON, CSV, TXT)
        console.log("Report downloaded:", data.report);
        // Example: Trigger download
        const blob = new Blob([JSON.stringify(data.report, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "report.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

      } else {
        console.error("Error downloading report:", data.message);
        setOutput(`Error downloading report: ${data.message}`);
      }
    } catch (error) {
      console.error("Error connecting to backend for download:", error);
      setOutput(`Error connecting to backend for download:\n${error.message}`);
    }
  };

  return (
    <ModulePage
      title="Fetch Update"
      description="Retrieve latest system configurations from all nodes"
      input={input}
      setInput={setInput}
      output={output}
      actions={
        <>
          <button
            className="run-button"
            onClick={handleRun}
            disabled={loading}
          >
            {loading ? "Processing request..." : "Run Update"}
          </button>
        </>
      }
      onDownload={handleDownload} // Pass handleDownload directly as a prop
    />
  );
}






