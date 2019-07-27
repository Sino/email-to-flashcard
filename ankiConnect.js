require('dotenv').config();
const request = require('request');


// AnkiConnect server
const url = 'http://localhost:8765';
function addNote(front, back) {
    const noteConfig = {
        deckName: 'test_deck1',
        front,
        back,
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
        if (response.body.result) {
            console.log(`note with id ${response.body.result} created`);
        }
    });

}

function addNotes(cardData) {
    cardData.forEach( (card) => {
        addNote(card[0], card[1]);
    });
}

module.exports = {
    addNotes
};