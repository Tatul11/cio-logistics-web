const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = './public/images';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));

async function fetchTitle(id) {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/photos/${id}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<title>(.*?)<\/title>/);
        if (match) {
          resolve(match[1].split(' | ')[0]);
        } else {
          resolve('Unknown');
        }
      });
    }).on('error', () => resolve('Error'));
  });
}

async function run() {
  for (const file of files) {
    const parts = file.split('-');
    // ID is usually the second to last part before "unsplash.webp"
    const id = parts[parts.length - 2];
    if (id) {
      const title = await fetchTitle(id);
      console.log(`${file} => ${title}`);
    } else {
      console.log(`${file} => No ID found`);
    }
  }
}

run();
