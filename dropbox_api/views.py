# Create your views here.
from django.shortcuts import render

def start(request):
    return render(request, 'start.html')
	
def dropbox_dropin_chooser(request):
	return render(request, 'dropbox-dropin-chooser.html')

def dropbox_dropin_saver(request):
	return render(request, 'dropbox-dropin-saver.html')

def dropbox_datastore(request):
	return render(request, 'dropbox-datastore.html')