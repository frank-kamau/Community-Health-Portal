import { useState } from "react";
import { reportSymptoms } from "../../services/api";

export default function SymptomForm() {
  const [symptomName, setSymptomName] = useState("");
  const [severity, setSeverity] = useState("Mild");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      // API expects symptoms array, severity, notes
      await reportSymptoms({
        symptoms: [symptomName],
        severity,
        notes,
      });
      alert("Symptom reported. Thank you.");
      setSymptomName("");
      setNotes("");
      setSeverity("Mild");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to report symptom");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow max-w-xl">
      <div className="mb-3">
        <label className="block font-medium mb-1">Symptom</label>
        <input
          value={symptomName}
          onChange={(e) => setSymptomName(e.target.value)}
          required
          className="w-full border p-2 rounded"
          placeholder="e.g., Cough, Fever"
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium mb-1">Severity</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option>Mild</option>
          <option>Moderate</option>
          <option>Severe</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block font-medium mb-1">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
          placeholder="Additional details..."
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-60"
        disabled={busy}
      >
        {busy ? "Submitting..." : "Submit Symptom"}
      </button>
    </form>
  );
}
