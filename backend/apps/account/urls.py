from django.urls import path
from .api.viewset import AccountViewSet

urlpatterns = [
    path('all/', AccountViewSet.as_view({'get': 'list'})),
    path('create/', AccountViewSet.as_view({'post': 'create'})),
    path('detail/<int:pk>/', AccountViewSet.as_view({'get': 'retrieve'})),
    path('update/<int:pk>/', AccountViewSet.as_view({'put': 'update'})),
    path('delete/<int:pk>/', AccountViewSet.as_view({'delete': 'delete'})),
]
