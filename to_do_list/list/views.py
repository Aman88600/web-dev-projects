from django.shortcuts import render
# from django.http import HttpResponse
# Create your views here.

# tasks
tasks = ["Complete assignment", "code new app", "read a book"]
def index(request):
    return render(request, "list/index.html", {"tasks" : tasks})
