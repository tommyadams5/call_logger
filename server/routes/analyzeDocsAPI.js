import checkRepeats from "./checkRepeats.js";
import getFacts from "./getFacts.js";
import sortDates from "./sortDates.js";

// This is the autoApprove option for the API
const analyzeDocsAPI = async (req, res) => {
  const question = req.body.question;
  if (req.body.api) {
    global.APIresponse = { question: question, status: "processing" };
  }
  const factList = [];
  const factsByDay = {};
  const datesList = sortDates(req.body.documents);
  const response = {
    question: question,
    factsByDay: factsByDay,
    status: "done",
  };

  for (let i = 0; i < req.body.documents.length; i++) {
    // Read text file from url
    let response = await fetch(datesList[i][2]);
    let docString = await new Response(response.body).text();

    // Ask LLM for facts about the document
    let facts = await getFacts(question, docString);

    // Ask LLM to remove facts that do not provide new information
    if (i > 0) {
      facts = await checkRepeats(factList, facts);
    }
    factList.push(...facts);
    factsByDay[datesList[i][1]] = facts;
  }
  if (req.body.api) {
    global.APIresponse = response;
    console.log("API request completed");
  } else {
    res.status(200).send(response);
  }
};

export default analyzeDocsAPI;
