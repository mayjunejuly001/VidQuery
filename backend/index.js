const {google} = require('googleapis');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const dotenv =require("dotenv");
dotenv.config();

// Set up the YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: 'GOOGLE_API_KEY'
});


// Set up the MongoDB client
const mongoURI = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(mongoURI, { useNewUrlParser: true });

// Get the video ID from the YouTube URL
const url = 'https://www.youtube.com/watch?v=QxU-JrfA824';
const video_id = 'QxU-JrfA824';


// Use the YouTube API to retrieve the video information
youtube.videos.list({
  part: 'snippet',
  id: video_id
}, async (err, res) => {
  if (err) {
    console.error(err);
    return;
  }


const video_title = res.data.items[0].snippet.title;
const video_description = res.data.items[0].snippet.description;


// Define an async function to ask OpenAI for the transcript

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-fiMPrhPhvOa4QganspZH1BuJ",
    apiKey:   process.env.OPENAI_API_KEY,
});
const askOpenAi = async (title, description) => {
  const openai = new OpenAIApi(configuration);

  const prompt = `Extract the transcript of the video '${title} ${description}'`;
  const response = await openai.createCompletion({
    
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 400,
    n: 1,
    stop: null,
    temperature: 0.5,
  });
  
  const transcript = response.data.choices[0].text.trim();
  return transcript;
};



  // Use OpenAI's Whisper API to extract the transcript
  const transcript = await askOpenAi(video_title, video_description);
  

  // Store the transcript in local text file
  fs.writeFile('transcrit.txt', transcript, (err) => {
    if (err) throw err;
    console.log('The answer has been saved!');
  });   

  
  // OR Store the transcript in MongoDB
  // client.connect((err) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   const collection = client.db('QandA').collection('trial');
  //   collection.insertOne({ transcript }, (err, result) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     console.log('Transcript stored successfully in MongoDB!');
  //     client.close();
  //   });
  // });
});