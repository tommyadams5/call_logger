import "./NavBar.css";
import title from "./assets/phone.png";

// Navigation bar for switching between Ask Question and View Results tabs
export default function NavBar({
  setBaseState,
  baseState,
}: {
  setBaseState: any;
  baseState: any;
}) {
  const handleClick = () => {
    setBaseState((x: any) => ({
      ...x,
      showQA: false,
      warning: "",
      formData: { ...x.formData, question: "" },
    }));
  };
  const handleClick2 = () => {
    setBaseState((x: any) => ({
      ...x,
      showQA: true,
      dateNum: 0,
    }));
  };

  return (
    <div className="navbar">
      <div className="title_logo">
        <span className="title">CALL LOGGER</span>
        <img className="phone" src={title} alt="" />
      </div>
      <div className="navbar_options">
        <button
          className={baseState.showQA ? "navbar_link" : "navbar_link clicked"}
          onClick={handleClick}
        >
          Ask Question
        </button>
        <button
          className={baseState.showQA ? "navbar_link clicked" : "navbar_link"}
          onClick={handleClick2}
        >
          View Results
        </button>
      </div>
    </div>
  );
}
