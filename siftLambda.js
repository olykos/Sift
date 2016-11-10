'use strict';

console.log('Loading function');

const AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {

var params = event.params;
var url = params.url;
var word = params.word;

console.log(url + ", " + word);

var doc = require('dynamodb-doc');
var dynamoDB = new doc.DynamoDB();

findAllOccurences(url, word);

function findAllOccurences(url, word) {
  var table = "SiftDB";

  var params = {
    TableName: table,
    Key:{
      "url": url,
    }
  };

  dynamoDB.getItem(params, function(err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      if (data.Item === null) {
        console.log('No record for this url (' + url +')');
      } else {
        var arr = getWordArr(data.Item.json, word);
        var returnArr = createResultsArray(arr, url, word);
        callback(null, returnArr);
        console.log(returnArr);
      }
    }
  });
}

function getWordArr(json, word) {
  var returnArr = [];

  for (var r = 0; r < json.results.length; r++) {
    for (var a = 0; a < json.results[r].alternatives.length; a++) {
      for (var t = 0; t < json.results[r].alternatives[a].timestamps.length; t++) {
        if (json.results[r].alternatives[a].timestamps[t][0] == word) {
          returnArr.push(json.results[r].alternatives[a].timestamps[t]);
        }
      }
    }
  }
  return returnArr;
}


function createResultsArray(arr, url, word) {

  var returnArr = [];

  if (arr.length === 0) {
    console.log("Word not found.");
    return returnArr;
  }
  arr.forEach(function(element) {
    returnArr.push(url + "&t=" + Math.floor(element[1]/60) + "m" + Math.floor(element[1]%60) + "s");
  });

  return returnArr;
}

};
