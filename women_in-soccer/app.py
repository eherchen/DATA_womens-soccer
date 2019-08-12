# import the Flask class from the flask module
import os
import pandas as pd
import numpy as np
from flask import Flask, render_template, redirect, url_for, request, session, flash, jsonify 
from functools import wraps
import sqlite3


app = Flask(__name__)

app.secret_key = "mykey"



def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by the db_file
    :param db_file: database file
    :return: Connection object or None
    """
    try:
        conn = sqlite3.connect(soccerdata.sqlite)
        return conn
    except Error as e:
        print(e)
 
    return None
 
 
# def select_all_data(conn):
#     """
#     Query all rows in the  table
#     :param conn: the Connection object
#     :return:
#     """
#     cur = conn.cursor()
#     cur.execute("SELECT * FROM cam_psa")
 
#     rows = cur.fetchall()
 
#     for row in rows:
#         print(row)

# login required decorator
# def login_required(f): 
#     @wraps(f)
#     def wrap(*args, **kwargs):
#         if 'logged_in' in session:
#             return f(*args, **kwargs)
#         else:
#             flash('You need to login first.')
#             return redirect(url_for('login'))
#     return wrap

# use decorators to link the function to a url
@app.route('/')
# @login_required
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

# @app.route('/about')
# def about():
#     return render_template('about.html')  

# @app.route('/dataviz')
# def dataviz():
#     return render_template('dataviz.html')  

# @app.route('/datatable')
# def datatable():
#    con = sqlite3.connect("soccerdata.sqlite")
#    con.row_factory = sqlite3.Row
   
#    cur = con.cursor()
#    cur.execute("select * from cam_psa")
   
#    rows = cur.fetchall()
#    return render_template("datatable.html",rows = rows)

# def datatable():
#     return render_template('datatable.html')

   

# @app.route('/maps')
# def maps():
#     return render_template('maps.html') 

# @app.route('/maplarge')
# def maplarge():
#     return render_template('maplarge.html') 

# @app.route('/api')
# def api():
#     return (
#         f"<h1>Welcome to the DCcamerAPI!</h1><br/>"
#         f"<strong><u>Available Routes:</u></strong><br/>"
#         f"/api/v1.0/dc-cameras<br/>"
#         f"<br/>"
#         f"<strong>PSAs:</strong><br/>"
#         f"/api/v1.0/dc-cameras/psa/101<br/>"
#         f"to<br/>"
#         f"/api/v1.0/dc-cameras/psa/708<br/>"
#         f"<br/>"
#         f"<strong>Districts:</strong><br/>"
#         f"/api/v1.0/dc-cameras/district/1<br/>"
#         f"to<br/>"
#         f"/api/v1.0/dc-cameras/district/7<br/>"
#     )

# @app.route("/api/v1.0/dc-cameras")
# def dccameras():
#     return jsonify(camdata)

# @app.route("/api/v1.0/dc-cameras/psa/<psa>")
# def dcpsa(psa):

#     canonicalized = psa.replace(" ", "").lower()
#     for PSA in camdata:
#         search_term = str(PSA["PSA"])
        
#         if search_term == canonicalized:
#             return jsonify(PSA)

#     return jsonify({"error": f"PSA #{psa} not found."}), 404

# @app.route("/api/v1.0/dc-cameras/district/<district>")
# def dcdistrict(district):

#     canonicalized = district.replace(" ", "").lower()
#     for district_no in camdata:
#         search_term = str(district_no["District"])
        
#         if search_term == canonicalized:
#             return jsonify(district_no)

#     return jsonify({"error": f"District #{district} not found."}), 404

# # Route for handling the login page logic
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     error = None
#     if request.method == 'POST':
#         if request.form['username'] != 'admin' or request.form['password'] != 'admin':
#             error = 'Invalid Credentials. Please try again.'
#         else:
#             session['logged_in'] = True
#             flash("You were just logged in!")
#             return redirect(url_for('home'))
#     return render_template('login.html', error=error)

# @app.route('/logout')
# @login_required
# def logout():
#    session.pop('logged_in', None)
#    flash("You were just logged out.")
#    return redirect(url_for('welcome'))


# start the server with the 'run()' method

if __name__ == "__main__":
    app.run(debug=True)