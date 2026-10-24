const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  'pad-mounted-cover-hero.webp',
  'front.webp',
  'interior.webp',
  'pad-mounted-radiator-fins-midclose.webp',
  'angle.webp',
  'pad-mounted-interior-compartment-midclose.webp',
  'pad-mounted-front-three-quarter-cabinet-open.webp',
  'pad-mounted-cover-feature.webp'
];

const outDir = 'd:/laragon/www/trans/public/assets/images/products/pad-mounted';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function download(filename) {
  const url = `https://www.emiratestransformer.com/images/products/pad-mounted/${filename}`;
  const dest = path.join(outDir, filename);
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFromUrl(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const f = fs.createWriteStream(dest);
      res.pipe(f);
      f.on('finish', () => {
        f.close();
        resolve(dest);
      });
    }).on('error', reject);
  });
}

function downloadFromUrl(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const f = fs.createWriteStream(dest);
      res.pipe(f);
      f.on('finish', () => {
        f.close();
        resolve(dest);
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const img of images) {
    try {
      console.log(`Downloading ${img}...`);
      await download(img);
      console.log(`Saved ${img}`);
    } catch (e) {
      console.error(`Failed ${img}: ${e.message}`);
    }
  }
}

run();
