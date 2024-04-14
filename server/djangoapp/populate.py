from django.db import transaction
from .models import CarMake, CarModel


def initiate_cars():

    car_make_data = [
        {
            'name': 'Nissan',
            'description': 'Great cars. Japanese technology',
            'founded': 1933,
            'founder': 'Masujiro Hashimoto',
            'location': 'Yokohama, Japan',
            'employees': 131461,

        },
        {
            'name': 'Mercedes-Benz',
            'description': 'Great cars. German technology',
            'founded': 1926,
            'founder': 'Carl Benz',
            'location': 'Stuttgart, Germany',
            'employees': 172425,

        },
        {
            'name': 'Audi',
            'description': 'Great cars. German technology',
            'founded': 1909,
            'founder': 'August Horch',
            'location': 'Ingolstadt, Germany',
            'employees': 90783,

        },
        {
            'name': 'Kia',
            'description': 'Great cars. Korean technology',
            'founded': 1944,
            'founder': '',
            'location': 'Seoul, South Korea',
            'employees': 51975,

        },
        {
            'name': 'Toyota',
            'description': 'Great cars. Japanese technology',
            'founded': 1937,
            'founder': 'Kiichiro Toyoda',
            'location': 'Koromo, Japan',
            'employees': 375235,

        },
    ]

    car_model_data = [
        {
            'car_make': 'Nissan',
            'name': 'Pathfinder',
            'body_style': 'SUV / Crossover',
            'year': 2023,
            'milage': 4000,
            'transmission': 'Auto',
            'drivetrain': 'Four-Wheel Drive',
            'exterior_colour': 'White',
        },
        {
            'car_make': 'Nissan',
            'name': 'Qashqai',
            'body_style': 'SUV / Crossover',
            'year': 2023,
            'milage': 21000,
            'transmission': 'Auto',
            'drivetrain': 'All-Wheel Drive',
            'exterior_colour': 'Black',
        },
        {
            'car_make': 'Nissan',
            'name': 'XTRAIL',
            'body_style': 'SUV / Crossover',
            'year': 2023,
            'milage': 9000,
            'transmission': 'Auto',
            'drivetrain': 'Front-Wheel Drive',
            'exterior_colour': 'Blue',
        },
        {
            'car_make': 'Mercedes-Benz',
            'name': 'A-Class',
            'body_style': 'SUV / Crossover',
            'year': 2023,
            'milage': 11000,
            'transmission': 'Auto',
            'drivetrain': 'All-Wheel Drive',
            'exterior_colour': 'Gray',
        },
        {
            'car_make': 'Mercedes-Benz',
            'name': 'C-Class',
            'body_style': 'SUV / Crossover',
            'year': 2023,
            'milage': 11000,
            'transmission': 'Auto',
            'drivetrain': 'All-Wheel Drive',
            'exterior_colour': 'White',
        },
        {
            'car_make': 'Mercedes-Benz',
            'name': 'E-Class',
            'body_style': 'SUV / Crossover',
            'year': 2023,
            'milage': 10000,
            'transmission': 'Auto',
            'drivetrain': 'All-Wheel Drive',
            'exterior_colour': 'White',
        },
        {
            'car_make': 'Audi',
            'name': 'A4',
            'body_style': 'SUV / Crossover',
            'year': 2023,
            'milage': 12000,
            'transmission': 'Auto',
            'drivetrain': 'All-Wheel Drive',
            'exterior_colour': 'Black',
        },
        {
            'car_make': 'Audi',
            'name': 'A5',
            'body_style': 'SUV / Crossover',
            'year': 2023,
            'milage': 13000,
            'transmission': 'Auto',
            'drivetrain': 'All-Wheel Drive',
            'exterior_colour': 'Gray',
        },
        {
            'car_make': 'Audi',
            'name': 'A6',
            'body_style': 'SUV / Crossover',
            'year': 2023,
            'milage': 16000,
            'transmission': 'Auto',
            'drivetrain': 'All-Wheel Drive',
            'exterior_colour': 'Green',
        },
        {
            'car_make': 'Kia',
            'name': 'Sorrento',
            'body_style': 'SUV / Crossover',
            'year': 2023,
            'milage': 17000,
            'transmission': 'Auto',
            'drivetrain': 'Front-Wheel Drive',
            'exterior_colour': 'Red',
        },
        {
            'car_make': 'Kia',
            'name': 'Carnival',
            'body_style': 'SUV / Crossover',
            'year': 2023,
            'milage': 7000,
            'transmission': 'Auto',
            'drivetrain': 'Front-Wheel Drive',
            'exterior_colour': 'Black',
        },
        {
            'car_make': 'Kia',
            'name': 'Cerato',
            'body_style': 'Sedan',
            'year': 2023,
            'milage': 9000,
            'transmission': 'Auto',
            'drivetrain': 'Front-Wheel Drive',
            'exterior_colour': 'Red',
        },
        {
            'car_make': 'Toyota',
            'name': 'Corolla',
            'body_style': 'Sedan',
            'year': 2023,
            'milage': 8000,
            'transmission': 'Auto',
            'drivetrain': 'Front-Wheel Drive',
            'exterior_colour': 'White',
        },
        {
            'car_make': 'Toyota',
            'name': 'Camry',
            'body_style': 'Sedan',
            'year': 2023,
            'milage': 20000,
            'transmission': 'Auto',
            'drivetrain': 'Front-Wheel Drive',
            'exterior_colour': 'Black',
        },
        {
            'car_make': 'Toyota',
            'name': 'Kluger',
            'body_style': 'SUV / Crossover',
            'year': 2023,
            'milage': 12000,
            'transmission': 'Manual',
            'drivetrain': 'Front-Wheel Drive',
            'exterior_colour': 'Silver',
        },
    ]

    # create CarMake instances in a single batch
    car_make_instances = [
        CarMake(
            name=data['name'],
            description=data['description'],
            founded=data['founded'],
            founder=data['founder'],
            location=data['location'],
            employees=data['employees']
        )
        for data in car_make_data
    ]

    CarMake.objects.bulk_create(car_make_instances)

    # retrieve CarMake instances from database
    car_make_mapping = {
        car_make.name: car_make for car_make in CarMake.objects.all()}

    # create CarModel instances in a single batch
    car_model_instances = [
        CarModel(
            car_make=car_make_mapping[data['car_make']],
            name=data['name'],
            body_style=data['body_style'],
            year=data['year'],
            milage=data['milage'],
            transmission=data['transmission'],
            drivetrain=data['drivetrain'],
            exterior_colour=data['exterior_colour']
        )
        for data in car_model_data
    ]

    with transaction.atomic():
        CarModel.objects.bulk_create(car_model_instances)
