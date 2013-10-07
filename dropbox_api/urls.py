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

    url(r'^$', 'start'),
    url(r'^dropbox-dropin-chooser$', 'dropbox_dropin_chooser'),
    url(r'^dropbox-dropin-saver$', 'dropbox_dropin_saver'),
    url(r'^dropbox-datastore$', 'dropbox_datastore'),
    
    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
