import "./ShowFacts.css";

// Allows user to review fact changes proposed by the API and reject or approve them
export default function SelectFacts({
  currentFacts,
  setFacts,
  facts,
  baseState,
  setBaseState,
}: {
  currentFacts: { [key: string]: string[] };
  setFacts: any;
  facts: any;
  baseState: any;
  setBaseState: any;
}) {
  const addRejections = new Set();
  const removeRejections = new Set();

  // Track fact additions that are rejected by user
  const addChange = (e: any) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (!isChecked) {
      addRejections.add(value);
    } else {
      addRejections.delete(value);
    }
  };

  // Track fact removals that are rejected by user
  const removeChange = (e: any) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (!isChecked) {
      removeRejections.add(value);
    } else {
      removeRejections.delete(value);
    }
  };

  const submit = () => {
    //Remove all current and future mentions of rejected suggestions
    const factsUpdated = { ...facts };
    for (let idx = baseState.dateNum; idx < baseState.dates.length; idx++) {
      let dateFacts = factsUpdated[baseState.dates[idx]];
      for (let item of addRejections) {
        dateFacts["old"] = dateFacts["old"].filter((x: any) => x !== item);
        dateFacts["add"] = dateFacts["add"].filter((x: any) => x !== item);
        dateFacts["remove"] = dateFacts["remove"].filter(
          (x: any) => x !== item
        );
      }
      dateFacts["old"].push(...removeRejections);

      if (idx === baseState.dateNum) {
        for (let item of removeRejections) {
          dateFacts["remove"] = dateFacts["remove"].filter(
            (x: any) => x !== item
          );
        }
      }
    }

    // Update facts based on user input
    setFacts(factsUpdated);

    // Call setDateNum if date exists, otherwise setDateNum to zero and toggle showReview
    if (baseState.dateNum == baseState.dates.length - 1) {
      setBaseState({ ...baseState, dateNum: 0, showReview: false });
    } else {
      setBaseState({ ...baseState, dateNum: baseState.dateNum + 1 });
    }
  };

  return (
    <div>
      <div className="header">
        Fact Change Suggestions: green facts will be added and red facts will be
        removed
      </div>
      <form className="fact_list">
        {currentFacts["old"].map((fact: string, idx: number) => (
          <div key={"old" + fact.slice(0, 20) + idx} className="factbox">
            <div className="bullet"></div>
            <div key={fact.slice(0, 20) + idx + "old"} className="old facts">
              {fact}
            </div>
          </div>
        ))}
        {currentFacts["add"].map((fact: string, idx: number) => (
          <div key={"add" + fact.slice(0, 20) + idx} className="factbox">
            <input
              type="checkbox"
              className="fact_checkbox"
              key={fact.slice(0, 20) + idx + "add"}
              name="add"
              value={fact}
              defaultChecked
              onChange={addChange}
            />
            <div className="add facts">{fact}</div>
          </div>
        ))}
        {currentFacts["remove"].map((fact: string, idx: number) => (
          <div key={"remove" + fact.slice(0, 20) + idx} className="factbox">
            <input
              type="checkbox"
              className="fact_checkbox"
              key={fact.slice(0, 20) + idx + "remove"}
              name="remove"
              value={fact}
              defaultChecked
              onChange={removeChange}
            />
            <div className="remove facts">{fact}</div>
          </div>
        ))}
      </form>
      <div className="button_wrapper">
        <div></div>
        <button className="accept_button" onClick={submit}>
          Accept Changes
        </button>
      </div>
    </div>
  );
}
