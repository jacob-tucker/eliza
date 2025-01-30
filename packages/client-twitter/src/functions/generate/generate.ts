import { OpenAI } from "openai";
import { generatePerplexityContext } from "./perplexity";

const IMAGE_SYSTEM_PROMPT = `you create iphone mockups with fictional app ideas or app features, specifically related to or involving blockchain products.
the text must be all lower case, in a casual and conversational tone, and up to 3 short statements total.
use short line breaks for each new thought.
do not write instructions like "create this image." only describe the mockup in a way that feels surprising or insightful.
`;

const IMAGE_PROMPT_INPUT = `imagine a blockchain feature that seems obvious but isn't built yet.
it should make everyday apps feel completely different when you add tokenized elements or onchain logic.
keep it short, lowercased, and broken into small paragraphs.
speak casually, like you just realized something big that flips the usual approach on its head.
some ideas include an improvement to a crypto wallet, new ways to own things on the internet, new ways to port your onchain data across different apps, better ways to swap or spend funds, new ways to tokenize things, or any general way blockchain can make everyday apps better.
here are some example outputs, which should be very similar to what you output. They include one sentence to highlight the problem, and one sentence to communicate how the design solves the problem. Note that I only want you to output one, not multiple options:
1. betting on sports is fun, but it’s even more fun if you could do it with your friends.\n\nwhat if you could use smart contracts to bet with your friends in the group chat?
2. rental applications are a pain and involve sharing sensitive personal information over email.\n\n what if you could prove you meet the requirements of a rent application without sharing any personal information with zero knowledge proofs?
3. few things are more inefficient than the time between finishing a meal and paying the bill.\n\nif you could check in to a restaurant and open a tab with your wallet, you could pay and leave whenever you want.
4. there is absolutely no reason why every art marketplace shouldn't have "for you" recommendations based on the things you already have in your wallet.\n\nwhat if every app’s algorithm knew what you liked based on your holdings?
5. it’s such a pain to swap and offramp my coins to buy things.\n\nwhat if you could swap at the point of payment with Apple Pay?
6. i never trust restaurant reviews on google.\n\nwhat if I could port my social graph into any app and filter down reviews/recs from only friends?`;

const messages = [
    {
        role: "system",
        content: IMAGE_SYSTEM_PROMPT,
    },
];

// return new tweet content
export async function generate(): Promise<string> {
    // const perplexityContext = await generatePerplexityContext();
    // const newPrompt = `${IMAGE_PROMPT_INPUT}

    // Additionally, you have context about current events to make your text timely and relevant. You can use these events in your ideation to inform your design mockup if you want to, use your judgement to decide whether you want to use it or not: ${perplexityContext}`;

    if (messages[messages.length - 1].role !== "user") {
        messages.push({ role: "user", content: IMAGE_PROMPT_INPUT });
    }

    const openai = new OpenAI({
        baseURL: "https://api.deepseek.com",
        apiKey: process.env.DEEPSEEK_API_KEY,
    });

    try {
        const completion = await openai.chat.completions.create({
            //@ts-ignore
            messages: messages,
            model: "deepseek-reasoner",
        });
        const content = completion.choices[0].message.content;
        messages.push({ role: "assistant", content: content });
        return content;
    } catch (error) {
        console.error("Error WITH DEEPSEEK", error);
        throw error;
    }
}
