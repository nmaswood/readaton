
"use server";

import Groq from "groq-sdk";
// import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
// import { ChatGroq } from '@langchain/groq';
// import { PromptTemplate } from '@langchain/core/prompts';
// import { ConversationChain } from 'langchain/chains';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export type AnalysisState = {
    response: string;
    error: string;
}
export async function analyzeBook(text: string, analysis: string) {
    try {
        const paragraphs = text.split(/\n\s*\n/);

        const totalParagraphs = paragraphs.length

        const samplePoints = [
            0,
            Math.floor(totalParagraphs * 0.25),
            Math.floor(totalParagraphs * 0.5),
            Math.floor(totalParagraphs * 0.75),
            totalParagraphs - 1
        ];

        const samples = samplePoints.map(point => {
            return paragraphs.slice(point, point + 3).join('\n\n');
        });


        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `
                    ${analysis}
                    
                    ${samples[0]}
    
                  
                    ${samples[1]}
                    
                  
                    ${samples[2]}
                    
                  
                    ${samples[3]}
                    
                   
                    ${samples[4]}
                    `
                },
            ],
            model: "llama3-8b-8192",
        });

        return { response: response.choices[0].message.content ?? "", error: "" }

    } catch (e: any) {
        return { response: "", error: e.error.error.message }
    }
}