const axios = require('axios');
const cheerio = require('cheerio');

// Function to fetch HTML content from the API
async function fetchHTML(name) {
  try {
    const response = await axios.get('https://akwam.one/search?q=' + name + '&section=movie'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching HTML:', error);
    throw error;
  }
}

// Function to parse HTML and extract data
function parseHTML(html) {
  const $ = cheerio.load(html);
  
    // Extract movie data
    const movies = [];
    $('.col-lg-auto').each((i, elem) => {
        const name = $(elem).find('h3').text();
        const img = $(elem).find('img').attr('data-src');
        const link = $(elem).find('a').attr('href');
        movies.push({
            name,
            img,
            link
        });
    });

  
  const jsonData = {
    movies
  };
  
  return (jsonData);
}

// Main function
async function main(name) {
  try {
    const html = await fetchHTML(name);
    const jsonData = parseHTML(html);
    return jsonData; // Return the extracted data in JSON format
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

module.exports = main; // Export the main function

