import jsonGPT from "./jsonGPT.js";

const checkRepeats = async (oldFacts, newFacts) => {
  const prompt = `Determine if any of the facts in List 2 are similar to the facts in List 1. For 
      each fact, write 'true' if it is similar to a fact in List 1 or 'false' if it is not.
      It is okay if all your responses are 'true', or if they are all 'false'.  
      Your answer should be provided in a json array called 'answer', with each item being
      'true' or 'false'.\n LIST 1: ${oldFacts}\n LIST 2:${newFacts}`;

  const filteredFacts = [];
  let factsBool = await jsonGPT(prompt);
  factsBool = factsBool.answer;

  for (let j = 0; j < factsBool.length && j < newFacts.length; j++) {
    if (factsBool[j] === "false") {
      filteredFacts.push(newFacts[j]);
    }
  }
  return filteredFacts;
};

export default checkRepeats;
