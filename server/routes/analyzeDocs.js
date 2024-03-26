import checkRepeats from "./checkRepeats.js";
import getFacts from "./getFacts.js";
import updateFacts from "./updateFacts.js";
import sortDates from "./sortDates.js";

// This is auto approve for the app
const analyzeDocs = async (req, res) => {
  const question = req.body.question;
  const factList = [];
  const factsByDay = {};
  const datesList = sortDates(req.body.documents);
  if (req.body.api) {
    global.APIresponse = { question: question, status: "processing" };
  }

  if (req.body.facts) {
    factList.push(...req.body.facts);
  }

  for (let i = 0; i < datesList.length; i++) {
    let dayEntry = {
      old: [],
      add: [],
      remove: [],
    };

    // Read text file from url
    let response = await fetch(datesList[i][2]);
    let docString = await new Response(response.body).text();

    // Ask LLM for facts about document
    let facts = await getFacts(question, docString);

    if (i > 0) {
      // Ask LLM to check if old facts need to be updated based on new facts
      let factChanges = await updateFacts(factList, facts);

      // "add", "remove", and "old" are facts that the LLM suggests
      // adding, removing, or keeping
      for (let j = 0; j < factList.length; j++) {
        if (factChanges[j] !== "false" && factChanges[j] !== false) {
          if (factChanges[j] === factList[j]) {
            dayEntry["old"].push(factList[j]);
          } else {
            dayEntry["remove"].push(factList[j]);
            dayEntry["add"].push(factChanges[j]);
            factList[j] = factChanges[j];
          }
        } else {
          dayEntry["old"].push(factList[j]);
        }
      }

      // Ask LLM to remove facts that do not provide new information
      facts = await checkRepeats(factList, facts);
    }

    // Send facts, documents, and question to client
    factList.push(...facts);
    dayEntry["add"].push(...facts);
    if (!req.body.api) {
      if ("docs" in dayEntry) {
        dayEntry["docs"].push(`\n${docString}`);
      } else {
        dayEntry["docs"] = [docString];
      }
      dayEntry["question"] = req.body.question;
      if ("url" in dayEntry) {
        dayEntry["url"].push(", " + datesList[i][2]);
      } else {
        dayEntry["url"] = [datesList[i][2]];
      }
    }
    factsByDay[datesList[i][1]] = dayEntry;
  }
  if (req.body.api) {
    global.APIresponse = {
      question: question,
      factsByDay: factsByDay,
      status: "done",
    };
    console.log("API request completed");
  } else {
    res.status(200).send(factsByDay);
  }
};

export default analyzeDocs;
