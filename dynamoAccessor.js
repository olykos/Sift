var AWS = require("aws-sdk");

url = process.argv[2];

if (url == null) {
  console.error("Error: no url argument specified");
  process.exit(1);
}

AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

writeItem(url);
// findAllOccurences(url, "the");

function writeItem(url) {
  var data = require('./response.json');
  var table = "SiftDB";

  var params = {
    TableName:table,
    Item:{
      "url": url,
      "json": data,
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    }
  });
}
