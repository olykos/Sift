var data = require('./response.json'); //(with path)

var arr = search(data, "the");
console.log(arr);

function search(data, word) {
  var returnArr = [];

  for (r = 0; r < data.results.length; r++) {
    for (a = 0; a < data.results[r].alternatives.length; a++) {
      for (t = 0; t < data.results[r].alternatives[a].timestamps.length; t++) {
        if (data.results[r].alternatives[a].timestamps[t][0] == word) {
          returnArr.push(data.results[r].alternatives[a].timestamps[t]);
        }
      }
    }
  }
  return returnArr;
}
