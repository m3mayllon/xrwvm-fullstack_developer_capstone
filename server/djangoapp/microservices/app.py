import json
from flask import Flask
from sentiment.scm import sentiment_classifier_model, text_sentiment


SCM = None


def create_app():

    global SCM
    app = Flask('Sentiment Analyzer')

    # initialize the sentiment classifier model
    SCM = sentiment_classifier_model()

    @app.route('/')
    def home():
        return 'Welcome to the Sentiment Analyzer. Use /analyze/text to get the sentiment'

    @app.route('/analyze/<input_txt>')
    def analyze_sentiment(input_txt):
        sentiment = text_sentiment(SCM, input_txt)
        return json.dumps({'sentiment': sentiment})

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(port=5050, debug=True)
