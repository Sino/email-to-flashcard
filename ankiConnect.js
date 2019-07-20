require('dotenv').config();
const request = require('request');


// AnkiConnect server
const url = 'http://localhost:8765';
function addNote(arr) {
    const noteConfig = {
        deckName: 'test_deck1',
        front: arr[0],
        back: arr[1],
    };

    const body = {
        action: 'addNote',
        version: 6,
        params: {
            note: {
                deckName: noteConfig.deckName,
                modelName: 'Basic',
                fields: {
                    Front: noteConfig.front,
                    Back: noteConfig.back
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
}

module.exports = {
    addNote
};