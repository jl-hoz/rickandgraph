import request from 'request';
import fs from 'fs';

const fetchData = (callback, url, data) => {
  if (!data) data = [];
  try{
    data = JSON.parse(fs.readFileSync('./db.json').toString());
    callback(data);
  }catch(e){
    console.log('fechting data...');
    request({ url, json: true }, (error, response) => {
        if (response.body) {
          data = [...data, ...response.body.results]; // Spread operator
        }
        if (response.body.info.next !== ''){
          fetchData(callback, response.body.info.next, data);
        }else{
          fs.writeFileSync('./db.json', JSON.stringify(data));
          callback(data);
        }
    });
  }
  
};

export { fetchData };