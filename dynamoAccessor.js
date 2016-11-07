var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

// writeTestItem();
getTestItem();

function getTestItem() {
  var table = "SiftDB";
  var url = "https://www.youtube.com/watch?v=RWsx1X8PV_A";

  var params = {
    TableName: table,
    Key:{
      "url": url,
    }
  };

  docClient.get(params, function(err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      // console.log("GetItem succeeded:", JSON.stringify(data, null, 2));

      var arr = search(data.Item.json, "the");
      console.log(arr);

    }
  });
}

function writeTestItem() {
  var data = require('./response.json');
  var table = "SiftDB";

  var url = "https://www.youtube.com/watch?v=RWsx1X8PV_A";

  var params = {
    TableName:table,
    Item:{
      "url": url,
      "json": data,
    }
  };

  console.log("Adding a new item...");
  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
}

function search(json, word) {
  var returnArr = [];

  for (r = 0; r < json.results.length; r++) {
    for (a = 0; a < json.results[r].alternatives.length; a++) {
      for (t = 0; t < json.results[r].alternatives[a].timestamps.length; t++) {
        if (json.results[r].alternatives[a].timestamps[t][0] == word) {
          returnArr.push(json.results[r].alternatives[a].timestamps[t]);
        }
      }
    }
  }
  return returnArr;
}
