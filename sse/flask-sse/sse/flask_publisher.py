# flask_publisher.py

from flask import Flask, request, jsonify, json
from flask_cors import CORS
import redis

app = Flask(__name__)
CORS(app)
r = redis.Redis(
    host='localhost',
    port=6379,
)

@app.route('/publish', methods=["POST"])
def publish():
    try:
        # Get data from request and parse it
        data = json.loads(request.data)

        # Send to Redis publisher
        r.publish("bigboxcode", json.dumps(data))
        
        return jsonify(status="success", message="published", data=data)
    except:
        return jsonify(status="fail", message="not published")