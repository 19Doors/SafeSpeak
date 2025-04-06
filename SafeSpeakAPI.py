from flask import Flask, json, jsonify, request
from flask_cors import CORS

from LLM import LLM

app = Flask(__name__)
CORS(app)

genai = LLM(service="google", system="", model="gemini-2.0-flash-lite")

@app.route("/")
def home():
    return jsonify("{'msg':'welcome'}"),200

@app.route("/api/checkToxicText", methods=['POST'])
def checkToxicText():
    text = request.get_json()['text']
    prompt = f"""
You are an AI content moderation assistant. Analyze the following input text and evaluate it for the following categories:

Toxicity: Includes hate speech, insults, threats, or aggressive language.

Harmfulness: Includes content that encourages violence, self-harm, or misinformation.

NSFW (Not Safe For Work): Includes sexually explicit content, nudity, or adult language.

For each category, return a score between 0.0 (not present) to 1.0 (very high presence). Also include a short explanation for each score.

Respond only with a JSON object in the following format:
keys: toxicity - score,explanation,
harmfulness - score,explanation,
nsfw - score,explanation

Now analyze the following text:
    {text}
    """
    response = genai.generateResponse(prompt=prompt)
    response = response.replace("```json","")
    response = response.replace("```","")

    return jsonify(response),200

app.run()
