let deck = {
    red0: 1, red1: 2, red2: 2, red3: 2, red4: 2, red5: 2, red6: 2, red7: 2, red8: 2, red9: 2,
    yellow0: 1, yellow1: 2, yellow2: 2, yellow3: 2, yellow4: 2, yellow5: 2, yellow6: 2, yellow7: 2, yellow8: 2, yellow9: 2,
    green0: 1, green1: 2, green2: 2, green3: 2, green4: 2, green5: 2, green6: 2, green7: 2, green8: 2, green9: 2,
    blue0: 1, blue1: 2, blue2: 2, blue3: 2, blue4: 2, blue5: 2, blue6: 2, blue7: 2, blue8: 2, blue9: 2,
    redReverse: 2, yellowReverse: 2, greenReverse: 2, blueReverse: 2, redPlus2: 2, yellowPlus2: 2, greenPlus2: 2, bluePlus2: 2,
    redSkip: 2, yellowSkip: 2, greenSkip: 2, blueSkip: 2, wild: 4, wildPlus4: 4
};
let playerDeck = {};
let cpuDeck = {};
let discardPile = {};
let turnNumber = 1;

let hiddenCards = document.querySelector("#hiddenCards");
let displayCards = document.querySelector("#displayCards");
const playButton = document.querySelector("#play");
let deckPile = document.querySelector("#deckPile");
let colorGrid = document.querySelector("#colorGrid");
let BackOfCard = document.querySelector("#backOfCard");
let numberOfCpuCards = document.querySelector("#cpuCards");
let discardPileCard;

let allCards = Object.keys(deck);
allCards.forEach((card) => {
    let newDiv = document.createElement("div");
    newDiv.id = "" + card;
    hiddenCards.appendChild(newDiv);
});

playButton.addEventListener("click", startGame);

function startGame() {
    passCards();
    playButton.remove();
    createDiscardPile();
    createDeckPile();
    createComputerPile();
    clickablePlayerCards();
    initialCard();
};

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
    displayCard();
    for (i = 0; i < 7; i++) {
        let cpuCard = pickRandomCard(deck);
        if (cpuDeck[cpuCard] == undefined) {
            cpuDeck[cpuCard] = 1;
        }
        else {
            cpuDeck[cpuCard] += 1;
        };
    };
    displayCpuCards();
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

function displayCard() {
    if (displayCards.lastElementChild.id != "hiddenCards") {
        let nodeList = [...displayCards.childNodes];
        let i = 0;
        nodeList.forEach((child) => {
            if (i >= 3) {
                displayCards.removeChild(child);
            };
            i += 1
        });
    };
    let cards = Object.keys(playerDeck);
    cards.forEach((card) => {
        let numberOfCards = playerDeck[card];
        while (numberOfCards > 0) {
            let newCard = document.getElementById(card);
            let cloneCard = newCard.cloneNode(true);
            displayCards.appendChild(cloneCard);
            numberOfCards -= 1;
        };
    }); 
};

function displayCpuCards() {
    let valuesList = Object.values(cpuDeck);
    let numberOfCards = valuesList.reduce((sum,value) => sum + value);
    numberOfCpuCards.textContent = "×" + numberOfCards;
};

function addToDiscardPile(e) {
    let cardName;
    if (typeof(e) == "string") {
        cardName = e;
    }
    else {
        cardName = e.target.id;
    };
    let cardNumber = cardName[cardName.length - 1];
    let cardPlus = cardName[cardName.length - 5];
    let discardCard = discardPileCard.firstChild.id;
    let discardCardColor = discardCard[0];
    let discardCardNumber = discardCard[discardCard.length - 1];
    let discardCardPlus = discardCard[discardCard.length - 5];
    if (cardName[0] === "w" && (cardNumber == "d" || cardNumber == 4)) {
        colorGrid.style.width = "300px";
    }
    else if (cardName[0] == discardCardColor) {
    }
    else if (cardNumber == discardCardNumber) {
        if (cardNumber == 2 && discardCardPlus == "P" && cardPlus != "P") {
            return
        }
        else if (cardNumber == 2 && discardCardPlus != "P" && cardPlus == "P") {
            return
        };
    }
    else if (cardPlus == "P" && discardCardPlus == "P") {
    }
    else {
        return
    };

    if (typeof(e) == "string") {
        discardPileCard.firstChild.id = cardName;
    }
    else {
        if (discardPileCard.firstChild) {
            discardPileCard.removeChild(discardPileCard.firstChild);
        };
        discardPileCard.appendChild(e.target);
        playerDeck[cardName] -= 1;
    };

    if (discardPile[cardName] == undefined) {
        discardPile[cardName] = 1;
    }
    else {
        discardPile[cardName] += 1;
    };
    turn();
};

function clickablePlayerCards() {
    let cards = displayCards.querySelectorAll("div");
    cards.forEach((card) => {
        card.addEventListener("click", addToDiscardPile);
    });
};

function createDiscardPile() {
    discardPileCard = document.createElement("div");
    discardPileCard.id = "discardPileCard";
    document.body.appendChild(discardPileCard);
};

function createDeckPile() {
    deckPile.style.background = "url('otherCards.png') 0 0";
    deckPile.style.pointerEvents = "all";
};

function createComputerPile() {
    BackOfCard.style.background = "url('otherCards.png') 0 0";
};

function initialCard() {
    let card = pickRandomCard(deck);
    let displayCard = document.getElementById(card);
    let cloneCard = displayCard.cloneNode(true);
    discardPileCard.appendChild(cloneCard);
    discardPile[card] = 1;
};

deckPile.addEventListener("click", drawAcard);
function drawAcard(e) {
    numberOfCardsInDeck = Object.values(deck).reduce((sum, value) => sum + value);
    if (numberOfCardsInDeck == 0) {
        discardPileToDeckPile();
    };
    let card = pickRandomCard(deck);
    if (e == undefined) {
        if (cpuDeck[card] == undefined) {
            cpuDeck[card] = 1;
        }
        else {
            cpuDeck[card] += 1;
        };
        displayCpuCards();
    }
    else {
        if (playerDeck[card] == undefined) {
            playerDeck[card] = 1;
        }
        else {
            playerDeck[card] += 1;
        };
        displayCard();
        clickablePlayerCards();
    };
    turn();
};

function discardPileToDeckPile() {
    discardPileEntries = Object.entries(discardPile);
    discardPileEntries.forEach((array) =>{
        let key = array[0];
        let value = array[1];
        if (key == discardPileCard.firstChild.id) {
            if (discardPile[key] == 1) {
                console.log(key);
            } else {
                deck[key] += (value - 1);
                discardPile[key] -= (value - 1);
            };
        } else {
            deck[key] += value;
            discardPile[key] -= value;
        };
    });
};

colorGrid.addEventListener("click", chooseColor);
function chooseColor(e) {
    let color = e.target.id;
    let newWildCard;
    let discardCard = discardPileCard.firstChild.id;
    switch (color) {
        case "cellRed":
            if (discardCard == "wild") {
                discardPileCard.style.background = "url('otherCards.png') -258.5px 0";
            }
            else if (discardCard == "wildPlus4") {
                discardPileCard.style.background = "url('otherCards.png') -691px 0px";
            };
            removeColorGrid();
            newWildCard = document.createElement("div");
            newWildCard.id = "redWild";
            discardPileCard.appendChild(newWildCard);
            break;

        case "cellYellow":
            if (discardCard == "wild") {
                discardPileCard.style.background = "url('otherCards.png') -172px 0";
            }
            else if (discardCard == "wildPlus4") {
                discardPileCard.style.background = "url('otherCards.png') -605px 0";
            };
            removeColorGrid();
            newWildCard = document.createElement("div");
            newWildCard.id = "yellowWild";
            discardPileCard.appendChild(newWildCard);
            break;

        case "cellGreen":
            if (discardCard == "wild") {
                discardPileCard.style.background = "url('otherCards.png') -431px 0";
            }
            else if (discardCard == "wildPlus4") {
                discardPileCard.style.background = "url('otherCards.png') -863px 0px";
            };
            removeColorGrid();
            newWildCard = document.createElement("div");
            newWildCard.id = "greenWild";
            discardPileCard.appendChild(newWildCard);
            break;

        case "cellBlue":
            if (discardCard == "wild") {
                discardPileCard.style.background = "url('otherCards.png') -344.5px 0";
            }
            else if (discardCard == "wildPlus4") {
                discardPileCard.style.background = "url('otherCards.png') -777px 0px";
            };
            removeColorGrid();
            newWildCard = document.createElement("div");
            newWildCard.id = "blueWild";
            discardPileCard.appendChild(newWildCard);
            break;
    };
};

function removeColorGrid() {
    discardPileCard.removeChild(discardPileCard.firstChild);
    colorGrid.style.width = "0px";
};

function cpuTurn() {
    let keys = Object.keys(cpuDeck);
    let cards = [];
    keys.forEach((key) => {
        if (cpuDeck[key] == 0) {
        }
        else {
            cards.push(key);
        };
    });
    let discardCard = discardPileCard.firstChild.id;
    let discardCardColor = discardCard[0];
    let discardCardNumber = discardCard[discardCard.length - 1];
    let card = cards.find((card) => {
        return (card[0] == discardCardColor || card[card.length - 1] == discardCardNumber);
    });
    if (card == undefined) {
        drawAcard();
    }
    else {
        cpuDeck[card] -= 1;
        displayCpuCards();
        addToDiscardPile(card);
    };
};

function turn() {
    if (turnNumber % 2 == 1) {
        turnNumber += 1;
        displayCards.style.pointerEvents = "none";
        displayCards.style.opacity = "40%";
        deckPile.style.pointerEvents = "none";
        setTimeout(cpuTurn, 500);
    }
    else {
        turnNumber += 1
        displayCards.style.pointerEvents = "";
        displayCards.style.opacity = "";
        deckPile.style.pointerEvents = "all";
    };
};