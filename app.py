from ssl import AlertDescription
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:test@cluster0.us9qe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/join", methods=["POST"])
def join_post():
    id_receive = request.form['id_give']
    password_receive = request.form['password_give']
    email_receive = request.form['email_give']
    birthday_receive = request.form['birthday_give']
    cellphone_receive = request.form['cellphone_give']
    doc = {
        'id':id_receive,
        'password': password_receive,
        'email':email_receive,
        'birthday':birthday_receive,
        'cellphone':cellphone_receive
    }
    db.joindata.insert_one(doc)
    return jsonify({'msg': '가입완료되었습니다'})




@app.route("/join", methods=["GET"])
def id_get():
    id_list = list(db.joindata.find({},{'_id':False}))
    return jsonify({'id': id_list})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)


