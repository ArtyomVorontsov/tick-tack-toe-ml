var readlineSync = require('readline-sync');

const winPositions = [
    // | | |
    [
        true, false, false,
        true, false, false,
        true, false, false
    ],
    [
        false, true, false,
        false, true, false,
        false, true, false
    ],
    [
        false, false, true,
        false, false, true,
        false, false, true
    ],
    // / \
    [
        true, false, false,
        false, true, false,
        false, false, true
    ],
    [
        false, false, true,
        false, true, false,
        true, false, false
    ],
    // - - -
    [
        true, true, true,
        false, false, false,
        false, false, false
    ],
    [
        false, false, false,
        true, true, true,
        false, false, false
    ],
    [
        false, false, false,
        false, false, false,
        true, true, true
    ],
];

const currentGamePositions = [
    false, false, false,
    false, false, false,
    false, false, false
]

function ticktacktoe(userIO) {
    let winPositionTriggered = false;
    let players = ["x", "y"];
    let playersAmount = players.length;
    let currentTurn = 0;
    do {
        currentTurn = computeTurn(currentTurn, playersAmount);
        console.log({currentTurn})

        // interact with user
        const userTurnOutput = userIO(currentTurn);
        setTurnResult(userTurnOutput, players[currentTurn-1]);

        console.log('Your turn is ' + userTurnOutput);
        console.log('==============================');
        console.log(JSON.stringify(currentGamePositions))
        console.log('==============================');
        

        winPositionTriggered = checkWin(currentGamePositions, winPositions, players);
        
        console.log(winPositionTriggered)
    } while (currentGamePositions.includes(false) && !winPositionTriggered);
}

function terminalIO(currentTurn) {
    let output = 0;
    console.log("Playin user: " + currentTurn);

    output = Number(readlineSync.question('Your next turn ? '));
    return output;
}


function computeTurn(currentTurn, playersAmount) {
    playersAmount !== currentTurn ? ++currentTurn : currentTurn = 1;
    return currentTurn;
}

function checkWin(currentGamePositions, winPositions, players) {
    let matches = false; 
    let i = 0;

    do {
        const winPosition = winPositions[i]

        players.forEach((player) => {
            let playerMathes = 0;
            currentGamePositions.forEach((currentGamePosition, index) => {
                if (currentGamePosition === player && winPosition[index] !== false) {
                    ++playerMathes;
                }

                if (playerMathes === 3) {
                    matches = true
                }
            })
        })

        ++i
    } while (winPositions.length > i && !matches);

    return matches;
}

function setTurnResult(position, player){
    currentGamePositions[position] = player;
}

ticktacktoe(terminalIO);