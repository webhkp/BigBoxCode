# sse_app.py

from flask import Flask, render_template, json, jsonify, request
from flask_sse import sse

app = Flask(__name__)
app.config["REDIS_URL"] = "redis://localhost:6379"
app.register_blueprint(sse, url_prefix='/stream')

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/publish', methods=["POST"])
def publish():
    try:
        # Get data from request and parse it
        data = json.loads(request.data)

        # Send to Redis publisher
        sse.publish(data, type="bigboxcode")
        
        return jsonify(status="success", message="published", data=data)
    except:
        return jsonify(status="fail", message="not published")