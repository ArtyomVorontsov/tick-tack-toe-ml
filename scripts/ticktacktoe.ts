let { defaultPositions, winPositions, strategies } = require('./gamePositions');
let readlineSync = require('readline-sync');


interface TickTackToe {
    getCurrentGamePositions: (string | boolean)[]
    getPlayers: string[];
    getPlayersAmount: number;
    getCurrentPlayer: number;

    isGameEnded(): boolean;
    makeMove(userMove: number): void;
}

class TickTackToeImpl implements TickTackToe {
    private winPositionTriggered: boolean = false;
    private currentGamePositions: (string | boolean)[];
    private players: string[];
    private playersAmount: number;
    private currentPlayer: number = 0;

    constructor(
        defaultPositions: string[],
        players: string[] = ["x", "y"]
    ) {
        this.currentGamePositions = [...defaultPositions]
        this.players = players;
        this.playersAmount = players.length;
    }

    public get getCurrentGamePositions(): (string | boolean)[] {
        return this.currentGamePositions;
    }

    public get getPlayers(): string[] {
        return this.players;
    }

    public get getCurrentPlayer(): number {
        return this.currentPlayer
    }

    public get getPlayersAmount(): number {
        return this.playersAmount;
    }

    public isGameEnded(): boolean {
        return !this.currentGamePositions.includes(false) || this.winPositionTriggered;
    }

    public makeMove(userMove: number): void {
        if (this.currentGamePositions.includes(false) && !this.winPositionTriggered) {
            this.currentPlayer = this.computeMove(this.currentPlayer, this.playersAmount);

            // interact with user
            this.setMoveResult(userMove, this.players[this.currentPlayer - 1]);
            this.winPositionTriggered = this.checkWin(this.currentGamePositions, winPositions, this.players);
        }
    }

    private computeMove(currentPlayer: number, playersAmount: number) {
        playersAmount !== currentPlayer ? ++currentPlayer : currentPlayer = 1;
        return currentPlayer;
    }

    private setMoveResult(
        position: number,
        playerSymbol: string
    ) {
        this.currentGamePositions[position] = playerSymbol;
    }

    private checkWin(
        currentGamePositions: (string | boolean)[],
        winPositions: Array<boolean[]>,
        players: string[]
    ) {
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
}

function terminalIO(tickTackToe: TickTackToe): void {
    let isGameEnded = false;
    do {
        let currentPlayer = tickTackToe.getCurrentPlayer;
        console.log("Playing user: " + currentPlayer);
        let userOutput = Number(readlineSync.question('Your next turn ? '));

        tickTackToe.makeMove(userOutput);

        console.log('Your turn is ' + userOutput);
        console.log('==============================');
        console.log(JSON.stringify(tickTackToe.getCurrentGamePositions))
        console.log('==============================');
        isGameEnded = tickTackToe.isGameEnded();
        console.log(isGameEnded)
    } while (!isGameEnded);
}

type Strategies = Array<Array<Array<string | boolean>>>

class Bot {

    private currentStrategyId: number;
    private currentMove: number;

    constructor(
        private botSymbol: string,
        private secondPlayerSymbol: string,
        private strategies: Strategies
    ) { }

    makeMove(currentPositions: (string | boolean)[]): (string | boolean)[] {
        const strategyIsActual = this.checkIsStrategyIsActual(this.currentStrategyId, currentPositions)
        if (strategyIsActual) {
            this.computeCurrentMove(currentPositions);
            const strategyNextMove = strategies[this.currentStrategyId][this.currentMove + 1];
            return this.fillStrategyWithPlayerSymbols(strategyNextMove, this.botSymbol, this.secondPlayerSymbol);
            
        } else {
            this.currentStrategyId = this.chooseStategy()
            if (this.currentStrategyId) {
                this.makeRandomMove();
            }
        }
    }

    chooseStategy(): number {
        return 0;
    }

    checkIsStrategyIsActual(
        strategyId: number,
        currentPositions: (string | boolean)[]
    ): boolean {
        return true
    }

    makeRandomMove(): void {

    }

    computeCurrentMove(currentPositions: (string | boolean)[]) {
        let moves = currentPositions.filter((position) => {
            if (position) {
                return true;
            }
        })

        this.currentMove = moves.length;
    }

    fillStrategyWithPlayerSymbols(
        strategy: (string | boolean)[],
        botSymbol: string,
        secondPlayerSymbol: string
    ) {

        const filledStrategy = strategy.map((strategySymbol: string) => {
            if (strategySymbol === "w") {
                return botSymbol
            } 
            else if (strategySymbol === "l") {
                return secondPlayerSymbol
            } 
            else {
                return false
            }
        })

        return filledStrategy;
    }
}

const ticktacktoe = new TickTackToeImpl(defaultPositions, ["x", "y"]);
terminalIO(ticktacktoe);