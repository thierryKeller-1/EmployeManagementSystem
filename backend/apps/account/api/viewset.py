from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from apps.account.models import Employe
from django.shortcuts import get_object_or_404
from .serializer import EmployeListSerializer, EmployeSerializer, EmployeDetailSerializer
from rest_framework.response import Response
from rest_framework import status

class AccountViewSet(ViewSet):
    permission_classes = [AllowAny,]
    http_method_names = ['get','post','retrieve','put','patch', 'delete']

    def get_queryset(self):
        return Employe.objects.all()

    def get_object(self, pk):
        employe = get_object_or_404(self.get_queryset(), pk=pk)
        return employe

    def list(self, request, *args, **kwargs):
        serializer = EmployeListSerializer(self.get_queryset(), many=True)
        if serializer.data:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def create(self, request, *args, **kwargs):
        serializer = EmployeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None, *args, **kwargs):
        account = self.get_object(pk=pk)
        serializer = EmployeDetailSerializer(account, many=False)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None, *args, **kwargs):
        instance = self.get_object(pk=pk)
        serializer = EmployeSerializer(instance=instance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk=None, *args, **kwargs):
        employe = self.get_object(pk=pk)
        employe.delete()
        return Response(data={'message':'employe deleted'}, status=status.HTTP_200_OK)



