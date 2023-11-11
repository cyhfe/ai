import { openai } from "./openai.js";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// readline
const rl = readline.createInterface({ input, output });
// const answer = await rl.question("What do you think of Node.js? ");
// console.log(`Thank you for your valuable feedback: ${answer}`);
// rl.close();

const newMessage = async (history, message) => {
  const completion = await openai.chat.completions.create({
    messages: [...history, message],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0];
};
