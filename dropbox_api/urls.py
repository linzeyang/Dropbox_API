from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('dropbox_api.views',
    # Examples:
    # url(r'^$', 'dropbox_api.views.home', name='home'),
    # url(r'^dropbox_api/', include('dropbox_api.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    url(r'^$', 'start', name="start"),
    url(r'^dropin-chooser/$', 'dropin_chooser', name="dropin_chooser"),
    url(r'^dropin-saver/$', 'dropin_saver', name="dropin_saver"),
    url(r'^datastore-js/$', 'datastore_js', name="datastore_js"),
    
    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
