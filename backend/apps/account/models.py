from django.db import models
from django.utils import timezone


class Advantage(models.Model):
    transport = models.BooleanField(default=False, verbose_name='transport')
    cnaps = models.BooleanField(default=False, verbose_name='cnaps')
    ostie = models.BooleanField(default=False, verbose_name='ostie')
    cantine = models.BooleanField(default=False, verbose_name='cantine')

    class Meta:
        verbose_name = 'Advantage'
        verbose_name_plural = 'Advantages'

    def __str__(self) -> str:
        return f"{self.transport}"

class Employe(models.Model):
    firstname = models.CharField(max_length=50, verbose_name='firstname')
    lastname = models.CharField(max_length=50, verbose_name='lastname')
    email = models.EmailField(unique=True, verbose_name='email')
    post = models.CharField(max_length=50, verbose_name='post')
    salary = models.BigIntegerField(verbose_name='salary')
    datejoin = models.DateField(verbose_name='date_join')
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=timezone.now())
    advantages = models.OneToOneField(Advantage, on_delete=models.CASCADE, null=False, related_name='advantages')

    class Meta:
        verbose_name = 'Employe'
        verbose_name_plural = 'Employes'

    def __str__(self) -> str:
        return f"{self.firstname}"
    
    
