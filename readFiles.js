const fs = require('fs');
const ankiConnect = require('./ankiConnect');

const KEYWORD_NEXT_CARD = RegExp('xnextx', 'i');
const KEYWORD_CARD_FLIP = RegExp('xflipx', 'i');
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