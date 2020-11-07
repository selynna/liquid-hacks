from django.shortcuts import render
from django.http import HttpResponse

from .models import Greeting
from datetime import datetime
import os
import requests
import json

API_KEY = os.environ.get("LIQUID_API_KEY", "put an api key in the environment")

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

def get_tournament(request):
    if request.method == 'GET':
        base_url = 'https://api.liquipedia.net/api/v1/tournament'
        post_body = {
            'wiki': "valorant",
            "apikey": API_KEY,
            "conditions": "[[enddate::>%s]] AND [[startdate::<%s]]" % (current_date(), current_date())
        }
        response = requests.post(base_url, data=post_body)
        json_data = json.loads(response.text)
        print(json_data.keys())
        tournament_names = {'results': []}
        for tourn in json_data['result']:
            tournament_names['results'].append(tourn['name'])
        return HttpResponse(str(tournament_names))

# def get_matches(request):
#     if request.method == "GET":
#         base_url = "https://api.liquipedia.net/api/v1/match"
#         post_body = {
#             'wiki': "valorant",
#             "apikey": API_KEY,
#             "conditions": "[[tournament::%s]]" % ()
#         }

# format: yyyy-mm-dd
def current_date():
    return datetime.today().strftime('%Y-%m-%d')

def getplayer(request):
    if request.method == 'GET':
        print("Get player")
        params = request.GET.dict()
        print(params)
        playerid = params["player"]
        print("Extracted player id: ",id)
        # Form Liquipedia API POST request
        url = "https://api.liquipedia.net/api/v1/player"
        data = {'apikey':os.environ.get('LIQUID_API_KEY'),
                'wiki':'valorant',
                'conditions':"[[id::"+playerid+"]]"
                }
        print("Sending request POST")
        print("  URL: ",url)
        print("  Params: ",data)
        r = requests.post(url, data)
        print("  Response: ",r.text)
        return HttpResponse(r.text)
    else:
        print("Get player invalid method")
        return HttpResponse("Invalid")
