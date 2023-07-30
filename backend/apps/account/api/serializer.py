from rest_framework.serializers import ModelSerializer, SerializerMethodField
from apps.account.models import Employe, Advantage

class EmployeListSerializer(ModelSerializer):

    class Meta:
        model = Employe
        fields = ['id','firstname', 'lastname', 'email', 'post', 'salary', 'datejoin']


class AdvantageSerializer(ModelSerializer):
    
    class Meta:
        model = Advantage
        exclude = ['id']

class EmployeDetailSerializer(ModelSerializer):
    advantages = SerializerMethodField() 

    class Meta:
        model = Employe
        fields = ['id', 'firstname', 'lastname', 'email', 'post', 'salary', 'datejoin', 'advantages']

    def get_advantages(self, obj):
        advantage = AdvantageSerializer(obj.advantages, many=False)
        return advantage.data

class EmployeSerializer(ModelSerializer):
    advantages = AdvantageSerializer() 
    
    class Meta:
        model = Employe
        fields = ['id', 'firstname', 'lastname', 'email', 'post', 'salary', 'datejoin', 'advantages']

    def create(self, validated_data):
        advantages = validated_data.pop('advantages')
        advantage = Advantage.objects.create(**advantages)
        employe = Employe.objects.create(advantages=advantage, **validated_data)
        return employe
    
    def update(self, instance, validated_data):
        advantages = validated_data.pop('advantages')

        instance.first_name = validated_data.get('firstname', instance.first_name)
        instance.last_name = validated_data.get('lastname', instance.last_name)
        if instance.email != validated_data.get('email'):
            instance.email = validated_data.get('email', instance.email)
        instance.date_join = validated_data.get('datejoin', instance.date_join)
        instance.post = validated_data.get('post', instance.post)
        instance.salary = validated_data.get('salary', instance.salary)
        instance.advantages.transport = advantages.get('transport', instance.advantages.transport)
        instance.advantages.post = advantages.get('post', instance.advantages.post)
        instance.advantages.cantine = advantages.get('cantine', instance.advantages.cantine)
        instance.advantages.ostie = advantages.get('ostie', instance.advantages.ostie)
        instance.save()

        return instance
        

