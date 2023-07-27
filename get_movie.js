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
  const movie_info = {};

  const langue = $('div.font-size-16.text-white:nth-of-type(2) span').text().split(':')[1].trim();
  const year = $('div.font-size-16.text-white:nth-of-type(6) span').text().split(':')[1].trim();
  const dure = $('div.font-size-16.text-white:nth-of-type(7) span').text().split(':')[1].trim();
  const link = $('.bg-primary2').find('a').attr('href');
  const description = $('.widget-style-1').find('p').text().trim();
  const cast = [];
  $('div.widget-body.row div.entry-box a').each((index, element) => {
    const name = $(element).find('div.entry-title.text-center').text().trim();
    const imgSrc = $(element).find('div.col-auto img').attr('src');
    cast.push({ name, imgSrc });
  });

  // Extract genre data
  const genres = [];
  $('div.font-size-16.d-flex.align-items-center.mt-3 a').each((index, element) => {
    genres.push($(element).text().trim());
  });

  movie_info.langue = langue;
  movie_info.year = year;
  movie_info.dure = dure;
  movie_info.genres = genres;
  movie_info.link = link;
  movie_info.description = description;
  movie_info.cast = cast;

  const jsonData = {
    movie_info
  };
  return jsonData;
}


async function parseHTML2(html) {
    const $ = cheerio.load(html);
    
      // Extract movie data
      const direct_link = $('.download-link').attr('href');

    
    return direct_link;
  }

// Main function
async function main(code, name) {
  try {
    const link = `https://akwam.cz/movie/${code}/${name}`;
    const html = await fetchHTML(link);
    const jsonData = await parseHTML(html);
    const html2 = await fetchHTML(jsonData.movie_info.link);
    const direct_link = await parseHTML2(html2);
    jsonData.movie_info.direct_link = direct_link;
    return jsonData; // Return the extracted data in JSON format
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Invoke the main function
module.exports = main; // Export the main function
