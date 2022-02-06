const { defaultPositions, winPositions, strategies } = require('./gamePositions');
const readlineSync = require('readline-sync');
const fs = require('fs');


interface TickTackToe {
    getCurrentGamePositions: (string | boolean)[]
    getPlayers: string[];
    getPlayersAmount: number;
    getCurrentPlayer: number;
    getWinnerSymbol: string | null

    isGameEnded(): boolean;
    makeMove(userMove: number): void;
}

class TickTackToeImpl implements TickTackToe {
    private winPositionTriggered: boolean = false;
    private currentGamePositions: (string | boolean)[];
    private players: string[];
    private playersAmount: number;
    private currentPlayer: number = 0;
    private winnerSymbol: string | null = null

    constructor(
        defaultPositions: string[],
        players: string[] = ["x", "y"]
    ) {
        this.currentGamePositions = [...defaultPositions]
        this.players = players;
        this.playersAmount = players.length - 1;
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

    public get getWinnerSymbol(): string | null {
        return this.winnerSymbol;
    }

    private set setWinnerSymbol(winnerSymbol: string) {
        this.winnerSymbol = winnerSymbol;
    }

    public isGameEnded(): boolean {
        return !this.currentGamePositions.includes(false) || this.winPositionTriggered;
    }

    public makeMove(userMove: number): void {
        if (this.currentGamePositions.includes(false) && !this.winPositionTriggered) {
            this.setMove(userMove, this.players[this.currentPlayer]);
            this.winPositionTriggered = this.checkWin(this.currentGamePositions, winPositions, this.players);
            if (this.winPositionTriggered) {
                this.setWinnerSymbol = this.players[this.currentPlayer];
            }
            this.computeNextPlayer(this.currentPlayer, this.playersAmount);
        }
    }

    private computeNextPlayer(currentPlayer: number, playersAmount: number) {
        playersAmount <= currentPlayer ? this.currentPlayer = 0 : this.currentPlayer = currentPlayer + 1;
    }

    private setMove(
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

function terminalIO(tickTackToe: TickTackToe, learningModule: LearningModuleImpl): void {
    let isGameEnded = false;
    const botPlayerId = 0;
    const botPlayer = new Bot('x', 'y', strategies);
    do {
        let currentPlayer = tickTackToe.getCurrentPlayer;

        console.log("Playing user: " + currentPlayer);
        if (currentPlayer === botPlayerId) {
            let botOutput = botPlayer.makeMove(tickTackToe.getCurrentGamePositions);
            tickTackToe.makeMove(botOutput.moveIndex);
            console.log('Bot turn is ' + botOutput.moveIndex);
            console.log('==============================');
            console.log(
                `
                ${JSON.stringify(tickTackToe.getCurrentGamePositions.slice(0, 3))}\n
                ${JSON.stringify(tickTackToe.getCurrentGamePositions.slice(3, 6))}\n
                ${JSON.stringify(tickTackToe.getCurrentGamePositions.slice(6, 9))}\n
                `
            )
            console.log('==============================');

            learningModule.setPosition([...tickTackToe.getCurrentGamePositions]);
        } else {
            let userOutput = Number(readlineSync.question('Your next turn ? '));
            tickTackToe.makeMove(userOutput);
            console.log('Your turn is ' + userOutput);
            console.log('==============================');
            console.log(
                `
                ${JSON.stringify(tickTackToe.getCurrentGamePositions.slice(0, 3))}\n
                ${JSON.stringify(tickTackToe.getCurrentGamePositions.slice(3, 6))}\n
                ${JSON.stringify(tickTackToe.getCurrentGamePositions.slice(6, 9))}\n
                `
            )
            console.log('==============================');
            learningModule.setPosition([...tickTackToe.getCurrentGamePositions]);
        }

        isGameEnded = tickTackToe.isGameEnded();
        console.log(isGameEnded)
    } while (!isGameEnded);

    learningModule.setPosition([...tickTackToe.getCurrentGamePositions]);
    const winnerSymbol = tickTackToe.getWinnerSymbol;
    console.log(winnerSymbol)
    winnerSymbol && learningModule.saveStrategy(winnerSymbol);
}

type Strategies = Array<Array<Array<string | boolean>>>
type GamePositions = (string | boolean)[];

class Bot {

    private currentStrategyId: number | null = null;
    private currentMove: number;

    constructor(
        private botSymbol: string,
        private secondPlayerSymbol: string,
        private strategies: Strategies
    ) { }

    makeMove(currentPositions: GamePositions): { gamePositions: GamePositions, moveIndex: number } {
        let strategyNextMove: GamePositions = [];
        currentPositions = this.fillCurrentPositionsWithStrategySymbols(currentPositions, this.botSymbol, this.secondPlayerSymbol);

        const currentMove = this.computeCurrentMove(currentPositions);

        // Statement below executes on bot first move 
        if (this.currentStrategyId === null) {
            this.currentStrategyId = this.chooseStategy(currentPositions, currentMove)
        }

        console.log({
            currentStrategyId: this.currentStrategyId, csid: !!this.currentStrategyId,
            currentMove, currentPositions, botSymbol: this.botSymbol,
            secondPlayerSymbol: this.secondPlayerSymbol
        });
        const strategyIsActual = this.currentStrategyId !== null && this.checkStrategyIsActual(this.currentStrategyId, currentMove, currentPositions)

        if (strategyIsActual) {
            strategyNextMove = this.strategies[this.currentStrategyId][currentMove + 1];

        } else {
            this.currentStrategyId = this.chooseStategy(currentPositions, currentMove)
            if (this.currentStrategyId === null) {
                strategyNextMove = this.makeRandomMove(currentPositions);
            } else {
                strategyNextMove = this.makeMove(currentPositions).gamePositions
            }
        }

        return {
            gamePositions: this.fillStrategyWithPlayerSymbols(strategyNextMove, this.botSymbol, this.secondPlayerSymbol),
            moveIndex: this.getMoveIndex(currentPositions, strategyNextMove)
        };
    }

    chooseStategy(currentPositions: GamePositions, currentMove: number): number | null {
        let newStrategyId = null;
        this.strategies.forEach((strategy, index) => {
            let strategyMatched = true;
            // Strategy is shorter than current game, so it cant be mathed.
            if (strategy[currentMove] === undefined) {
                strategyMatched = false;
            }
            strategy[currentMove] && strategy[currentMove].forEach((strategyPosition, index) => {
                if (strategyPosition !== currentPositions[index]) {
                    strategyMatched = false;
                }
            })
            if (strategyMatched) newStrategyId = index;
        })

        return newStrategyId;
    }

    checkStrategyIsActual(
        strategyId: number,
        currentMove: number,
        currentPositions: GamePositions
    ): boolean {
        let strategyIsActual = true;
        const currentStrategyPositions = this.strategies[strategyId][currentMove];

        currentPositions.forEach((position, index) => {
            if (position !== currentStrategyPositions[index]) {
                strategyIsActual = false;
            };
        })

        return strategyIsActual;
    }

    makeRandomMove(currentPositions: GamePositions): GamePositions {
        const availablePositions: number[] = [];
        currentPositions.forEach((position, index) => {
            if (!position) {
                availablePositions.push(index)
            }
        })
        console.log({ availablePositions })
        const randomIndex = Math.abs(Math.round(Math.random() * availablePositions.length - 1));

        const randomAvailablePositionIndex = availablePositions[randomIndex];
        const newPositions = [...currentPositions]

        // Make move
        newPositions[randomAvailablePositionIndex] = 'w';

        console.log({
            newPositions
        })
        return newPositions;
    }

    computeCurrentMove(currentPositions: GamePositions): number {
        let moves = currentPositions.filter((position) => {
            if (position) {
                return true;
            }
        })

        return moves.length
    }

    fillCurrentPositionsWithStrategySymbols(
        currentPositions: GamePositions,
        botSymbol: string,
        secondPlayerSymbol: string
    ) {
        const filledStrategy = currentPositions.map((playerSymbol: string) => {
            if (playerSymbol === botSymbol) {
                return "w"
            }
            else if (playerSymbol === secondPlayerSymbol) {
                return "l"
            }
            else {
                return false
            }
        })

        return filledStrategy;
    }

    fillStrategyWithPlayerSymbols(
        strategy: GamePositions,
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


    getMoveIndex(currentGamePosition: GamePositions, nextGamePositions: GamePositions): number {
        let moveIndex: number;
        currentGamePosition.forEach((position, index) => {
            if (position !== nextGamePositions[index]) {
                moveIndex = index;
            }
        })

        return moveIndex;
    }
}

interface LearningModule {
    setPosition(position: (string | boolean)[]): void;
    saveStrategy(winner: string): void;
}

class LearningModuleImpl implements LearningModule {

    private strategy: (boolean | string)[][] = [
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
    ]

    setPosition(position: (string | boolean)[]): void {
        this.strategy.push(position);
    }

    private transformStrategy(winner: string): (string | boolean)[][] {
        // todo: avoid mutability for strategy array, 
        // create new array for transformedStrategy
        const transformedStrategy = [];
        this.strategy.forEach((positions, i) => {
            const transformedPositions = new Array(9);
            positions.forEach((position, j) => {
                if (position === winner) {
                    transformedPositions[j] = "w"
                } else if (position !== false) {
                    transformedPositions[j] = "l"
                } else {
                    transformedPositions[j] = false
                }
            })
            transformedStrategy.push(transformedPositions);
        })

        return transformedStrategy;
    }

    saveStrategy(winner: string): void {
        console.log(winner)
        console.log(this.strategy)

        let allStrategies = fs.readFileSync('strategy.json', 'utf8');
        allStrategies = JSON.parse(allStrategies);
        const transformedStrategy = this.transformStrategy(winner)

        allStrategies.push(transformedStrategy)
        const allStrategiesJson = JSON.stringify(allStrategies);

        fs.writeFile('strategy.json', allStrategiesJson, function (err) {
            if (err) return console.log(err);
            console.log('Strategy saved!');
        });
    }
}

const ticktacktoe = new TickTackToeImpl(defaultPositions, ["x", "y"]);
const learningModule = new LearningModuleImpl();

terminalIO(ticktacktoe, learningModule);