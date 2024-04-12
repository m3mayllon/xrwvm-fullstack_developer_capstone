# Uncomment the required imports before adding the code

# from django.shortcuts import render
# from django.http import HttpResponseRedirect, HttpResponse
# from django.contrib.auth.models import User
# from django.shortcuts import get_object_or_404, render, redirect
# from django.contrib.auth import logout
# from django.contrib import messages
# from datetime import datetime

from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
import logging
import json
from django.views.decorators.csrf import csrf_exempt
# from .populate import initiate


# Get an instance of a logger
logger = logging.getLogger(__name__)


@csrf_exempt
def login_user(request):

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


def logout_user(request):

    # logout the user
    logout(request)
    data = {'username': ''}

    return JsonResponse(data)


# Create a `registration` view to handle sign up request
# @csrf_exempt
# def registration(request):
# ...

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
