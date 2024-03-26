import { useState } from "react";

// Ask Question tab. Allows user to enter a question and documents to query
export default function AskQuestion({
  baseState,
  setBaseState,
  submit,
}: {
  baseState: any;
  setBaseState: any;
  submit: any;
}) {
  const [document, setDocument] = useState("");

  const addDoc = (e: any) => {
    const docs = e.target.value.split(",");
    setDocument(docs);
  };

  const submitDoc = (e: any) => {
    e.preventDefault();
    if (document != "") {
      setBaseState((x: any) => ({
        ...x,
        documents: [...x.documents, ...document],
      }));
    }
  };

  const handleCheckbox = (e: any) => {
    const isChecked = e.target.checked;
    setBaseState((x: any) => ({
      ...x,
      autoApprove: isChecked,
    }));
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setBaseState((x: any) => ({
      ...x,
      [name]: value,
    }));
  };

  return (
    <div>
      <form className="query_form" onSubmit={submit}>
        <div className="query_header">
          What do you want to know about the documents?
        </div>
        <input
          className="add_doc_input query"
          name="question"
          onChange={handleChange}
          type="text"
          placeholder="Enter a question"
        />
        <button className="add_doc_buttons" type="submit">
          Run Query
        </button>
        <div />
        <input
          className="autoApp_box"
          type="checkbox"
          id="autoApprove"
          name="autoApprove"
          value="true"
          onChange={handleCheckbox}
        />
        <span>Auto approve suggested edits</span>
      </form>
      <div className="content_col">
        <form className="add_doc_form" onSubmit={submitDoc}>
          <div className="query_header">Add text documents to query</div>
          <input
            className="add_doc_input"
            name="documents"
            onChange={addDoc}
            type="text"
            placeholder="Enter document URL"
          />
          <button className="add_doc_buttons" type="submit">
            Add Doc
          </button>
          {baseState.documents.map((doc: string, idx: number) => (
            <div className="doc_list" key={idx + doc}>
              {doc}
            </div>
          ))}
        </form>
      </div>
      {baseState.warning && (
        <div className="add_doc_warning">{baseState.warning}</div>
      )}
    </div>
  );
}
