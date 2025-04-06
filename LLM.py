import ollama
from google import genai
from google.genai import types

client = genai.Client(api_key="AIzaSyDR_EVwevdInqeRYjpYodyEYqXYJc0dmw0")
class LLM:
    def __init__(self, service, system, model):
        self.service = service
        self.system = system
        self.model = model

    def generateResponse(self, prompt):
        if self.service=="google":
            response = client.models.generate_content(model=self.model, contents=prompt, config=types.GenerateContentConfig(system_instruction=self.model),)
            return response.text

        if self.service=="ollama":
            response = ollama.generate(model=self.model, prompt=self.system+prompt, )
            return response.response
