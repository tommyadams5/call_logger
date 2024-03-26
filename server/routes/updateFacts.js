import jsonGPT from "./jsonGPT.js";

const updateFactsQuery = async (oldFacts, newFacts) => {
  const prompt = `For each of the old facts in List 1, look through the new facts
   in List 2 and see if the old fact in List 1 needs to be updated or changed based 
   on the new facts in List 2. For each fact in List 1 that needs to be changed, write 
   an updated fact that is no longer than a sentence. 
   Your answer should be provided in a json array called 'answer', with 
   each item being the text of the updated fact or 'false' if the fact from List 1 does
   not need to be updated. The number of items in the array should be the same as the
   number of items in List 1. It is okay if all the items in the array are 'false'. 
   EXAMPLE ANSWER: 
   {"answer": ["false", "This is updated text for this fact", "false", ...]}
  \n LIST 1: ${oldFacts}\n LIST 2:${newFacts}`;

  let response = await jsonGPT(prompt);
  response = response.answer;

  return response;
};

const updateFacts = async (oldFacts, newFacts, attempts = 5) => {
  let tries = 0;
  while (tries < attempts) {
    tries += 1;
    try {
      let result = await updateFactsQuery(oldFacts, newFacts);
      if (result.length !== oldFacts.length) {
        console.log("Error with updateFacts: incorrect number of responses");
        continue;
      }
      for (let item of result) {
        if (item.length < 10 && item !== "false") {
          console.log("Error with updateFacts: item.length < 10");
          continue;
        }
      }
      return result;
    } catch {
      console.log("Error with updateFacts: general");
      continue;
    }
  }
  return Array(oldFacts.length).fill("false");
};

export default updateFacts;
