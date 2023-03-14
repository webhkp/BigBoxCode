# flask_sse.py

from flask import Flask, Response, jsonify
from flask_cors import CORS
import time
import redis

app = Flask(__name__)
CORS(app)
r = redis.Redis(
    host='localhost',
    port=6379,
)

@app.route('/sse', methods=["GET"])
def sse():
    def sse_events():
        # Initiate Redis pub/sub 
        pubsub = r.pubsub()
        # Subscribe to channel "bigboxcode"
        pubsub.subscribe("bigboxcode")

        # Listen to message and perform action when a new message arrives
        for message in pubsub.listen():
            try:
                data = message["data"]

                yield "data: {}\n\n".format(str(data, 'utf-8'))
            except:
                pass

    return Response(sse_events(), mimetype="text/event-stream")