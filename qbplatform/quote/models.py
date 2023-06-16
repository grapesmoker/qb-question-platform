from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.


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
        ]
    )

    packet = models.ForeignKey(Packet, on_delete=models.CASCADE)


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
