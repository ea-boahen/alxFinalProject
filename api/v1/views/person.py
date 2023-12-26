#!/usr/bin/python2
""" objects that handle all default RestFul API actions for Persons """
from models.person import Person
from models import storage
from api.v1.views import app_views
from flask import Flask, abort, jsonify, make_response, request
from flasgger.utils import swag_from
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app) 

@app_views.route('/persons', methods=['GET'], strict_slashes=False)
@swag_from('documentation/person/all_persons.yml')
def get_persons():
    """
    Retrieves the list of all person objects
    or a specific person
    """
    all_persons = storage.all(Person).values()
    list_persons = []
    for person in all_persons:
        list_persons.append(person.to_dict())
    return jsonify(list_persons)


@app_views.route('/persons/<person_id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/person/get_person.yml', methods=['GET'])
def get_person(person_id):
    """ Retrieves an person """
    person = storage.get(Person, person_id)
    if not person:
        abort(404)

    return jsonify(person.to_dict())


@app_views.route('/persons/<person_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/person/delete_person.yml', methods=['DELETE'])
def delete_person(person_id):
    """
    Deletes a person Object
    """

    person = storage.get(Person, person_id)

    if not person:
        abort(404)

    storage.delete(person)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/persons', methods=['OPTIONS','POST'], strict_slashes=False)
@cross_origin()
@swag_from('documentation/person/post_person.yml', methods=['POST'])
def post_person():
    """
    Creates a person
    """
    
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'contact' not in request.get_json():
        abort(400, description="Missing contact")
    if 'firstname' not in request.get_json():
        abort(400, description="Missing firstname")

    data = request.get_json()
    instance = Person(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/persons/<person_id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/person/put_person.yml', methods=['PUT'])
def put_person(person_id):
    """
    Updates a person
    """
    person = storage.get(Person, person_id)

    if not person:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'email', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(person, key, value)
    storage.save()
    return make_response(jsonify(person.to_dict()), 200)
