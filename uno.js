let deck = {
    red0: 1, red1: 2, red2: 2, red3: 2, red4: 2, red5: 2, red6: 2, red7: 2, red8: 2, red9: 2,
    yellow0: 1, yellow1: 2, yellow2: 2, yellow3: 2, yellow4: 2, yellow5: 2, yellow6: 2, yellow7: 2, yellow8: 2, yellow9: 2,
    green0: 1, green1: 2, green2: 2, green3: 2, green4: 2, green5: 2, green6: 2, green7: 2, green8: 2, green9: 2,
    blue0: 1, blue1: 2, blue2: 2, blue3: 2, blue4: 2, blue5: 2, blue6: 2, blue7: 2, blue8: 2, blue9: 2,
    redReverse: 2, yellowReverse: 2, greenReverse: 2, blueReverse: 2, redPlus2: 2, yellowPlus2: 2, greenPlus2: 2, bluePlus2: 2,
    redSkip: 2, yellowSkip: 2, greenSkip: 2, blueSkip: 2, wild: 4, wildPlus4: 4
};

let playerDeck = {}

function passCards() {
    for (i = 0; i < 7; i++) {
        let card = pickRandomCard(deck);
        if (playerDeck[card] == undefined) {
            playerDeck[card] = 1;
        }
        else {
            playerDeck[card] += 1;
        };
    };
};

function pickRandomCard(obj) {
    let keys = Object.keys(obj);
    let card = keys[keys.length * Math.random() << 0];
    while (obj[card] == 0) {
        card = keys[keys.length * Math.random() << 0]
    };
    obj[card] -= 1;
    return card;
};