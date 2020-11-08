from django.urls import path, include

from django.contrib import admin

admin.autodiscover()

import hello.views

# To add a new path, first import the app:
# import blog
#
# Then add the new path:
# path('blog/', blog.urls, name="blog")
#
# Learn more here: https://docs.djangoproject.com/en/2.1/topics/http/urls/

urlpatterns = [
    path("", hello.views.index, name="index"),
    path("db/", hello.views.db, name="db"),
    path("gettournaments/", hello.views.getTournaments, name="getTournaments"),
    path("admin/", admin.site.urls),
    path("getplayer/", hello.views.getPlayer, name="getPlayer"),
    path("getmatches/", hello.views.getMatches, name="getMatches"),
    path("getteamsfromtournament/", hello.views.getTeamsFromTournament, name="getTeamsFromTournament"),
    path("getplayersfromteam/", hello.views.getPlayersFromTeam, name="getPlayersFromTeam"),
    # path("updateUser/", hello.views.updateUser, name="updateUser"),
    path("getUserPicks/", hello.views.getUserPicks, name="getUserPicks"),
    path("addUserPick/", hello.views.addUserPick, name="addUserPick"),
    path("deleteUserPick/", hello.views.deleteUserPick, name="deleteUserPick"),
    path("setUserPicks/", hello.views.setUserPicks, name="setUserPicks"),
    path("getPlayerCombatScore/", hello.views.getPlayerCombatScore, name="getPlayerCombatScore"),
    path("getAllUsers/", hello.views.getAllUsers, name="getAllUsers"),
    path("getMatchesInTournament/", hello.views.getMatchesInTournament, name="getMatchesInTournament"),
]
