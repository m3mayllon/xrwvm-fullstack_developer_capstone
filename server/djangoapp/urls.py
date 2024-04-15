from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'djangoapp'
urlpatterns = [

    # authentication
    path(route='register', view=views.user_registration, name='register'),
    path(route='login', view=views.user_login, name='login'),
    path(route='logout', view=views.user_logout, name='logout'),

    # cars
    path(route='get_cars', view=views.get_cars, name='getcars'),

    # dealers
    path(route='get_dealers', view=views.get_dealerships, name='get_dealers'),
    path(
        route='get_dealers/<str:state>',
        view=views.get_dealerships,
        name='get_dealers_by_state'
    ),
    path(
        route='dealer/<int:dealer_id>',
        view=views.get_dealer_details,
        name='dealer_details'
    ),

    # reviews
    path(route='add_review', view=views.add_review, name='add_review'),
    path(
        route='reviews/dealer/<int:dealer_id>',
        view=views.get_dealer_reviews,
        name='dealer_details'
    ),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
