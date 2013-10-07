# Create your views here.
from django.shortcuts import render_to_response

def start(request):
    return render_to_response('start.html')
	
def dropbox_dropin_chooser(request):
	return render_to_response('dropbox-dropin-chooser.html')

def dropbox_dropin_saver(request):
	return render_to_response('dropbox-dropin-saver.html')

def dropbox_datastore(request):
	return render_to_response('dropbox-datastore.html')