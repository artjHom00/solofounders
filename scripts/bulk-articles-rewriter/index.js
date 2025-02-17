console.clear()

import fs from "fs";
import path from "path";
import {
    OpenAI
} from "openai";

import dotenv from "dotenv"
dotenv.config()

// OpenAI API Key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Load input JSON file
import sources from "./input.js";
const outputDir = "output";

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Function to rewrite content using OpenAI
async function rewriteContent(content, index) {
    const prompt = `Act as an SEO expert. Translate this article to english. Humanize the article, so it will not be detectable that it's AI-rewritten: 
    ${content}`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{
                role: "user",
                content: prompt
            }],
            temperature: 0.95,
        });

        const rewrittenContent = response.choices[0].message.content;

        // Save to separate JSON files
        const outputFilePath = path.join(outputDir, `rewritten_${index + 1}.json`);
        fs.writeFileSync(outputFilePath, JSON.stringify({
            rewritten: rewrittenContent
        }, null, 2));
        console.log(`Saved: ${outputFilePath}`);
    } catch (error) {
        console.error("Error rewriting content:", error);
    }
}

// Process each text in the JSON array
(async () => {
    for (let i = 0; i < sources.length; i++) {
        console.log(`Processing: article #${i + 1}`)
        await rewriteContent(sources[i], i);
        console.log(`Done: article #${i + 1}`)
    }
})();