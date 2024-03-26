import { useState, useEffect } from "react";
import ShowFacts from "./ShowFacts";
import DocViewer from "./DocViewer";
import NavBar from "./NavBar";
import AskQuestion from "./AskQuestion";
import SelectFacts from "./SelectFacts";
import Loader from "./Loader";
import "./App.css";

export default function App() {
  const [baseState, setBaseState] = useState({
    date: "", // current date for showing facts
    dates: [] as string[], // array of all dates in the data
    dateNum: -1, // current date selected from dates array
    showQA: false, // show Ask Question tab
    showReview: true, // show View Results tab
    loading: false, // show Loading screen
    warning: "", // set warning for Ask Question tab
    question: "", // user question
    documents: [] as string[], // user selected documents to query
    autoApprove: false, // user option to automatically approve fact suggestions
  });

  // Separated fact states from baseState because large fact arrays could make
  // reassigning state costly
  const [currentFacts, setCurrentFacts] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [facts, setFacts] = useState<{
    [key: string]: { [key: string]: string[] };
  }>({});

  const factsLoaded =
    Array.isArray(currentFacts.add) || Array.isArray(currentFacts.old);

  // Reset autoApprove checkbox when switching tab
  useEffect(() => {
    setBaseState({ ...baseState, autoApprove: false });
  }, [baseState.showQA]);

  // Linking date to dateNum, so that it automatically updates
  useEffect(() => {
    if (baseState.dateNum != -1) {
      setBaseState({ ...baseState, date: baseState.dates[baseState.dateNum] });
    }
  }, [baseState.dateNum]);

  // Update the shown facts based on changes in facts or the selected date
  useEffect(() => {
    if (facts[baseState.date]) {
      setCurrentFacts(facts[baseState.date]);
    }
  }, [baseState.date, facts]);

  // Function for submitting form data to API
  const submit = async (e: any) => {
    // Validate user input
    e.preventDefault();
    if (baseState.documents.length === 0) {
      setBaseState({
        ...baseState,
        warning: "No Documents Have Been Added",
      });
    } else if (baseState.question === "") {
      setBaseState({
        ...baseState,
        warning: "No Question Has Been Entered",
      });
    } else {
      const formData = {
        question: baseState.question,
        documents: baseState.documents,
        autoApprove: baseState.autoApprove,
      };

      // Launch loading screen
      setBaseState({ ...baseState, warning: "", loading: true });

      // Make request. If successful, show the View Results tab
      try {
        const result = await fetch("/server/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        let data = await result.json();
        setFacts(data);
        setBaseState({
          ...baseState,
          dates: Object.keys(data),
          dateNum: 0,
          question: "",
          documents: [],
          showQA: true,
          loading: false,
          showReview: !baseState.autoApprove,
        });
      } catch (error) {
        console.error("Error:", error);
        setBaseState({ ...baseState, showQA: false, loading: false });
      }
    }
  };

  return (
    <div className="add_doc_wrapper">
      <div />
      <div>
        {baseState.loading && <Loader />}
        <NavBar setBaseState={setBaseState} baseState={baseState} />
        {!baseState.showQA && (
          <AskQuestion
            baseState={baseState}
            setBaseState={setBaseState}
            submit={submit}
          />
        )}
        {baseState.showQA && (
          <div>
            <DocViewer
              currentFacts={currentFacts}
              baseState={baseState}
              setBaseState={setBaseState}
            />
            <div className="fact_box">
              {factsLoaded && (
                <>
                  {!baseState.showReview && <ShowFacts facts={currentFacts} />}
                  {baseState.showReview && (
                    <SelectFacts
                      currentFacts={currentFacts}
                      setFacts={setFacts}
                      facts={facts}
                      baseState={baseState}
                      setBaseState={setBaseState}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
