from flask import Flask, request
from flask_restful import Resource, Api
from flask import jsonify
import sqlite3 as sql
from json import *

app = Flask(__name__)


@app.route("/adduser",methods=["GET","POST"])
def adduser():
	error = ''
	try:
		if request.method == "POST":
			input_name = request.form['name']
			input_firstname = request.form['firstname']
			input_address = request.form['address']
			input_mail = request.form['mail'] 
			input_password = request.form['password'] #mdp
			input_priority = request.form['level'] #niveau (admin , user , superuser)
			input_shop = request.form['shop'] #magasin
			input_section = request.form['section'] #rayon
			input_function = request.form['function'] #poste
			
			"""print(input_name)
			print(input_firstname)
			print(input_address)
			print(input_mail)
			print(input_password)
			print(input_priority)
			print(input_shop)
			print(input_section)
			print(input_function)"""
			#then register the entry 
			with sql.connect("DB.db") as con:
				print("here2 \n")
				cur = con.cursor()
				cur.execute("INSERT INTO USER (Name,FirstName,Address,Priority,Blocked,ShopID,SectionID,FunctionID,PWD,mail) VALUES (?,?,?,?,?,?,?,?,?,?) ",(input_name,input_firstname,input_address,input_priority,0,input_shop,input_section,input_function,input_password,input_mail) )
				con.commit()
				print("Record successfully added")
	except:
		con.rollback()
		print("error in insert operation")
		#return render_template("login.html", error = error) // plus tard custom page  
		return jsonify({'text':'suscribe fail '})
	finally:
		return jsonify({'text':'suscribe ok '})
		con.close()
		
		
@app.route("/getuserfrommail",methods=["GET","POST"])
def getuserfrommail():
	error = ''
	try:
		if request.method == "POST":
			
			input_mail = request.form['mail'] 
			con = sql.connect("DB.db")
			#con.row_factory = sql.Row
			cur = con.cursor()
			cur.execute("select * from USER WHERE mail=?",(input_mail,))
			rows = cur.fetchall()
		
   
	except sqlite3.Error as e:
		print(type(e).__name__) 
		#return render_template("login.html", error = error) // plus tard custom page  
		return jsonify({'text':'getuser from mail fail '})
	finally:
		return jsonify(rows)
		con.close()
		
		
@app.route("/getshops",methods=["GET","POST"])
def getshops():
	error = ''
	try:
		if request.method == "GET":
			
			#request.args.get('nm')
			con = sql.connect("DB.db")
			#con.row_factory = sql.Row
			cur = con.cursor()
			cur.execute("select * from SHOP")
			rows = cur.fetchall()
		
   
	except sqlite3.Error as e:
		print(type(e).__name__) 
		#con.rollback()
		#print("REKT !!")
		#return render_template("login.html", error = error) // plus tard custom page  
		return jsonify({'text':'get shops  fail '})
	finally:
		return jsonify(rows)
		con.close()
		
@app.route("/getshopsfromID",methods=["GET","POST"])
def getshopsfromID():
	error = ''
	try:
		if request.method == "GET":
			
			input_ID = request.args.get('ID')
			print(input_ID)
			con = sql.connect("DB.db")
			#con.row_factory = sql.Row
			cur = con.cursor()
			cur.execute("select * from SHOP WHERE ID=?",(input_ID,))
			rows = cur.fetchall()
		
   
	except sqlite3.Error as e:
		print(type(e).__name__) 
		#con.rollback()
		#print("REKT !!")
		#return render_template("login.html", error = error) // plus tard custom page  
		return jsonify({'text':'get shops from ID fail '})
	finally:
		return jsonify(rows)
		con.close()
		
@app.route("/getshopsSectionfromID",methods=["GET","POST"])
def getshopsSectionfromID():
	error = ''
	try:
		if request.method == "GET":
			
			input_ID = request.args.get('ID')
			print(input_ID)
			con = sql.connect("DB.db")
			#con.row_factory = sql.Row
			cur = con.cursor()
			cur.execute("SELECT S.ID,S.Name FROM SECTION S INNER JOIN SHOP SH ON S.ShopID = SH.ID WHERE SH.ID =?",(input_ID,))
			rows = cur.fetchall()
		
   
	except sqlite3.Error as e:
		print(type(e).__name__) 
		#con.rollback()
		#print("REKT !!")
		#return render_template("login.html", error = error) // plus tard custom page  
		return jsonify({'text':'get shops from ID fail '})
	finally:
		return jsonify(rows)
		con.close()
		

@app.route("/getItemfromSectionID",methods=["GET","POST"])
def getItemfromSectionID():
	error = ''
	try:
		if request.method == "GET":
			
			input_ID = request.args.get('ID')
			print(input_ID)
			con = sql.connect("DB.db")
			#con.row_factory = sql.Row
			cur = con.cursor()
			cur.execute("SELECT I.ID,I.Description,I.Price,I.Amount FROM ITEM I INNER JOIN SECTION S ON I.SectionID = S.ID WHERE S.ID=?",(input_ID,))
			rows = cur.fetchall()
		
   
	except sqlite3.Error as e:
		print(type(e).__name__) 
		#con.rollback()
		#print("REKT !!")
		#return render_template("login.html", error = error) // plus tard custom page  
		return jsonify({'text':'get shops from ID fail '})
	finally:
		return jsonify(rows)
		con.close()
		
@app.route("/getUserFromShopID",methods=["GET","POST"])
def getUserFromShopID():
	error = ''
	try:
		if request.method == "GET":
			
			input_ID = request.args.get('ID')
			print(input_ID)
			con = sql.connect("DB.db")
			#con.row_factory = sql.Row
			cur = con.cursor()
			cur.execute("SELECT U.Name,U.Firstname,U.Priority,U.Blocked,U.ShopID,U.SectionID,U.FunctionID FROM USER U INNER JOIN SHOP SH ON U.ShopID = SH.ID WHERE SH.ID=?",(input_ID,))
			#U.Name,U.Firstname,U.Priority,U.Blocked,U.ShopID,U.SectionID,U.FunctionID
			rows = cur.fetchall()
		
   
	except sqlite3.Error as e:
		print(type(e).__name__) 
		#con.rollback()
		#print("REKT !!")
		#return render_template("login.html", error = error) // plus tard custom page  
		return jsonify({'text':'get shops from ID fail '})
	finally:
		return jsonify(rows)
		con.close()
		
		
@app.route("/updateAmountItem",methods=["GET","POST"])
def updateAmountItem():
	error = ''
	try:
		if request.method == "POST":
			
			input_ID = request.form['ID']
			input_Name = request.form['Name'] 
			input_Descprition = request.form['Description']  
			input_Price = request.form['Price'] 
			input_Amount = request.form['Amount'] 
			input_Section = request.form['Section'] 
			input_Category = request.form['Category'] 
			
			#print(input_ID)
			#print(input_Name)
			#print(input_Descprition)
			#print(input_Price)
			#print(input_Amount)
			#print(input_Category)
			con = sql.connect("DB.db")
			#con.row_factory = sql.Row
			cur = con.cursor()
			ret =cur.execute("UPDATE ITEM  SET  Name=?,Description=?,Price=?,Amount=?,SectionID=?,CategoryID=?  WHERE ID =?",(input_Name,input_Descprition,input_Price,input_Amount,input_Section,input_Category,input_ID,))
			con.commit()
			#rows = cur.fetchall()
			#print(ret)
			#print(rows)
			return jsonify({'text':'update item ok '})
			con.close()
			
		
   
	except Exception as e:
		print("Exception !!!!")
		print(e)
		con.rollback()
		con.close()
		
@app.route("/updateSection",methods=["GET","POST"])
def updateSection():
	error = ''
	try:
		if request.method == "POST":
			
			input_ID = request.form['ID']
			input_Name = request.form['Name'] 
			

			con = sql.connect("DB.db")
			#con.row_factory = sql.Row
			cur = con.cursor()
			ret = cur.execute("UPDATE SECTION  SET  Name=?  WHERE ID =?",(input_Name,input_ID,))
			con.commit()
			#rows = cur.fetchall()
			#print(ret)
			#print(rows)
			return jsonify({'text':'update item ok '})
			con.close()
			
		
   
	except Exception as e:
		print("Exception !!!!")
		print(e)
		con.rollback()
		con.close()
		
		

		
		
		
if __name__ == '__main__':
     app.run(port=5002)
