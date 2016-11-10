#!/bin/bash
# Download audio as wav and curl to Watson for speech-to-text > response.json

#clear
echo 'Clearing existing temp files...'
rm temp.wav
rm response.json

echo 'Downloading audio...'
youtube-dl --extract-audio --audio-format wav $1 --output "temp.%(ext)s" > /dev/null
echo 'Transcribing speech...'
curl -X POST -u d2b0c3c6-25b6-43f9-ad9c-ca628c1af57b:UqAvdO2zvXE2 --header "Content-Type: audio/wav" --header "Transfr-Encoding: chunked" --data-binary @/Users/olykos/Desktop/cs89/Sift/temp.wav "https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?continuous=true&timestamps=true" > response.json
echo 'Uploading JSON to DynamoDB...'
node dynamoAccessor.js $1
echo 'Done'
