import os
import requests
from requests.exceptions import RequestException
from urllib.parse import urlencode, quote_plus
from dotenv import load_dotenv


load_dotenv()

backend_url = os.getenv(
    'backend_url', default='http://localhost:3030')
sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url', default='http://localhost:5050')


def get_request(endpoint, **kwargs):

    try:
        # call GET requests with URL and parameters
        request_url = backend_url + endpoint + '?' + urlencode(kwargs)
        response = requests.get(request_url)

        # raise HTTPError for bad responses
        response.raise_for_status()

        return response.json()

    except RequestException as exc:
        print('Network exception occurred:', exc)
        return None

# def analyze_review_sentiments(text):
# request_url = sentiment_analyzer_url+"analyze/"+text
# Add code for retrieving sentiments

# def post_review(data_dict):
# Add code for posting review
