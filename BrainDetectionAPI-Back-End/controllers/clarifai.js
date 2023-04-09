const res = require("express/lib/response");



const clarifai = async (req, res) => {

    const USER_ID = 'xaru';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '6d8707e3ccdd421a85a5b498a1717409'; //API key
    const APP_ID = 'my-first-application';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';  
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';   

    console.log("req.bod ", req.body);
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: req.raw
    };

    const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    // console.log("response: ",response)
    res.json(response)
}

module.exports = {
    clarifai: clarifai
}