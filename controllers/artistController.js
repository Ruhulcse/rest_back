const asyncHandler = require("express-async-handler");
const axios = require('axios');
//Login for Users
const callLastFMApi = async() =>{
  try {
    const apiUrl = ' https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=ada165e490f08a5fb48e6945c805519d&format=json';
    const postData = {
      name: "test",
    };
    const {data} = await axios.post(apiUrl, postData);
    const artist = data.results.artistmatches
    console.log(artist)
    // Handle the API response and send a response to the client
    // res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error calling external API');
  }
 
}
const getArtistInfo = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  await callLastFMApi()
  console.log("api key")
  // const user = await User.findOne({ email });
  // if (user && (await user.matchPassword(password))) {
  //   res.json({
  //     message: "login success",
  //     _id: user._id,
  //     email: user.email,
  //     token: generateToken(user._id),
  //   });
  // } else {
  //   res.status(202).send(new Error("invalid user name or password"));
  // }
});

module.exports = {
  getArtistInfo,
};
