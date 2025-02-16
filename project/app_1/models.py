from django.db import models

# Create your models here.
class Chats(models.Model):
    # chat_text = models.CharField(max_length=100)
    client = models.CharField(max_length=30)
    bussiness = models.CharField(max_length=30)
    client_chat = models.BooleanField()
    time_of_chat = models.DateTimeField()

    def __str__(self):
        return f'client = {self.client} bussiness = {self.bussiness} is_client = {self.client_chat} time = {self.time_of_chat}'