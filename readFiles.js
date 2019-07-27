const fs = require('fs');
const ankiConnect = require('./ankiConnect');
//next in latin
const KEYWORD_NEXT_CARD = RegExp('\s*deinde\s*', 'i');
//turn in latin
const KEYWORD_CARD_FLIP = RegExp('\s*rursus\s*', 'i');
function stringToCards(str) {
    const cardStack = str.split(KEYWORD_NEXT_CARD);
    const cards = [];
    cardStack.forEach((card) => {
        cards.push(card.split(KEYWORD_CARD_FLIP));
    });
    ankiConnect.addNotes(cards);
}

module.exports = {
    stringToCards
}