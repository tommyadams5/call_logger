import express from "express";
import analyzeDocs from "./routes/analyzeDocs.js";
import sendFacts from "./routes/sendFacts.js";
import apiAnalyze from "./routes/apiAnalyze.js";

const app = express();
global.APIresponse = {};

app.use(express.json());
app.use("/", express.static("dist"));
app.use("/samples", express.static("public")); // sample files for testing
app.post("/submit_question_and_documents", apiAnalyze);
app.get("/get_question_and_facts", sendFacts);
app.post("/server/submit", analyzeDocs);

// Initialize server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
