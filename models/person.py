#!/usr/bin/python
""" holds class City"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String


class Person(BaseModel, Base):
    """Representation of Person"""
    if models.storage_t == "db":
        __tablename__ = 'person'
        firstname = Column(String(128), nullable=False)
        lastname = Column(String(128), nullable=False)
        email = Column(String(128), nullable=False)
        contact = Column(String(128), nullable=False)
        long = Column(Numeric(precision=10, scale=5), nullable=False)
        lat = Column(Numeric(precision=10, scale=5), nullable=False)

    else:
        firstname = ""
        lastname = ""
        email = ""
        contact = ""

    def __init__(self, *args, **kwargs):
        """initializes person"""
        super().__init__(*args, **kwargs)
