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
var TickTackToeImpl = /** @class */ (function () {
    function TickTackToeImpl(defaultPositions, players) {
        if (players === void 0) { players = ["x", "y"]; }
        this.winPositionTriggered = false;
        this.currentPlayer = 0;
        this.currentGamePositions = __spreadArray([], defaultPositions, true);
        this.players = players;
        this.playersAmount = players.length;
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
            this.currentPlayer = this.computeMove(this.currentPlayer, this.playersAmount);
            // interact with user
            this.setMoveResult(userMove, this.players[this.currentPlayer - 1]);
            this.winPositionTriggered = this.checkWin(this.currentGamePositions, winPositions, this.players);
        }
    };
    TickTackToeImpl.prototype.computeMove = function (currentPlayer, playersAmount) {
        playersAmount !== currentPlayer ? ++currentPlayer : currentPlayer = 1;
        return currentPlayer;
    };
    TickTackToeImpl.prototype.setMoveResult = function (position, playerSymbol) {
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
    do {
        var currentPlayer = tickTackToe.getCurrentPlayer;
        console.log("Playing user: " + currentPlayer);
        var userOutput = Number(readlineSync.question('Your next turn ? '));
        tickTackToe.makeMove(userOutput);
        console.log('Your turn is ' + userOutput);
        console.log('==============================');
        console.log(JSON.stringify(tickTackToe.getCurrentGamePositions));
        console.log('==============================');
        isGameEnded = tickTackToe.isGameEnded();
        console.log(isGameEnded);
    } while (!isGameEnded);
}
var ticktacktoe = new TickTackToeImpl(defaultPositions, ["x", "y"]);
terminalIO(ticktacktoe);
//# sourceMappingURL=ticktacktoe.js.map