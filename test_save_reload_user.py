#!/usr/bin/python3
from models import storage
from models.base_model import BaseModel
from models.person import Person

all_objs = storage.all()
print("-- Reloaded objects --")
for obj_id in all_objs.keys():
    obj = all_objs[obj_id]
    print(obj)

print("-- Create a new Person --")
my_person = Person()
my_person.firstname = "Betty"
my_person.lastname = "Doe"
my_person.email = "betty@gmail.com"
my_person.contact = "+23356046287"
my_person.long = -0.1180
my_person.lat = 51.5098
my_person.save()
print(my_person)

print("-- Create a new Person 2 --")
my_person2 = Person()
my_person2.firstname = "John"
my_person.lastname = "Doe"
my_person.email = "john@gmail.com"
my_person2.contact = "+233560463879"
my_person2.long = -0.1180
my_person2.lat = 51.5098
my_person2.save()
print(my_person2)
