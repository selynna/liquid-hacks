from django.shortcuts import render
from django.http import HttpResponse

from .models import Greeting

import os
import requests

# Create your views here.
#def index(request):
#    # return HttpResponse('Hello from Python!')
#    return render(request, "index.html")
def index(request):
    print("INDEX")
    r = requests.get('http://httpbin.org/status/418')
    print(r.text)
    return HttpResponse('<pre>' + r.text + '</pre>')

def db(request):

    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, "db.html", {"greetings": greetings})

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