import "./SelectFacts.css";

export default function ShowFacts({
  facts,
}: {
  facts: { [key: string]: string[] };
}) {
  return (
    <div>
      <div className="header">Facts at end of day:</div>
      <ul className="fact_list">
        {facts["old"].map((fact: string, idx: number) => (
          <li className="old facts" key={idx}>
            {fact}
          </li>
        ))}
        {facts["remove"].map((fact: string, idx: number) => (
          <li className="remove facts" key={idx}>
            {fact}
          </li>
        ))}
        {facts["add"].map((fact: string, idx: number) => (
          <li className="add facts" key={idx}>
            {fact}
          </li>
        ))}
      </ul>
    </div>
  );
}
