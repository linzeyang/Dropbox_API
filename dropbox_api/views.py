# Create your views here.
from django.shortcuts import render

def start(request):
    return render(request, 'dropbox_api/start.html')
	
def dropin_chooser(request):
	return render(request, 'dropbox_api/dropin-chooser.html')

def dropin_saver(request):
	return render(request, 'dropbox_api/dropin-saver.html')

def datastore_js(request):
	return render(request, 'dropbox_api/datastore-js.html')