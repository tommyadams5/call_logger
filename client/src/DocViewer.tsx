import RangeSlider from "./RangeSlider";

// Document viewer window on View Results tab
export default function DocViewer({
  currentFacts,
  baseState,
  setBaseState,
}: {
  currentFacts: any;
  baseState: any;
  setBaseState: any;
}) {
  return (
    <div>
      <div className="q_header">Question: {currentFacts.question}</div>
      <div className="doc_header_box">
        <div className="doc_header">Date: {baseState.date}</div>
        {!baseState.showReview && (
          <RangeSlider
            setBaseState={setBaseState}
            initial={0}
            end={baseState.dates.length - 1}
          />
        )}
      </div>
      {currentFacts && (
        <textarea
          readOnly
          rows={10}
          cols={80}
          className="doc_text"
          value={currentFacts.docs}
        />
      )}
      {baseState.date && (
        <div className="doc_url">Source: {currentFacts.url}</div>
      )}
    </div>
  );
}
