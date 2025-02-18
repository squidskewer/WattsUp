import os
from dotenv import load_dotenv

load_dotenv() # Load the API Key from the .env file
API_KEY = os.getenv("API_KEY") # Keep API Key private