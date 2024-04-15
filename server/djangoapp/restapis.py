import os
import requests
from concurrent.futures import ThreadPoolExecutor
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


def analyze_review_sentiments(text):

    if not text:
        print('Error: Input text is empty.')
        return None

    try:
        # call GET requests with URL and parameters
        request_url = sentiment_analyzer_url + '/analyze/' + quote_plus(text)
        response = requests.get(request_url)

        # raise HTTPError for bad responses
        response.raise_for_status()

        return response.json()

    except RequestException as exc:
        print('Network exception occurred:', exc)
        return None


def analyze_reviews_sentiments(review_texts):

    sentiment_responses = []

    # perform sentiment analysis in batches
    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(analyze_review_sentiments, text)
                   for text in review_texts]
        for future in futures:
            sentiment_responses.append(future.result())

    return sentiment_responses

# def post_review(data_dict):
# Add code for posting review
