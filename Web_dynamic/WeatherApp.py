#!/usr/bin/python3

#!/usr/bin/python3
"""
Flask App that integrates with AirBnB static HTML Template
"""
import uuid
from flask import Flask, render_template, url_for
# from alxFinalProject.models import storage

# flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5001
host = '0.0.0.0'


# begin flask page rendering
@app.teardown_appcontext
def teardown_db(exception):
    """
    after each request, this method calls .close() (i.e. .remove()) on
    the current SQLAlchemy Session
    """
    # storage.close()


@app.route('/weatherapp/')
def hbnb_filters(the_id=None):
    """
    handles request to custom template with states, cities & amentities
    """
  
    cache_id = (str(uuid.uuid4()))
    return render_template('index.html')

@app.route('/notifyme/')
def hbnb_filters2(the_id=None):
    """
    handles request to contacts page
    """
  
    # cache_id = (str(uuid.uuid4()))
    return render_template('contact.html')


if __name__ == "__main__":
    """
    MAIN Flask App"""
    app.run(host=host, port=port)
