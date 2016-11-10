var AWS = require("aws-sdk");

url = process.argv[2];
word = process.argv[3];

if (url == null || word == null) {
  console.error("Usage: node sift.js 'url' 'word'");
  process.exit(1);
}

AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

findAllOccurences(url, word);

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
      if (data.Item == null) {
        console.log('No record for this url (' + url +')');
      } else {
        var arr = getWordArr(data.Item.json, word);
        console.log(arr);
      }
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
