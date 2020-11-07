from django.shortcuts import render
from django.http import HttpResponse

from .models import Greeting

import os
import requests

APIKEY = '172edrW4KxLIfk1SMsvLLLzdx6ugmT8anucDNe1QkkRUh7p3hcUQRzA6EcQmaqPuCA5y22mExEPVTmVWpt9NDgysDBlBWXv3PopI79A6DgS8QXBUgEcyaDhdKXlry6b5'
# Create your views here.
#def index(request):
#    # return HttpResponse('Hello from Python!')
#    return render(request, "index.html")

#def index(request):
#    r = requests.get('http://httpbin.org/status/418')
#    print(r.text)
#    return HttpResponse('<pre>' + r.text + '</pre>')
def index(request):
    times = int(os.environ.get('TIMES',3))
    return HttpResponse('Hello! ' * times)

def db(request):

    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, "db.html", {"greetings": greetings})

def end(request):
    base_url = 'https://api.liquipedia.net/api/v1/match'
    params = {
        'wiki': "valorant",
        "apikey": APIKEY,
        "Content-Type" : "application/x-www-form-urlencoded"
    }
    response = requests.get(base_url, headers=params)
    print("%s" % response.text)
    return r
