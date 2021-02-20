from django.urls import reverse_lazy
from django.views.generic import TemplateView


# Create your views here.

class Events(TemplateView):
    template_name = 'events/events.html'
