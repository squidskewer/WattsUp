from flask import Flask, jsonify # Flask as a framework
from flask_cors import CORS # CORS to allow cross-origin requests
from api_handler import fetch_energy_data # Get function from api_handler.py

app = Flask(__name__) # Start Flask
CORS(app) # Setup CORS

@app.route('/energy-data/<region>', methods=['GET'])
def energy_data(region):
    """API endpoint to fetch energy consumption for a selected region"""
    data = fetch_energy_data(region) # Fetch data from API
    return jsonify(data) # Return data as JSON

@app.route('/regions', methods=['GET']) # Server route would be http://127.0.0.1:5000/energy-data/{region name}
def get_regions():
    """Return available regions"""
    regions = [
        "pacific",
        "midwest",
        "new-mexico",
        "southwest",
        "oklahoma",
        "south-carolina",
        "new-york",
        "rocky-mountain"
    ]
    return jsonify({"regions": regions}) # Return regions as JSON

if __name__ == '__main__': # Run app
    app.run(debug=True)