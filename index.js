import express from "express";
import cors from "cors";

const app = express();

// Allow CORS from all domains
app.use(cors());

app.get("/generate", (request, response) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": request.query.q ?? "say hi to ai devlabs"
                    }
                ]
            }
        ]
    });
    
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    
    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=[KEY]", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            // Fixed response format to access the generated content
            response.json(result.candidates[0].content.parts[0].text);
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send("Error generating content");
        });
});

app.listen(3001, () => {
    console.log("Started on port 3001");
});
