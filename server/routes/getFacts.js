import jsonGPT from "./jsonGPT.js";

const getFactsQuery = async (question, context) => {
  const prompt = `Please answer the following question based on the context.
  Your answer should be provided as a list of facts, using 
  simple and clear language. Each fact should be different than the others.
  Each fact should be concise and not longer than 1 sentence. 
  It is okay if you can only find a few facts.
  Provide this list as a json array that is named after the date of the facts, 
  for example '2024-03-15'.
  EXAMPLE ANSWER: {
    "2024-03-14": [
      "This is an example sentence about fact 1.",
      "This is an example sentence about fact 2.",
      "This is an example sentence about fact 3.",
      ...
    ]}
    QUESTION: ${question}\n  CONTEXT: ${context}
  `;
  const facts = await jsonGPT(prompt);
  const keys = Object.keys(facts);
  const result = facts[keys[0]];
  return result;
};

const getFacts = async (question, context, attempts = 5) => {
  let tries = 0;
  while (tries < attempts) {
    tries += 1;
    try {
      let result = await getFactsQuery(question, context);
      for (let item of result) {
        if (item.length < 10) {
          console.log("Error with getFacts: item.length < 10");
          continue;
        }
      }
      return result;
    } catch {
      console.log("Error with getFacts query: general");
      continue;
    }
  }
  return result;
};

export default getFacts;
