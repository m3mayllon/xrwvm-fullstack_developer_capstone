# from django.shortcuts import render
# from django.http import HttpResponseRedirect, HttpResponse

# from django.shortcuts import get_object_or_404, render, redirect
# from django.contrib import messages
# from datetime import datetime

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import logging
import json

from .models import CarMake, CarModel
from .populate import initiate_cars


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


# # Update the `get_dealerships` view to render the index page with
# a list of dealerships
# def get_dealerships(request):
# ...

# Create a `get_dealer_reviews` view to render the reviews of a dealer
# def get_dealer_reviews(request,dealer_id):
# ...

# Create a `get_dealer_details` view to render the dealer details
# def get_dealer_details(request, dealer_id):
# ...

# Create a `add_review` view to submit a review
# def add_review(request):
# ...

def get_cars(request):

    # check if data exists in CarModel
    if not CarModel.objects.exists():
        initiate_cars()

    # fetch CarModel objects
    car_models = CarModel.objects.select_related('car_make').values(
        'name', 'car_make__name', 'body_style', 'year', 'milage', 'transmission', 'drivetrain', 'exterior_colour')

    data = {}
    for car in car_models:
        car_make = car['car_make__name']

        car_model = {
            'model': car['name'],
            'body': car['body_style'],
            'year': car['year'],
            'milage': car['milage'],
            'transmission': car['transmission'],
            'drivetrain': car['drivetrain'],
            'colour': car['exterior_colour']
        }

        if car_make in data:
            data[car_make].append(car_model)
        else:
            data[car_make] = [car_model]

    return JsonResponse({'make': data})
