import requests
from config import API_KEY # Take API key from config.py

def fetch_energy_data(region):
    """
    Fetch energy consumption data for a specific region
    Parameters:
        region (str): region code/name
    """
    
    # Map of user-friendly names to subba codes
    region_codes = {
        'pacific': 'PGAE', # Pacific Gas & Electric
        'midwest': '0001', # Midcontinent Independent System Operator
        'new-mexico': 'CYGA', # Public Service Company of New Mexico
        'southwest': 'AEPW', # American Electric Power
        'oklahoma': 'OKGE', # Oklahoma Gas and Electric
        'south-carolina': 'SPS', # South Carolina Public Service
        'new-york': 'ZONC', # New York Independent System Operator
        'rocky-mountain': 'TSGT' # Tri-State Generation and Transmission
    }
    
    # Get the subba code, raise error if region not found
    if region not in region_codes:
        return {
            "status": "error",
            "message": f"Invalid region: {region}. Available regions are: {', '.join(region_codes.keys())}"
        }
    
    subba_code = region_codes[region]
    
    # EIA API URL
    base_url = "https://api.eia.gov/v2/electricity/rto/region-sub-ba-data/data/"
    
    params = {
        # Datapoints to get
        'frequency': 'hourly',
        'data[0]': 'value',
        'facets[subba][]': subba_code,
        'start': '2024-02-17T00',
        'sort[0][column]': 'period',
        'sort[0][direction]': 'desc',
        'offset': 0,
        'length': 5000,
        'api_key': API_KEY
    }

    try:
        # Try to get data from API, error debugging in case of failure
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        formatted_data = {
            "status": "success",
            "region": region,
            "subba_code": subba_code,
            "data": data.get('response', {}).get('data', [])
        }
        
        return formatted_data

    except requests.exceptions.RequestException as e:
        return {
            "status": "error",
            "message": f"Failed to fetch data for {region}: {str(e)}"
        }
