from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime

from .models import Greeting, User
from datetime import datetime
from pytz import timezone
import pytz

import os
import requests
import json

# Create your views here.
#def index(request):
#    # return HttpResponse('Hello from Python!')
#    return render(request, "index.html")

def index(request):
   r = requests.get('http://httpbin.org/status/418')
   print(r.text)
   return HttpResponse('<pre>' + r.text + '</pre>')
# def index(request):
#     times = int(os.environ.get('TIMES',3))
#     return HttpResponse('Hello! ' * times)

def db(request):

    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, "db.html", {"greetings": greetings})

# format: yyyy-mm-dd
def current_date():
    date = datetime.now(tz=pytz.utc)
    date = date.astimezone(timezone('US/Pacific'))
    return date.strftime('%Y-%m-%d')

def getTournaments(request):
    if request.method == 'GET':
        base_url = 'https://api.liquipedia.net/api/v1/tournament'
        date = current_date()
        post_body = {
            'wiki': "valorant",
            "apikey": os.environ.get('LIQUID_API_KEY'),
            "conditions": "([[enddate::>%s]] OR [[enddate::%s]]) AND ([[startdate::<%s]] OR [[startdate::%s]])" % (date, date, date, date)
        }
        response = requests.post(base_url, data=post_body)
        json_data = json.loads(response.text)
        tournament_names = {'results': []}
        for tourn in json_data['result']:
            tournament_names['results'].append(tourn['name'])
        return HttpResponse(str(tournament_names))

def getMatches(request):
    if request.method == 'GET':
        base_url = 'https://api.liquipedia.net/api/v1/match'
        params = request.GET.dict()
        tournament = params["tournament"].strip("")
        post_body = {
            'wiki': "valorant",
            "apikey": os.environ.get('LIQUID_API_KEY'),
            "conditions": "[[tournament::%s]]" % (tournament)
        }
        r = requests.post(base_url, post_body)
        print("response: %s", r.text)
        return HttpResponse(r.text)

def getPlayersFromTeam(request):
    if request.method == 'GET':
        print("Get players from team")
        params = request.GET.dict()
        team = params["team"].strip('"')
        print("  Extracted team id: ", team)
        url = "https://api.liquipedia.net/api/v1/player"
        data = {'apikey':os.environ.get('LIQUID_API_KEY'),
                'wiki':'valorant',
                'conditions':"[[team::"+team+"]]"
                }
        print("Sending request POST\n  URL: ",url,"\n  Params:",data)
        r = requests.post(url, data)
        print("  Response: ", r.text)
        return HttpResponse(r.text)
    else:
        print("getPlayersFromTeam invalid method, POST only")
        return HttpResponse("Invalid")

def getPlayer(request):
    if request.method == 'GET':
        print("Get player")
        params = request.GET.dict()
        print(params)
        playerid = params["player"].strip('"')
        print("Extracted player id: ",id)
        # Form Liquipedia API POST request
        url = "https://api.liquipedia.net/api/v1/player"
        data = {'apikey':os.environ.get('LIQUID_API_KEY'),
                'wiki':'valorant',
                'conditions':"[[id::"+playerid+"]]"
                }
        print("Sending request POST\n  URL: ",url,"\n  Params:",data)
        r = requests.post(url, data)
        print("  Response: ",r.text)
        return HttpResponse(r.text)
    else:
        print("getPlayer invalid method, POST only")
        return HttpResponse("Invalid")

def updateUser(request):
    if request.method == "GET":
        u = User(userId="endpoint", picks=["there", "are", "poggers"])
        u.save()
        return HttpResponse("i added a thingy")

def createUser(userId: str, picks: list):
    if User.objects.filter(userId=userId).exists():
        print("{} already exists in database", userId)
    else:
        u = User(userId=userId, picks=picks)
        u.save()
        print("{} was added to the database".format(u.__str__()))

def userResponse(userId: str):
    return {
        "user" : userId,
        "picks" : User.objects.get(userId=userId).picks
    }

def getUserPicks(request):
    # given userid -> check existence -> return json array
    if request.method == "GET":
        params = request.GET.dict()
        userId = params["uid"].strip('"')
        if not User.objects.filter(userId=userId).exists():
            createUser(userId, [])
        return HttpResponse(str(userResponse(userId)))

def setUserPicks(request):
    if request.method == "GET":
        params = request.GET.dict()
        userId = params["uid"].strip('"')
        players = params["players"].strip('"')
        players = players.split(",")[:5] # max 5 players for picks
        if not User.objects.filter(userId=userId).exists():
            createUser(userId, players)
        else:
            u = User.objects.get(userId=userId)
            u.picks = players
            u.save()
        return HttpResponse(str(userResponse(userId)))

def addUserPick(request):
    #given userid + playerid -> add to db -> return new picks array
    if request.method == "GET":
        params = request.GET.dict()
        userId = params["uid"].strip('"')
        playerId = params["player"].strip('"')
        if not User.objects.filter(userId=userId).exists():
            createUser(userId, [playerId])
        else:
            u = User.objects.get(userId=userId)
            if playerId not in u.picks:
                u.picks.append(playerId)
                u.save()
        return HttpResponse(str(userResponse(userId)))

def deleteUserPick(request):
    #given userid + playerid -> remove pick from array -> return new picks array
    if request.method == "GET":
        params = request.GET.dict()
        userId = params["uid"].strip('"')
        playerId = params["player"].strip('"')
        if not User.objects.filter(userId=userId).exists():
            createUser(userId, [])
        else:
            u = User.objects.get(userId=userId)
            if playerId in u.picks:
                u.picks.remove(playerId)
                u.save()
        return HttpResponse(str(userResponse(userId)))

def getPlayerCombatScore(request):
    # given tournament name & player name -> return average combat score
    if request.method == "GET":
        params = request.GET.dict()
        tournament_name = params["tournament"].strip('"')
        player_name = params["player"].strip('"')
        match_ids = get_match_ids(tournament_name, player_name)
        # for every match use game API to get KDA
        kda = getKda(player_name, match_ids)
        score = combat_calculation(kda)
        ret_json = {
            "player" : player_name,
            "score" : score
        }
        return HttpResponse(str(ret_json))
    
def combat_calculation(kda: list):
    # [kills, deaths, assists]
    score = 0
    for i in range(3):
        if i == 0:
            score += 30*kda[i]
        elif i == 1:
            score += -5*kda[i]
        elif i == 2:
            score += 10*kda[i]
    return score

def getKda(player: str, matchids: list):
    # Kills / Deaths / Assists
    kda = [0, 0, 0]
    if len(matchids) == 0:
        return kda
    url = "https://api.liquipedia.net/api/v1/game"
    post_body = {
        'wiki': "valorant",
        "apikey": os.environ.get('LIQUID_API_KEY'),
        "conditions": match_cond(matchids)
    }
    response = requests.post(url, data=post_body)
    json_data = json.loads(response.text)
    for match in json_data['result']:
        the_key = "t%skda%s"
        for k, v in match['extradata'].items():
            if v == player:
                the_key = the_key % (k[1], k[-1])
                kda_str = match['extradata'][the_key]
                kda_str = kda_str.split('/')
                for i in range(3):
                    kda[i] += int(kda_str[i])
                break
    return kda

def match_cond(matchids: list):
    ret_val = ""
    for i in range(len(matchids)):
        ret_val += "[[matchid::%s]] " % (matchids[i])
        if i != len(matchids) - 1:
            ret_val += "OR "
    return ret_val

def get_match_ids(tournament_name: str, player_name: str):
    match_id = []
    url = 'https://api.liquipedia.net/api/v1/match'
    post_body = {
        'wiki': "valorant",
        "apikey": os.environ.get('LIQUID_API_KEY'),
        "conditions": "[[tournament::%s]]" % (tournament_name)
    }
    response = requests.post(url, data=post_body)
    json_data = json.loads(response.text)
    for match in json_data["result"]:
        if player_name in match["opponent1players"].values():
            match_id.append(match['matchid'])
            continue
        elif player_name in match["opponent2players"].values():
            match_id.append(match['matchid'])
    return match_id
