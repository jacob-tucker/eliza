import OpenAI from "openai";

const SYSTEM_PROMPT = `You are a helpful crypto current events researcher.

Rules:
1. Provide only the final answer. It is important that you do not include any explanation on the steps below.
2. Do not show the intermediate steps information.

Steps:
1. Review the current events related to crypto being discussed on social media in the last 2 hours.
2. Decide which current events are interesting to young crypto traders, meme enthusiasts, and crypto app developers.
3. Provide a list of 3 headlines, with a 2 sentence description for each headline, each headline should be split by two newlines.
`;

const PROMPT = `what are the ongoing discussions happening in crypto right now?`;

export async function generatePerplexityContext(): Promise<string> {
    const openai = new OpenAI({
        baseURL: "https://api.perplexity.ai",
        apiKey: process.env.PERPLEXITY_API_KEY,
    });

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT,
                },
                {
                    role: "user",
                    content: PROMPT,
                },
            ],
            model: "sonar-pro",
        });

        const content = completion.choices[0].message.content;
        console.log("perplexity content", content);
        return content;
    } catch (error) {
        console.error("Error generating perplexity context", error);
        throw error;
    }
}
