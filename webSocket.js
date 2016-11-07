var token = "%2BOvscqNsO6AbzdtTpM84s8L7aIJZxtBfYMbAVC0dIMzYtzJaqYV6jZh1XzoJrZUXqiXY4sFaGa4uIl7LU1abiQ9ZS40V6SvjZeEqcW6z5rfeII6OljahUmQ7gHKfA86zWaybmb%2FA9nlXXpgZa6GCllxbS6%2BbPnNu6xIq1kR0ZBqq0K0fE0qlZsqYsqDm3qXo7ir2gi8PoWu9sWlqjBuqMd6PCPdtiIb07jFr0GCPurlcITjTSGw4lNU5SgHr4XaE7VGdppXldanu3NK9iHdBOTi7Dlus0U0OxCCmzRkiHzuaiARKgnoWYIUFOBxayH1s%2BQi1Vo3zHeOEhpWkFw0uMc5zLtKkLgT710%2BPpmkZl2jqU%2FDI5yxtcdOARMSQ1GNBmXUXQ3qxc889y3ziYz1WhQvUnV3RsqcGdkIyyfuYNFswJHGa3p%2BWWScDkyfXAlgCbCL48DdW3%2F%2FwjckoWzIC1K4BOwnyxSS1t7LGd20jfpijhRXCXQm8igNPCr7skaq193DA%2Fv0R9RE1oTX2Tn31v3tPE6Rjs58i6bn8KZMP6jf%2FwxNUaAmOdbd%2FMe9TNgzqtXHTnmXbBxVTZIOvskMUHN24Y0sBAKk0ODfN%2FMgF94G4vdAjhXCckJ84T16eSauVXifwYr4jJdhZReck8SbK%2Ff0N%2BL5PAxj0ZODYtfJfqvFo8Os7azWI296kz4FzAcWlLHnWN81DFgdiiwjC4zGuHdfQHFpVFoTBZeW05pE7SXPX4ycW8X1ZH2RZWisoGLrjAZqs93oI5i4tck9kRQjyOpjPmxj0mEWv09BlNh%2FuuIylyW%2FBOZlaGekHEI63G1HqHRvUb8IMfMKVSQntR1NGopvC%2FyjPYIVgD5N0m43av1yPMnfLZL1G0YWOhGoSvj%2FR9DARvQ%2BZa90yIA%2BXnHcLEiI9m4OWA832";
var wsURI = 'wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?watson-token=' + token
  + '&model=es-ES_BroadbandModel';

var WebSocket = require('ws');
var ws = new WebSocket(wsURI);
ws.onopen = function(evt) { onOpen(evt) };
// ws.onclose = function(evt) { onClose(evt) };
// ws.onmessage = function(evt) { onMessage(evt) };
// ws.onerror = function(evt) { onError(evt) };

function onOpen(evt) {
   var message = {
      'action': 'start',
      'content-type': 'audio/wav'
   };
   ws.send(JSON.stringify(message));
}
