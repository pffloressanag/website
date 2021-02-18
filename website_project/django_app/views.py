from django.http import HttpResponse, HttpRequest
from django.views.generic import TemplateView


class HomePage(TemplateView):
	template_name = 'index.html'
