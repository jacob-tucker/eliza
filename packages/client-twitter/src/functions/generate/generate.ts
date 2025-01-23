import { OpenAI } from "openai";
import { generatePerplexityContext } from "./perplexity";

const IMAGE_SYSTEM_PROMPT = `You create iphone mockups with fictional app ideas or app features, specifically related to or involving crypto products. Your output should be very concise, with a maximum of 3 sentences. Your output should only contain the description of the mockup with a focus on the key feature or UI component, but NOT an instruction like "create an image that..."`;

const IMAGE_PROMPT_INPUT = `Come up with a product design mockup that demonstrates useful blockchain features that don't exist yet. Some ideas include an improvement to a crypto wallet, new ways to own things on the internet, new ways to port your onchain data across different apps, better ways to swap or spend funds, new ways to tokenize things, or any general way blockchain can make everyday apps better. Use familiar apps to demonstrate your idea such as Phantom wallet, Doordash, iMessage, Uber, Amazon, Airbnb, Tinder, Twitter and any other app that people tend to use every day. Here are some example outputs, which should be very similar to what you output. They include one sentence to highlight the problem, and one sentence to communicate how the design solves the problem. Note that I only want you to output one, not multiple options:
1. Betting on sports is fun, but it’s even more fun if you could do it with your friends. What if you could bet with your friends in the group chat?
2. Rental applications are a pain and involve sharing sensitive personal information over email. What if you could prove you meet the requirements of a rent application without sharing any personal information with zero knowledge proofs?
3. few things are more inefficient than the time between finishing a meal and paying the bill.
if you could check in to a restaurant and open a tab with your wallet, you could pay and leave whenever you want.
4. there is absolutely no reason why every art marketplace shouldn't have "for you" recommendations based on the things you already have in your wallet. What if every app’s algorithm knew what you liked based on your holdings?
5. It’s such a pain to swap and offramp my coins to buy things. What if you could create conversion logic when making payments with Apple Pay (i.e. swap all of my worst performing coins to cash until the amount needed for this payment is reached)
6. I never trust restaurant reviews on google. What if I could port my social graph into any app and filter down reviews/recs from only friends?`;

const messages = [
    {
        role: "system",
        content: IMAGE_SYSTEM_PROMPT,
    },
];

// return new tweet content
export async function generate(): Promise<string> {
    // const newTweetContent = await generateText({
    //     runtime: this.runtime,
    //     context: IMAGE_PROMPT_INPUT,
    //     modelClass: ModelClass.MEDIUM,
    //     customSystemPrompt: IMAGE_SYSTEM_PROMPT,

    // const perplexityContext = await generatePerplexityContext();
    // const newPrompt = `${IMAGE_PROMPT_INPUT}

    // Additionally, you have context about current events to make your text timely and relevant. You can use these events in your ideation to inform your design mockup if you want to, use your judgement to decide whether you want to use it or not: ${perplexityContext}`;

    messages.push({ role: "user", content: IMAGE_PROMPT_INPUT });

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
        console.log("deepseek content", content);
        messages.push({ role: "assistant", content: content });
        return content;
    } catch (error) {
        console.error("Error WITH DEEPSEEK", error);
        throw error;
    }
}
