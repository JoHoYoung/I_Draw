from django.contrib import admin
from django.urls import path

from apps.predict.views import *

urlpatterns = [
    path('predict', PredictAPIView.as_view()),
]
