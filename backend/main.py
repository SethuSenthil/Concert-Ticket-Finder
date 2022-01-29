from flask import Flask
#beautifulsoup4 for webscraping

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"