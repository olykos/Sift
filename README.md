# Sift
Repository for Sift project (command-f for video/audio data)

# Notes

You will need to install the aws sdk for Node.js to talk to DynamoDB - also message me (Orestis) to create an IAM Role for you (Or I can just deal with aws and you won't have to worry).

Clean up & add real README later.

# Use

Open terminal, type bash indexVideo.sh http://www.youtube.com/watch?v=RWsx1X8PV_A (or any other url)

Once the script completes, an entry is created in DynamoDB under that URL, containing the JSON transcription of the audio.
