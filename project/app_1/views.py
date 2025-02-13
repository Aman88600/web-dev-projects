from django.shortcuts import render

# Create your views here.
def index(request):
    print('works')
    return render(request, 'app_1/index.html')
