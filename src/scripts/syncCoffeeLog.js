const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config();

const coffeeLogFilePath = path.join(__dirname, '../../data/coffeeLog.json');

const httpsGet = url => {
  return new Promise((resolve, reject) => {
    let data = '';

    https
      .get(url, res => {
        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(data));
        });

        res.on('error', err => {
          reject(err);
        });
      })
      .on('error', err => {
        reject(err);
      });
  });
};

const getSheetData = async () => {
  const API_KEY = process.env.API_KEY;
  const SHEET_ID = process.env.SHEET_ID;
  const RANGE = 'Log!A1:J100';

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  try {
    console.log('Fetching coffee log data...');

    const response = await httpsGet(url);
    return response.values;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

const formatData = data => {
  const rowsToProcess = data.slice(1);
  console.log('Formatting coffee log data...');

  let formattedData = [];

  for (const row of rowsToProcess) {
    formattedData.push({
      name: row[0],
      roaster: row[1],
      origin: row[2],
      elevation: row[3],
      varietal: row[4],
      process: row[5],
      tastingNotes: row[6],
      otherNotes: row[7],
      purchaseLocation: row[8],
      dateFirstConsumed: row[9],
    });
  }

  return formattedData;
};

const prepareEnv = () => {
  console.log('Cretating data directory...')
  fs.mkdirSync(path.dirname(coffeeLogFilePath), { recursive: true });

  if (fs.existsSync(coffeeLogFilePath)) {
    console.log('Removing previous coffee log data...');
    fs.unlinkSync(coffeeLogFilePath);
    console.log('Previous coffee log data removed.');
  }
};

async function main() {
  prepareEnv();

  const sheetData = await getSheetData();
  if (!sheetData) {
    console.log('No data to process');
    return;
  }

  const formattedData = formatData(sheetData);

  console.log('Writing coffee log data...');
  fs.writeFileSync(coffeeLogFilePath, JSON.stringify(formattedData, null, 2));
  console.log('Coffee log synced successfully!');
}

main();
