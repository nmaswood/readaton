
const plotSummary = `Create a concise plot summary of this book based on these key sections. Focus on the main storyline and key events
   Book sections:
    
`

const sentimentAnalysis = `Analyze the emotional tone and sentiment in these five sections of the book. 
    For each section, identify:
    1. The dominant emotions
    2. The overall mood
    3. Any significant emotional shifts

    Provide a structured analysis of the emotional journey through the book.
    
    Book sections:
   `

const languageDetection = `Analyze the following text and provide the language it is written in
Text: 
`


const keyCharacters = `Analyze the following text and identify the key characters
Text: `

export enum Prompts {
    PLOTSUMMARY = plotSummary,
    SENTIMENTANALYSIS = sentimentAnalysis,
    LANGUAGEDETECTION = languageDetection,
    KEYCHARACTERS = keyCharacters

}