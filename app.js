require('dotenv').config();
const request = require('request');

// AnkiConnect server
const url = 'http://localhost:8765';

const config = {
    deckName: 'test_deck1',
    front: 'front_data',
    back: 'back_data',
};

const body = {
    action: 'addNote',
    version: 6,
    params: {
        note: {
            deckName: config.deckName,
            modelName: 'Basic',
            fields: {
                Front: config.front,
                Back: config.back
            },
            tags: []
      }
    }
  };

request.post( { url, json: true, body }, (error, response) => {
    if (error) {
        console.error(error);
    }
    console.log(`note with id ${response.body.result} created`);
});

