from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
# Create your models here.


class QuoteUser(models.Model):
    # extend the user model. we'll want to add things to this later
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Tournament(models.Model):

    name = models.CharField(max_length=500)


class TournamentLocation(models.Model):

    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    date = models.DateField()
    location = models.CharField(max_length=500, null=True)


class Packet(models.Model):

    name = models.CharField(max_length=500)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)


class Tossup(models.Model):

    number = models.IntegerField(null=True, unique=True)
    tossup_text = models.TextField(null=True)
    tossup_answer = models.TextField(null=True)
    difficulty = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5),
        ],
        null=True,
        blank=True
    )
    power_position = models.IntegerField(null=True, blank=True)
    representation = models.JSONField(null=True, blank=True)

    packet = models.ForeignKey(Packet, on_delete=models.CASCADE, null=True)

    def __repr__(self):
        return self.tossup_text[0:40]

    def __str__(self):
        return self.tossup_text[0:40]


class Bonus(models.Model):

    number = models.IntegerField(null=True, unique=True)
    leadin = models.TextField(null=True)

    packet = models.ForeignKey(Packet, on_delete=models.CASCADE)

    # overall difficulty of the bonus, as distinguished from the specific difficulty of the constituent parts
    difficulty = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5),
        ]
    )


class BonusPart(models.Model):
    class BonusPartDifficulty(models.TextChoices):
        EASY = "E"
        MEDIUM = "M"
        HARD = "H"

    bonus = models.ForeignKey(Bonus, on_delete=models.CASCADE)

    part_number = models.IntegerField()
    difficulty = models.CharField(max_length=1, choices=BonusPartDifficulty.choices, null=True)
