from flask import Flask, request
from flask_restful import Resource, Api
from flask import jsonify
app = Flask(__name__)


@app.route("/suscribe",methods=["GET","POST"])
def suscribe():
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
			
			print(input_name)
			print(input_firstname)
			print(input_address)
			print(input_mail)
			print(input_password)
			print(input_priority)
			print(input_shop)
			print(input_section)
			print(input_function)
			#return render_template("login.html", error = error) // plus tard custom page  
			return jsonify({'text':'suscribe ok '})
	except Exception as e:
			print(e)
			return jsonify({'text':'error suscribe!'})
		


if __name__ == '__main__':
     app.run(port=5002)
