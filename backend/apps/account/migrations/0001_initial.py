# Generated by Django 4.1.7 on 2023-03-29 10:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Advantage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transport', models.BooleanField(default=False, verbose_name='transport')),
                ('cnaps', models.BooleanField(default=False, verbose_name='cnaps')),
                ('ostie', models.BooleanField(default=False, verbose_name='ostie')),
                ('cantine', models.BooleanField(default=False, verbose_name='cantine')),
            ],
            options={
                'verbose_name': 'Advantage',
                'verbose_name_plural': 'Advantages',
            },
        ),
        migrations.CreateModel(
            name='Employe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=50, verbose_name='firstname')),
                ('lastname', models.CharField(max_length=50, verbose_name='lastname')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email')),
                ('post', models.CharField(max_length=50, verbose_name='post')),
                ('salary', models.BigIntegerField(verbose_name='salary')),
                ('datejoin', models.DateField(verbose_name='date_join')),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('advantages', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='advantages', to='account.advantage')),
            ],
            options={
                'verbose_name': 'Employe',
                'verbose_name_plural': 'Employes',
            },
        ),
    ]
