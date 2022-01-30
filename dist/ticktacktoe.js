var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a = require('./gamePositions'), defaultPositions = _a.defaultPositions, winPositions = _a.winPositions, strategies = _a.strategies;
var readlineSync = require('readline-sync');
var TickTackToeImpl = /** @class */ (function () {
    function TickTackToeImpl(defaultPositions, players) {
        if (players === void 0) { players = ["x", "y"]; }
        this.winPositionTriggered = false;
        this.currentPlayer = 0;
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
    TickTackToeImpl.prototype.isGameEnded = function () {
        return !this.currentGamePositions.includes(false) || this.winPositionTriggered;
    };
    TickTackToeImpl.prototype.makeMove = function (userMove) {
        if (this.currentGamePositions.includes(false) && !this.winPositionTriggered) {
            // Interact with user
            this.setMove(userMove, this.players[this.currentPlayer]);
            this.computeNextPlayer(this.currentPlayer, this.playersAmount);
            this.winPositionTriggered = this.checkWin(this.currentGamePositions, winPositions, this.players);
        }
    };
    TickTackToeImpl.prototype.computeNextPlayer = function (currentPlayer, playersAmount) {
        console.log({ currentPlayer: currentPlayer, playersAmount: playersAmount });
        playersAmount <= currentPlayer ? this.currentPlayer = 0 : this.currentPlayer = currentPlayer + 1;
        console.log({ currentPlayer: this.currentPlayer, playersAmount: this.playersAmount });
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
function terminalIO(tickTackToe) {
    var isGameEnded = false;
    var botPlayerId = 0;
    var botPlayer = new Bot('x', 'y', strategies);
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
        }
        else {
            var userOutput = Number(readlineSync.question('Your next turn ? '));
            tickTackToe.makeMove(userOutput);
            console.log('Your turn is ' + userOutput);
            console.log('==============================');
            console.log("\n                ".concat(JSON.stringify(tickTackToe.getCurrentGamePositions.slice(0, 3)), "\n\n                ").concat(JSON.stringify(tickTackToe.getCurrentGamePositions.slice(3, 6)), "\n\n                ").concat(JSON.stringify(tickTackToe.getCurrentGamePositions.slice(6, 9)), "\n\n                "));
            console.log('==============================');
        }
        isGameEnded = tickTackToe.isGameEnded();
        console.log(isGameEnded);
    } while (!isGameEnded);
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
        console.log({ currentStrategyId: this.currentStrategyId, currentMove: currentMove, currentPositions: currentPositions });
        var strategyIsActual = this.checkStrategyIsActual(this.currentStrategyId, currentMove, currentPositions);
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
            strategy[currentMove].forEach(function (strategyPosition, index) {
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
        var randomIndex = Math.round(Math.random() * availablePositions.length - 1);
        var randomAvailablePositionIndex = availablePositions[randomIndex];
        var newPositions = __spreadArray([], currentPositions, true);
        //console.log({newPositions, randomAvailablePositionIndex, randomIndex, availablePositions})
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
var ticktacktoe = new TickTackToeImpl(defaultPositions, ["x", "y"]);
//const bot = new Bot('x', 'o', strategies);
//console.log(bot.makeMove([false, false, false, false, false, false, false, false, false]));
//console.log(bot.makeMove(['x', 'o', false, false, false, false, false, false, false]));
//console.log(bot.makeMove(['x', 'o', false, 'x', false, false,  'o', false, false]));
terminalIO(ticktacktoe);
//# sourceMappingURL=ticktacktoe.js.map