import OpenAI from "openai";
const openai = new OpenAI({apiKey:process.env.openai_key});
import letter from './letter.json';

export async function state1(input) {
    const instruction = `I will provide you a sentences that should include a request for a letter. Your task is to identify only the letter being referred to.  You should return a json, the letter (in lowercase) with key="letter" and key="content".
    If there is no letter identified return a json with letter value null, and do not include double quotes in your content. 
    If there is no letter identified, you can answer questions about you (you are Sei, an American Sign Language assistant ) and your capabilities ( teach through instructions and video detection using users camera) inside content, but always finish asking the user what letter he wants to learn, you cannot answer other questions. `
  
    const messages =  [
      {role: "system", content:instruction},
      {role: "user", content: "Lets work on b"},
      {role: "assistant", content:`{"letter": "b", "content": null}`},
      {role: "user", content: "i"},
      {role: "assistant", content:`{"letter": "i", "content": null}`},
      {role: "user", content: "Hi"},
      {role: "assistant", content:`{"letter": null, "content":"Hi, what letter do you want to learn"}`},
      {role: "user", content: "that was nice, thank you i will wait for now"},
      {role: "assistant", content:`{"letter": null, "content":"You're welcome! If you have any other questions or need assistance in the future, feel free to ask. Just let me know when you're ready to learn a letter. Have a great day!"}`},
      {role: "user", content: input},
    ]
  
    try {
      // Call the OpenAI API with some text (replace with your actual use case)
      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
      });
      console.log(completion.choices[0].message)
      const obj = JSON.parse(completion.choices[0].message.content)
      
      if(obj.letter){
        obj.content = letter[obj.letter.toLowerCase()]["intructions"]
      }
      return obj
    } catch (error) {
      console.log(error)
      throw new Error(`OpenAI API call failed: ${error.message}`);
    }
}
  
export async function state2(input,letter){
    const instruction = `You are an assistant for American Sign Language, answering questions about the letter "${letter.value}", Context instructions for letter:"${letter.instruction}". 
    You are going to return a JSON with following keys and format {"content":"Your answer", "jump":"value"},
    where content should be your answer to user question (if user has no question return an empty string "") inside your answer in content avoid using double quotes, and jump should be "yes" if user has no questions, otherwise return null. If the user input refers to affirmative ask him for his question.`
    const messages =  [
      {role: "system", content:instruction},
      {role: "user", content: "yes"},
      {role: "assistant", content:`{"content":"Sure, what is your question about the letter 'A'?", "jump": null}`},
      {role: "user", content: "which is the finger that I should keep up?"},
      {role: "assistant", content:`{"content":"The finger that you should keep up when signing the letter 'I' is your pinkie finger.", "jump": "yes"}`},
      {role: "user", content: input},
    ]
    
    try {
      // Call the OpenAI API with some text (replace with your actual use case)
      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
      });
      console.log(completion.choices[0].message)
      const obj = JSON.parse(completion.choices[0].message.content)
      
      return obj
    } catch (error) {
      console.log(error)
      throw new Error(`OpenAI API call failed: ${error.message}`);
    }
  }