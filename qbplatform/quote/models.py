from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User

from tree_queries.models import TreeNode
# Create your models here.


class QuoteUser(models.Model):
    # extend the user model. we'll want to add things to this later
    user = models.OneToOneField(User, on_delete=models.CASCADE)

#   Model of a per-packet distribution
#       has a one-to-many relationship with DistributionCategory
class Distribution(models.Model):

    name = models.CharField(max_length=500)
    num_tossups = models.PositiveSmallIntegerField(null=True, default=20)
    num_bonuses = models.PositiveSmallIntegerField(null=True, default=20)

    def __str__(self):
        return str(self.name)

class Tournament(models.Model):

    name = models.CharField(max_length=500)
    distribution = models.ForeignKey(Distribution, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class TournamentLocation(models.Model):

    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    date = models.DateField()
    location = models.CharField(max_length=500, null=True)

    def __str__(self):
        return self.location + " site of tournament: " + str(self.tournament)


class Packet(models.Model):

    name = models.CharField(max_length=500)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)

    def __str__(self):
        return "Packet " + self.name + " in tournament: " + str(self.tournament)

#   Category model is a hierarchy from top level category (e.g. Literature) to subcategory (e.g. American Literature) 
class Category(TreeNode):

    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

#   Model of a category within a distribution
#       distinct from Category model so that there exists a notion of a category outside of the confines of a distribution
#       each (sub)category is allowed a specified range of tossups/bonuses per packet
#           for example, an editor could specify 1/1 Other Arts but 0-1/0-1 Architecture
class DistributionCategory(models.Model):

    name = models.CharField(max_length=100)

    min_tossups = models.PositiveSmallIntegerField(null=True)
    max_tossups = models.PositiveSmallIntegerField(null=True)
    min_bonuses = models.PositiveSmallIntegerField(null=True)
    max_bonuses = models.PositiveSmallIntegerField(null=True)

    distribution = models.ForeignKey(Distribution, on_delete=models.CASCADE)
    categories = models.ManyToManyField(Category)

    def __str__(self):
        return self.name + " within " + self.distribution.name

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

    #TU difficulty rating
    difficulty = models.PositiveSmallIntegerField(null=True)

    #Don't want to cascade delete because distribution might be adjusted after questions are written?
    #We could lock distribution on tournament creation, but that seems too restrictive
    category = models.ForeignKey(DistributionCategory, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return "Tossup " + str(self.number) + " of packet: " + str(self.packet)


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

    #Don't want to cascade delete because distribution might be adjusted after questions are written?
    #We could lock distribution on tournament creation, but that seems too restrictive
    category = models.ForeignKey(DistributionCategory, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return "Bonus " + str(self.number) + " of packet: " + str(self.packet)


class BonusPart(models.Model):
    class BonusPartDifficulty(models.TextChoices):
        EASY = "E"
        MEDIUM = "M"
        HARD = "H"

    bonus = models.ForeignKey(Bonus, on_delete=models.CASCADE)

    part_number = models.IntegerField()
    difficulty = models.CharField(max_length=1, choices=BonusPartDifficulty.choices, null=True)

    def __str__(self):
        return "Bonus Part " + str(self.part_number) + " of bonus: " + str(self.bonus)
