// Import the express and body-parser modules
const express = require('express');
const app = express();
app.use(express.json());

const clarifai = async (req, res) => {
    const fetch = await import('node-fetch');
  
    const USER_ID = 'xaru';
    const PAT = '6d8707e3ccdd421a85a5b498a1717409'; // API key
    const APP_ID = 'my-first-application';
    const MODEL_ID = 'face-detection'; // Change this to whatever model you want to use
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105'; // Change this to whatever model version you want to use
    const imageURL = req.body.IMAGE_URL;
  
    if (!imageURL) {
      return res.status(400).json({ error: 'IMAGE_URL is missing from the request body' });
    }
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: JSON.stringify({
        "inputs": [
          {
            "data": {
              "image": {
                "url": imageURL
              }
            }
          }
        ]
      })
    };
  
    try {
      const response = await fetch.default("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions);
      const jsonResponse = await response.json();
      res.json(jsonResponse);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = {
    clarifai: clarifai
  };
  






// const res = require("express/lib/response");
// const clarifai = async (req, res) => {

//     const USER_ID = 'xaru';
//     // Your PAT (Personal Access Token) can be found in the portal under Authentification
//     const PAT = '6d8707e3ccdd421a85a5b498a1717409'; //API key
//     const APP_ID = 'my-first-application';
//     // Change these to whatever model and image URL you want to use
//     const MODEL_ID = 'face-detection';  
//     const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';   

//     // const raw = JSON.stringify({
//     //     "user_app_id": {
//     //         "user_id": USER_ID,
//     //         "app_id": APP_ID
//     //     },
//     //     "inputs": [
//     //         {
//     //             "data": {
//     //                 "image": {
//     //                     "url": IMAGE_URL
//     //                 }
//     //             }
//     //         }
//     //     ]
//     // });
    
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': 'Key ' + PAT
//         },
//         body: req.raw
//     };

//     console.log("req.bod ", req.body);

//     const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
//     // console.log("response: ",response)
//     res.json(response)
// }

// module.exports = {
//     clarifai: clarifai
// }