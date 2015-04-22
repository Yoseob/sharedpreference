/**
 * Created by leeyoseob on 15. 2. 9.
 */
/**
 * Created by leeyoseob on 15. 2. 8.
 */
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    Bson = mongo.BSONPure;


var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('tsp', server);

db.open(function (err, db) {

    if (!err) {

        db.collection('accounts', {safe: true}, function (err, collection) {
            if (err) console.log(' fuck  error');

            collection.find().toArray(function (err, items) {
                console.log(items);
            })

        });
    }

});


var DataBaseInterFace = function () {


};
DataBaseInterFace.constructor = function () {

};

DataBaseInterFace.prototype = {
    dataBase: db,
    getDataBase: function () {
        return this.dataBase
    },
    openDataBase: function (dbName, callback) {
        db.open(function (err, database) {
            if (err) throw err;

        });
    },
    closeDataBase: function () {
        db.close(function (err, db) {
            if (err) throw err;
        });
    },
    insertDataWithCollectionName: function (collectionName, insertData, callback) {
        this.openDataBase();


        this.closeDataBase();

    },
    findOneWithThis: function (data, collectionName, callback) {
        db.collection(collectionName, {safe: true}, function (err, collection) {
            if (err) throw err;
            collection.findOne(data, function (err, item) {
                console.log(item);
                if (err) throw err;

                callback(item);
            });
        });
    }

};


var dbmodule = new DataBaseInterFace();


module.exports = dbmodule;