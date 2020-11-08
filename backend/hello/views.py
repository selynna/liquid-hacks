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
        return HttpResponse(str(json_data))

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


