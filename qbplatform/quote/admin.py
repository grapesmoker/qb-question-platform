from django.contrib import admin

# Register your models here.
from .models import Tournament, TournamentLocation, Packet, Tossup, Bonus, BonusPart

admin.site.register(Tournament)
admin.site.register(TournamentLocation)
admin.site.register(Packet)
admin.site.register(Tossup)
admin.site.register(Bonus)
admin.site.register(BonusPart)
