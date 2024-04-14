from django.db import models
from django.utils.timezone import now
from django.core.validators import MaxValueValidator, MinValueValidator


class CarMake(models.Model):

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    founded = models.IntegerField()
    founder = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    employees = models.IntegerField()

    def __str__(self):
        return self.name


class CarModel(models.Model):

    BODY_STYLE = [
        ('CONVERTIBLE', 'Convertible'),
        ('COUPE', 'Coupe'),
        ('HATCHBACK', 'Hatchback'),
        ('MINIVAN', 'Minivan'),
        ('PICKUP_TRUCK', 'Pickup Truck'),
        ('SEDAN', 'Sedan'),
        ('SUV_CROSSOVER', 'SUV / Crossover'),
        ('VAN', 'Van'),
        ('WAGON', 'Wagon'),
    ]

    TRANSMISSION = [
        ('AUTO', 'Auto'),
        ('MANUAL', 'Manual'),

    ]

    DRIVETRAIN = [
        ('AWD', 'All-Wheel Drive'),
        ('4WD', 'Four-Wheel Drive'),
        ('FWD', 'Front-Wheel Drive'),
        ('RWD', 'Rear-Wheel Drive'),
    ]

    COLOUR = [
        ('BLACK', 'Black'),
        ('BLUE', 'Blue'),
        ('BROWN', 'Brown'),
        ('GOLD', 'Gold'),
        ('GRAY', 'Gray'),
        ('GREEN', 'Green'),
        ('ORANGE', 'Orange'),
        ('PINK', 'Pink'),
        ('PURPLE', 'Purple'),
        ('RED', 'Red'),
        ('SILVER', 'Silver'),
        ('TEAL', 'Teal'),
        ('WHITE', 'White'),
        ('YELLOW', 'Yellow'),
        ('UNKNOWN', 'Unknown'),
    ]

    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    body_style = models.CharField(
        max_length=20,
        choices=BODY_STYLE,
        default='SUV_CROSSOVER'
    )
    year = models.IntegerField(
        default=2023,
        validators=[MinValueValidator(2015), MaxValueValidator(2023)]
    )
    milage = models.IntegerField()
    transmission = models.CharField(
        max_length=10,
        choices=TRANSMISSION,
        default='AUTO'
    )
    drivetrain = models.CharField(
        max_length=20,
        choices=DRIVETRAIN,
        default='FWD'
    )
    exterior_colour = models.CharField(
        max_length=10,
        choices=COLOUR,
        default='BLACK'
    )

    def __str__(self):
        return self.name
