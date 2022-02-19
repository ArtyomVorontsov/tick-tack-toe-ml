var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a = require('./gamePositions'), defaultPositions = _a.defaultPositions, winPositions = _a.winPositions;
var readlineSync = require('readline-sync');
var fs = require('fs');
var TickTackToeImpl = /** @class */ (function () {
    function TickTackToeImpl(defaultPositions, players) {
        if (players === void 0) { players = ["x", "y"]; }
        this.winPositionTriggered = false;
        this.currentPlayer = 0;
        this.winnerSymbol = null;
        this.currentGamePositions = __spreadArray([], defaultPositions, true);
        this.players = players;
        this.playersAmount = players.length - 1;
    }
    Object.defineProperty(TickTackToeImpl.prototype, "getCurrentGamePositions", {
        get: function () {
            return this.currentGamePositions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TickTackToeImpl.prototype, "getPlayers", {
        get: function () {
            return this.players;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TickTackToeImpl.prototype, "getCurrentPlayer", {
        get: function () {
            return this.currentPlayer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TickTackToeImpl.prototype, "getPlayersAmount", {
        get: function () {
            return this.playersAmount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TickTackToeImpl.prototype, "getWinnerSymbol", {
        get: function () {
            return this.winnerSymbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TickTackToeImpl.prototype, "setWinnerSymbol", {
        set: function (winnerSymbol) {
            this.winnerSymbol = winnerSymbol;
        },
        enumerable: false,
        configurable: true
    });
    TickTackToeImpl.prototype.isGameEnded = function () {
        return !this.currentGamePositions.includes(false) || this.winPositionTriggered;
    };
    TickTackToeImpl.prototype.makeMove = function (userMove) {
        if (this.currentGamePositions.includes(false) && !this.winPositionTriggered) {
            this.setMove(userMove, this.players[this.currentPlayer]);
            this.winPositionTriggered = this.checkWin(this.currentGamePositions, winPositions, this.players);
            if (this.winPositionTriggered) {
                this.setWinnerSymbol = this.players[this.currentPlayer];
            }
            this.computeNextPlayer(this.currentPlayer, this.playersAmount);
        }
    };
    TickTackToeImpl.prototype.computeNextPlayer = function (currentPlayer, playersAmount) {
        playersAmount <= currentPlayer ? this.currentPlayer = 0 : this.currentPlayer = currentPlayer + 1;
    };
    TickTackToeImpl.prototype.setMove = function (position, playerSymbol) {
        this.currentGamePositions[position] = playerSymbol;
    };
    TickTackToeImpl.prototype.checkWin = function (currentGamePositions, winPositions, players) {
        var matches = false;
        var i = 0;
        var _loop_1 = function () {
            var winPosition = winPositions[i];
            players.forEach(function (player) {
                var playerMathes = 0;
                currentGamePositions.forEach(function (currentGamePosition, index) {
                    if (currentGamePosition === player && winPosition[index] !== false) {
                        ++playerMathes;
                    }
                    if (playerMathes === 3) {
                        matches = true;
                    }
                });
            });
            ++i;
        };
        do {
            _loop_1();
        } while (winPositions.length > i && !matches);
        return matches;
    };
    return TickTackToeImpl;
}());
function terminalIO(tickTackToe, learningModule, botPlayer, botPlayerId) {
    if (botPlayerId === void 0) { botPlayerId = 0; }
    var isGameEnded = false;
    do {
        var currentPlayer = tickTackToe.getCurrentPlayer;
        console.log("Playing user: " + currentPlayer);
        if (currentPlayer === botPlayerId) {
            var botOutput = botPlayer.makeMove(tickTackToe.getCurrentGamePositions);
            tickTackToe.makeMove(botOutput.moveIndex);
            console.log('Bot turn is ' + botOutput.moveIndex);
            console.log('==============================');
            console.log("\n                ".concat(JSON.stringify(tickTackToe.getCurrentGamePositions.slice(0, 3)), "\n\n                ").concat(JSON.stringify(tickTackToe.getCurrentGamePositions.slice(3, 6)), "\n\n                ").concat(JSON.stringify(tickTackToe.getCurrentGamePositions.slice(6, 9)), "\n\n                "));
            console.log('==============================');
            learningModule.setPosition(__spreadArray([], tickTackToe.getCurrentGamePositions, true));
        }
        else {
            var userOutput = Number(readlineSync.question('Your next turn ? '));
            tickTackToe.makeMove(userOutput);
            console.log('Your turn is ' + userOutput);
            console.log('==============================');
            console.log("\n                ".concat(JSON.stringify(tickTackToe.getCurrentGamePositions.slice(0, 3)), "\n\n                ").concat(JSON.stringify(tickTackToe.getCurrentGamePositions.slice(3, 6)), "\n\n                ").concat(JSON.stringify(tickTackToe.getCurrentGamePositions.slice(6, 9)), "\n\n                "));
            console.log('==============================');
            learningModule.setPosition(__spreadArray([], tickTackToe.getCurrentGamePositions, true));
        }
        isGameEnded = tickTackToe.isGameEnded();
        console.log(isGameEnded);
    } while (!isGameEnded);
    learningModule.setPosition(__spreadArray([], tickTackToe.getCurrentGamePositions, true));
    var winnerSymbol = tickTackToe.getWinnerSymbol;
    console.log(winnerSymbol);
    winnerSymbol && learningModule.saveStrategy(winnerSymbol);
}
var Bot = /** @class */ (function () {
    function Bot(botSymbol, secondPlayerSymbol, strategies) {
        this.botSymbol = botSymbol;
        this.secondPlayerSymbol = secondPlayerSymbol;
        this.strategies = strategies;
        this.currentStrategyId = null;
    }
    Bot.prototype.makeMove = function (currentPositions) {
        var strategyNextMove = [];
        currentPositions = this.fillCurrentPositionsWithStrategySymbols(currentPositions, this.botSymbol, this.secondPlayerSymbol);
        var currentMove = this.computeCurrentMove(currentPositions);
        // Statement below executes on bot first move 
        if (this.currentStrategyId === null) {
            this.currentStrategyId = this.chooseStategy(currentPositions, currentMove);
        }
        console.log({
            currentStrategyId: this.currentStrategyId, csid: !!this.currentStrategyId,
            currentMove: currentMove,
            currentPositions: currentPositions,
            botSymbol: this.botSymbol,
            secondPlayerSymbol: this.secondPlayerSymbol
        });
        var strategyIsActual = this.currentStrategyId !== null && this.checkStrategyIsActual(this.currentStrategyId, currentMove, currentPositions);
        if (strategyIsActual) {
            strategyNextMove = this.strategies[this.currentStrategyId][currentMove + 1];
        }
        else {
            this.currentStrategyId = this.chooseStategy(currentPositions, currentMove);
            if (this.currentStrategyId === null) {
                strategyNextMove = this.makeRandomMove(currentPositions);
            }
            else {
                strategyNextMove = this.makeMove(currentPositions).gamePositions;
            }
        }
        return {
            gamePositions: this.fillStrategyWithPlayerSymbols(strategyNextMove, this.botSymbol, this.secondPlayerSymbol),
            moveIndex: this.getMoveIndex(currentPositions, strategyNextMove)
        };
    };
    Bot.prototype.chooseStategy = function (currentPositions, currentMove) {
        var newStrategyId = null;
        this.strategies.forEach(function (strategy, index) {
            var strategyMatched = true;
            // Strategy is shorter than current game, so it cant be mathed.
            if (strategy[currentMove] === undefined) {
                strategyMatched = false;
            }
            strategy[currentMove] && strategy[currentMove].forEach(function (strategyPosition, index) {
                if (strategyPosition !== currentPositions[index]) {
                    strategyMatched = false;
                }
            });
            if (strategyMatched)
                newStrategyId = index;
        });
        return newStrategyId;
    };
    Bot.prototype.checkStrategyIsActual = function (strategyId, currentMove, currentPositions) {
        var strategyIsActual = true;
        var currentStrategyPositions = this.strategies[strategyId][currentMove];
        currentPositions.forEach(function (position, index) {
            if (position !== currentStrategyPositions[index]) {
                strategyIsActual = false;
            }
            ;
        });
        return strategyIsActual;
    };
    Bot.prototype.makeRandomMove = function (currentPositions) {
        var availablePositions = [];
        currentPositions.forEach(function (position, index) {
            if (!position) {
                availablePositions.push(index);
            }
        });
        console.log({ availablePositions: availablePositions });
        var randomIndex = Math.abs(Math.round(Math.random() * availablePositions.length - 1));
        var randomAvailablePositionIndex = availablePositions[randomIndex];
        var newPositions = __spreadArray([], currentPositions, true);
        // Make move
        newPositions[randomAvailablePositionIndex] = 'w';
        console.log({
            newPositions: newPositions
        });
        return newPositions;
    };
    Bot.prototype.computeCurrentMove = function (currentPositions) {
        var moves = currentPositions.filter(function (position) {
            if (position) {
                return true;
            }
        });
        return moves.length;
    };
    Bot.prototype.fillCurrentPositionsWithStrategySymbols = function (currentPositions, botSymbol, secondPlayerSymbol) {
        var filledStrategy = currentPositions.map(function (playerSymbol) {
            if (playerSymbol === botSymbol) {
                return "w";
            }
            else if (playerSymbol === secondPlayerSymbol) {
                return "l";
            }
            else {
                return false;
            }
        });
        return filledStrategy;
    };
    Bot.prototype.fillStrategyWithPlayerSymbols = function (strategy, botSymbol, secondPlayerSymbol) {
        var filledStrategy = strategy.map(function (strategySymbol) {
            if (strategySymbol === "w") {
                return botSymbol;
            }
            else if (strategySymbol === "l") {
                return secondPlayerSymbol;
            }
            else {
                return false;
            }
        });
        return filledStrategy;
    };
    Bot.prototype.getMoveIndex = function (currentGamePosition, nextGamePositions) {
        var moveIndex;
        currentGamePosition.forEach(function (position, index) {
            if (position !== nextGamePositions[index]) {
                moveIndex = index;
            }
        });
        return moveIndex;
    };
    return Bot;
}());
var LearningModuleImpl = /** @class */ (function () {
    function LearningModuleImpl() {
        this.strategy = [
            [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ]
        ];
    }
    LearningModuleImpl.prototype.setPosition = function (position) {
        this.strategy.push(position);
    };
    LearningModuleImpl.prototype.transformStrategy = function (winner) {
        // todo: avoid mutability for strategy array, 
        // create new array for transformedStrategy
        var transformedStrategy = [];
        this.strategy.forEach(function (positions, i) {
            var transformedPositions = new Array(9);
            positions.forEach(function (position, j) {
                if (position === winner) {
                    transformedPositions[j] = "w";
                }
                else if (position !== false) {
                    transformedPositions[j] = "l";
                }
                else {
                    transformedPositions[j] = false;
                }
            });
            transformedStrategy.push(transformedPositions);
        });
        return transformedStrategy;
    };
    LearningModuleImpl.prototype.saveStrategy = function (winner) {
        console.log(winner);
        console.log(this.strategy);
        var allStrategies = fs.readFileSync('strategy.json', 'utf8');
        allStrategies = JSON.parse(allStrategies);
        var transformedStrategy = this.transformStrategy(winner);
        allStrategies.push(transformedStrategy);
        var allStrategiesJson = JSON.stringify(allStrategies);
        fs.writeFile('strategy.json', allStrategiesJson, function (err) {
            if (err)
                return console.log(err);
            console.log('Strategy saved!');
        });
    };
    return LearningModuleImpl;
}());
// Startup ticktacktoe game and learning module
var ticktacktoe = new TickTackToeImpl(defaultPositions, ["x", "y"]);
var learningModule = new LearningModuleImpl();
// Load all strategies
var allStrategies = fs.readFileSync('strategy.json', 'utf8');
allStrategies = JSON.parse(allStrategies);
console.log("Amount of loaded strategies:" + allStrategies.length);
// Startup bot
var botPlayerId = 1;
var botPlayer = new Bot('y', 'x', allStrategies);
// Start terminal game
terminalIO(ticktacktoe, learningModule, botPlayer, botPlayerId);
//# sourceMappingURL=ticktacktoe.js.map