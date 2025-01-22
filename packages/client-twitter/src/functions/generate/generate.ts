// import { OpenAI } from "openai";

// const IMAGE_SYSTEM_PROMPT = `You create product design mockups in the blockchain/crypto space. Your output should be very concise, with a maximum of 3 sentences. Your output should only contain the description of the mockup, but NOT an instruction like "create an image that..."`;

// const IMAGE_PROMPT_INPUT = `Come up with random product design mockups for crypto/blockchain applications. Some ideas include an improvement to a crypto wallet, marketplace, NFT, or really any concept, but I would stay away from smart contracts. Here are some example outputs, which should be very similar to what you output. Note that I only want you to output one, not multiple options:
// 1. "swapping with ai doesn't always have to be in a chat"
// 2. "LLMs are like athletes. there isn't necessarily an absolute "best". they each have their specializations, strengths and weaknesses. so when you think about AI in the context of your wallet, you should have a choice based on your intent."
// 3. "choose a model in your wallet"
// 4. "can tokens replace tolls?"
// 5. "LLMs that give context on hover"
// 6. "listing nfts is hard. ai can fix it. it can also make things like dynamic listings possible."`;

// const messages = [
//     { role: "user", content: IMAGE_PROMPT_INPUT },
//     {
//         role: "system",
//         content: IMAGE_SYSTEM_PROMPT,
//     },
// ];

// // return new tweet content
// export async function generate(): Promise<string> {
//     // const newTweetContent = await generateText({
//     //     runtime: this.runtime,
//     //     context: IMAGE_PROMPT_INPUT,
//     //     modelClass: ModelClass.MEDIUM,
//     //     customSystemPrompt: IMAGE_SYSTEM_PROMPT,

//     const openai = new OpenAI({
//         baseURL: "https://api.deepseek.com",
//         apiKey: process.env.DEEPSEEK_API_KEY,
//     });

//     console.log("openai", openai);

//     const completion = await openai.chat.completions.create({
//         //@ts-ignore
//         messages: messages,
//         model: "deepseek-reasoner",
//     });

//     console.log("completion", completion);

//     const content = completion.choices[0].message.content;
//     messages.push({ role: "assistant", content: content });
//     return content;
// }
