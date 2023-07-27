const axios = require('axios');
const cheerio = require('cheerio');

// Function to fetch HTML content from the API
async function fetchHTML(link) {
  try {
    const response = await axios.get(link); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching HTML:', error);
    throw error;
  }
}

async function parseHTML(html) {
  const $ = cheerio.load(html);

  // Extract movie data
  const movie_link = {};

  const videos = [];
  $('video#player source').each((index, element) => {
    const url = $(element).attr('src').replace('https', 'http');
    const type = $(element).attr('size') + 'p';
    videos.push({ url, type });
  });
  movie_link['videos'] = videos;

  const jsonData = {
    movie_link
  };
  return jsonData;
}


// Main function
async function main(code, code2, name) {
  try {
    const link = `https://ak.sv/watch/${code}/${code2}/${name}`;
    const html = await fetchHTML(link);
    const jsonData = await parseHTML(html);
// here i want to change https to http in url
    return jsonData; // Return the extracted data in JSON format
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Invoke the main function
module.exports = main; // Export the main function
