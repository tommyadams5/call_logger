import analyzeDocs from "./analyzeDocs.js";
import analyzeDocsAPI from "./analyzeDocsAPI.js";

const apiAnalyze = async (req, res) => {
  req.body.api = true;
  console.log("Processing API request");
  if (req.body.autoApprove !== false) {
    analyzeDocsAPI(req, res);
  } else {
    analyzeDocs(req, res);
  }
  res.status(200).send(
    `Request received. To receive output, 
      send a get request to '/get_question_and_facts'`
  );
};

export default apiAnalyze;
