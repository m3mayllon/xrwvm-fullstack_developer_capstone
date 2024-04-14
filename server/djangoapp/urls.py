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

    # reviews

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
