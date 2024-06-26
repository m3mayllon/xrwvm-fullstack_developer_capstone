# from django.shortcuts import render
# from django.http import HttpResponseRedirect, HttpResponse

# from django.shortcuts import get_object_or_404, render, redirect
# from django.contrib import messages
# from datetime import datetime

import logging
import json
from json import JSONDecodeError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .decorators import validate_dealer_id
from .models import CarModel
from .populate import initiate_cars
from .restapis import get_request, analyze_reviews_sentiments, post_review


logger = logging.getLogger(__name__)


@csrf_exempt
def user_registration(request):

    data = json.loads(request.body)
    username = data['username']
    email = data['email']
    password = data['password']
    first_name = data['firstName']
    last_name = data['lastName']

    # check if user/email already exists
    username_exist = User.objects.filter(username=username).exists()
    email_exist = User.objects.filter(email=email).exists()

    if not username_exist and not email_exist:
        # create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )

        # login user
        login(request, user)
        data = {'username': username, 'status': 'Authenticated'}
        return JsonResponse(data)

    else:
        data = {'username': username, 'error': 'Already registered'}
        return JsonResponse(data)


@csrf_exempt
def user_login(request):

    data = json.loads(request.body)
    username = data['username']
    password = data['password']

    # authenticate user
    user = authenticate(username=username, password=password)
    data = {'username': username}

    # check if user is valid, then login current user
    if user is not None:
        login(request, user)
        data = {'username': username, 'status': 'Authenticated'}

    return JsonResponse(data)


def user_logout(request):

    # logout the user
    logout(request)
    data = {'username': ''}

    return JsonResponse(data)


def get_cars(request):

    # check if data exists in CarModel
    if not CarModel.objects.exists():
        initiate_cars()

    # fetch CarModel objects
    car_models = CarModel.objects.select_related('car_make').values(
        'name', 'car_make__name', 'body_style', 'year', 'milage', 'transmission', 'drivetrain', 'exterior_colour')

    data = []
    for car in car_models:
        car_model = {
            'make': car['car_make__name'],
            'model': car['name'],
            'body': car['body_style'],
            'year': car['year'],
            'milage': car['milage'],
            'transmission': car['transmission'],
            'drivetrain': car['drivetrain'],
            'colour': car['exterior_colour']
        }
        data.append(car_model)

    return JsonResponse({'status': 200, 'carModels': data})


def get_dealerships(request, state='All'):

    # sanitize input state
    state = state if isinstance(state, str) else 'All'
    if state == 'All':
        endpoint = '/fetchDealers'
    else:
        endpoint = f'/fetchDealers/{state}'

    # retrieve dealerships data
    dealerships = get_request(endpoint)
    if not dealerships:
        return JsonResponse({'status': 500, 'message': 'Failed to retrieve dealerships data'})

    return JsonResponse({'status': 200, 'dealers': dealerships})


@validate_dealer_id
def get_dealer_details(request, dealer_id):

    # retrieve dealership data
    endpoint = f'/fetchDealer/{dealer_id}'
    dealership = get_request(endpoint)
    if not dealership:
        return JsonResponse({'status': 500, 'message': 'Failed to retrieve dealership data'})

    return JsonResponse({'status': 200, 'dealer': dealership})


@validate_dealer_id
def get_dealer_reviews(request, dealer_id):

    # retrieve dealer reviews data
    endpoint = f'/fetchReviews/dealer/{dealer_id}'
    reviews = get_request(endpoint)

    if not reviews:
        return JsonResponse({'status': 500, 'message': 'Failed to retrieve reviews data'})

    # perform sentiment analysis in batches
    review_texts = [r['review'] for r in reviews]
    sentiment_responses = analyze_reviews_sentiments(review_texts)

    # assign sentiments to reviews
    for review, sentiment in zip(reviews, sentiment_responses):
        review['sentiment'] = sentiment['sentiment']

    return JsonResponse({'status': 200, 'reviews': reviews})


def add_review(request):

    if not request.user.is_authenticated:
        return JsonResponse({'status': 401, 'message': 'Unauthorized'})

    try:
        data = json.loads(request.body)
        post_review(data)
        return JsonResponse({'status': 200})

    except JSONDecodeError:
        return JsonResponse({'status': 400, 'message': 'Invalid JSON data'})

    except Exception as exc:
        return JsonResponse({'status': 500, 'message': f'Error in posting review: {str(exc)}'})
