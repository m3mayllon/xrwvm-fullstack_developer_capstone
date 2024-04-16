import re
import random
from string import punctuation
from nltk import NaiveBayesClassifier
from nltk.tag import pos_tag
from nltk.tokenize import word_tokenize
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import stopwords, twitter_samples


def remove_noise(tweet_tokens):
    stop_words = stopwords.words('english')

    cleaned_tokens = []

    for token, tag in pos_tag(tweet_tokens):
        token = re.sub(
            'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', token)
        token = re.sub('(@[A-Za-z0-9_]+)', '', token)

        if tag.startswith('NN'):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'

        lemmatizer = WordNetLemmatizer()
        token = lemmatizer.lemmatize(token, pos)

        if len(token) > 0 and token not in punctuation and token.lower() not in stop_words:
            cleaned_tokens.append(token.lower())

    return cleaned_tokens


def format_tokens_for_model(lst):
    for tokens in lst:
        yield dict([tk, True] for tk in tokens)


def sentiment_classifier_model():
    '''Learn more at https://realpython.com/python-nltk-sentiment-analysis/'''
    # train models
    positive_tokens = twitter_samples.tokenized('positive_tweets.json')
    positive_tokens = [remove_noise(tk) for tk in positive_tokens]
    positive_tokens = format_tokens_for_model(positive_tokens)

    negative_tokens = twitter_samples.tokenized('negative_tweets.json')
    negative_tokens = [remove_noise(tk) for tk in negative_tokens]
    negative_tokens = format_tokens_for_model(negative_tokens)

    # train dataset
    positive_dataset = [(d, 'Positive') for d in positive_tokens]
    negative_dataset = [(d, 'Negative') for d in negative_tokens]
    dataset = positive_dataset + negative_dataset
    random.shuffle(dataset)
    sample_size = int(len(dataset) * 0.8)
    train_data = dataset[:sample_size]

    # classifier model
    classifier = NaiveBayesClassifier.train(train_data)
    return classifier


def text_sentiment(classifier, text):
    text_tokens = remove_noise(word_tokenize(text))
    text_sentiment = classifier.classify(
        dict([tk, True] for tk in text_tokens))
    return text_sentiment
