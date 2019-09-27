var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://tiko-mongodb:B6egUMEfbnFMG2nPyQd6ROwYr6kUfUvluv2aH1wGFFN2h4DrZztn3Neb8zDFlwHcWvxaWMxgOJ6Luf1kVLQnDg%3D%3D@tiko-mongodb.documents.azure.com:10255/?ssl=true", function (err, client) {
    console.log("connected.")
    var dbo = client.db("iot-devices")
    dbo.collection("sensors").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result)
        client.close()
    })
	client.close();
});