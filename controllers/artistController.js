const asyncHandler = require("express-async-handler");
const axios = require("axios");
const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-writer').createObjectCsvWriter;
//Login for Users
const callLastFMApi = async (name) => {
  try {
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=ada165e490f08a5fb48e6945c805519d&format=json`;
    const postData = {
      name: "test",
    };
    const { data } = await axios.post(apiUrl, postData);
   
    const artist = data.results.artistmatches;
    return artist;
  } catch (error) {
    console(error);
    res.status(500).send("Error calling external API");
  }
};
const getArtistInfo = asyncHandler(async (req, res) => {
  const { name } = req.body;
  try {
    const response = await callLastFMApi(name);
    if (response) {
      const artists = response.artist;
      const parsedData = artists.map(artist => {
        const smallImage = artist.image.find(img => img.size === 'small');
        return {
          name: artist.name,
          mbId: artist.mbid,
          url: artist.url,
          image_small: smallImage ? smallImage['#text'] : '',
        };
      });

      // Write to CSV
      const csvFilePath = path.join(__dirname,'..', 'public', `${name}.csv`);
      const writer = csvWriter({
        path: csvFilePath,
        header: [
          { id: 'name', title: 'name' },
          { id: 'mbId', title: 'mbid' },
          { id: 'url', title: 'url' },
          { id: 'image_small', title: 'image_small' },
        ],
      });
      await writer.writeRecords(parsedData);
      res.json({
        message: "successfully retrived data",
        data: response
      });
    } else {
      res.status(202).send(new Error("No data found"));
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Error calling external API");
  }
});

module.exports = {
  getArtistInfo,
};
