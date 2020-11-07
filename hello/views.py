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