
import os
import pandas as pd
import numpy as np
from flask import Flask, render_template, redirect, url_for, request, session, flash, jsonify 
# from functools import wraps
# import wnt_scrape


app = Flask(__name__)



@app.route('/')

def home():
    return render_template('index.html')

@app.route('/story')
def story():
    return render_template('story.html')  

@app.route('/equity')
def equity():
    return render_template('equity.html')  

@app.route('/locations')
def locations():
    return render_template('locations.html')  

@app.route('/charts')
def charts():
    return render_template('charts.html')  

@app.route('/latest')
def latest():
    return render_template('latest.html') 

if __name__ == "__main__":
    app.run(debug=True)