const {GoogleGenAI} = require('@google/genai')
const gemini = new GoogleGenAI({
    apiKey : process.env.ai_api_key
})

const ai = async (prompt)=>{
    const response = await gemini.models.generateContent({
        model : "gemini-2.5-flash",
        contents : prompt
    });
    return(response.text)
}

module.exports = ai