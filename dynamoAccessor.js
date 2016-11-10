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

  console.log(url);

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

//Not necessarily needed in the end - could move to Chrome plugin side
function findAllOccurences(url, word) {
  var table = "SiftDB";

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
      var arr = getWordArr(data.Item.json, word);
      console.log(arr);
    }
  });
}

function getWordArr(json, word) {
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
