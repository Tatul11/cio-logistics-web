const fs = require('fs');
const path = require('path');

const images = [
  '/images/andy-li-CpsTAUPoScw-unsplash.webp',
  '/images/arno-senoner-u2OdNnrksIk-unsplash.webp',
  '/images/arno-senoner-yqu6tJkSQ_k-unsplash.webp',
  '/images/aron-yigin-lNpAmLA_bvQ-unsplash.webp',
  '/images/aron-yigin-sNY6B9NsPP8-unsplash.webp',
  '/images/bent-van-aeken-0A7YwYhZhWw-unsplash.webp',
  '/images/bernd-dittrich-AA1HmM6FzVE-unsplash.webp',
  '/images/bernd-dittrich-LKvT6sCkuPU-unsplash.webp',
  '/images/bernd-dittrich-mXG463mXYGI-unsplash.webp',
  '/images/bernd-dittrich-miHHRMLDDH8-unsplash.webp',
  '/images/caleb-ruiter-EmEQ6kK_5P0-unsplash.webp',
  '/images/chuttersnap-9cCeS9Sg6nU-unsplash.webp',
  '/images/chuttersnap-fN603qcEA7g-unsplash.webp',
  '/images/chuttersnap-kyCNGGKCvyw-unsplash.webp',
  '/images/elevate-dI-aXC7DWpQ-unsplash.webp',
  '/images/elias--lYi5Qg0xP0-unsplash.webp',
  '/images/frank-mckenna-tjX_sniNzgQ-unsplash.webp',
  '/images/john-simmons-XFLk8qZ-6MA-unsplash.webp',
  '/images/marcin-jozwiak-kGoPcmpPT7c-unsplash (1).webp',
  '/images/marcin-jozwiak-oh0DITWoHi4-unsplash.webp',
  '/images/nathan-cima-MHXJ9p64Jw8-unsplash.webp',
  '/images/pat-whelen-xSsWBa4rb6E-unsplash.webp',
  '/images/rinson-chory-2vPGGOU-wLA-unsplash.webp',
  '/images/seb-creativo-3jG-UM8IZ40-unsplash.webp',
  '/images/shaah-shahidh--subrrYxv8A-unsplash.webp',
  '/images/taro-ohtani-5T5zmIqs0AM-unsplash.webp'
];

let imageIndex = 0;
const getNextImage = () => {
  const img = images[imageIndex % images.length];
  imageIndex++;
  return img;
};

const dicts = ['en.json', 'ru.json', 'hy.json'];
const dictDir = path.join(__dirname, 'src', 'dictionaries');

dicts.forEach(file => {
  const filePath = path.join(dictDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all https://ciologistics.com/wp-content/... with a local WebP image
    content = content.replace(/https:\/\/ciologistics\.com\/wp-content\/uploads\/[^\s"]+/g, () => getNextImage());
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated images in ${file}`);
  }
});
