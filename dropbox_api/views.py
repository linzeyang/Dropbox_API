# Create your views here.
from django.shortcuts import render

from dropbox.client import DropboxClient, DropboxOAuth2Flow, DropboxOAuth2FlowNoRedirect
from dropbox.rest import ErrorResponse, RESTSocketError
from dropbox.datastore import DatastoreError, DatastoreManager, Date, Bytes


def start(request):
    return render(request, 'dropbox_api/start.html')
	
def dropin_chooser(request):
	return render(request, 'dropbox_api/dropin-chooser.html')

def dropin_saver(request):
	return render(request, 'dropbox_api/dropin-saver.html')

def datastore_js(request):
	return render(request, 'dropbox_api/datastore-js.html')

def datastore_python(request):
    context = ds_py_client()
    return render(request, 'dropbox_api/datastore-python.html', context)

def ds_py_client():
    # APP_KEY = 'hun9jgu2dpb3374'
    # APP_SECRET = 'zw1ntdvbn8bd73d'

    # redirect_uri = '/datastore-python/'

    # DropboxOAuth2Flow(APP_KEY, APP_SECRET, )

    return {'status': 'to be completed'}
