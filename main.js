

class Board {
   
   /**
    * Creates a n x n size tic-tac-toe board.
    **/ 
    
    constructor(n) {   
        this.nSize = n;
        this.grid = Array(n).fill().map(() => Array(n).fill(null));
    }

    placeMarker(type, location) {
        
        /**
         * Parameters:
         *  type: string, either 'x' or 'o'
         *  location: Object
         **/

        if (Object.keys(location).length < 2 || !'x' in location || !'y' in location) {
            throw new TypeError("Incorrect location specification. Must pass location param as {x: number, y: number}");
        }

        if (type === "x" || type === "o") {
            this.grid[location.x][location.y] = type.toUpperCase();
        } else {
            throw new TypeError("Incorrect type param specification. Must specify either 'x' or 'o'.");
        }
    } 

    checkRowsForWin() {

        for (const row of this.grid) {
            let xCount = 0, oCount = 0;
            row.forEach((elem) => {

                if (!elem)
                    return

                if (elem.toUpperCase() == 'X')
                    xCount++;
                else if (elem.toUpperCase() === 'O')
                    oCount++;
            });

            const xWin = (xCount === this.nSize);
            const oWin = (oCount === this.nSize);

            if (xWin)
                return "X";
            else if (oWin) 
                return "O";
        };
        return false;
    }
    
    checkColsForWin() {
        for (let i = 0; i < this.nSize; i++) {
            let xCount = 0, oCount = 0;
            for (let j = 0; j < this.nSize; j++) {
                let curr = this.grid[j][i];
                    if (!curr)
                        continue;
                    if (curr.toUpperCase() === 'X')
                        xCount++;
                    else if (curr.toUpperCase() === 'O')
                        oCount++;
            }
            const xWin = (xCount === this.nSize);
            const oWin = (oCount === this.nSize);

            if (xWin)
                return "X";
            else if (oWin) 
                return "O";
        }
        return false;
    }

    checkDiagonalForWin() {
        // check diagonals in two passes
        // (top-down left-to-right)
        let i = 0, j = 0;
        let xCount = 0, oCount = 0;
        while (i < this.nSize && j < this.nSize) {
            let curr = this.grid[i][j]
            if (!curr) {
                i++;
                j++;
                continue;
            }

            if (curr.toUpperCase() === "X")
                xCount++;
            else if (curr.toUpperCase() === "O")
                oCount++;
            i++;
            j++;
        }

        let xWin = (xCount === this.nSize);
        let oWin = (oCount === this.nSize);

        if (xWin)
            return "X";
        else if (oWin) 
            return "O";

        // (top-down right-to-left)
        i = 0;
        j = this.nSize - 1;
        xCount = 0, oCount = 0;
        while ( i < this.nSize && j >= 0) {
            let curr = this.grid[i][j]
            if (!curr) {
                i++;
                j--;
                continue;
            }

            if (curr === 'X')
                xCount++;
            else if (curr === 'O')
                oCount++;
            i++;
            j--;
        }

        xWin = (xCount === this.nSize);
        oWin = (oCount === this.nSize);

        if (xWin)
            return "X";
        else if (oWin) 
            return "O";

        return false;
    }

    checkWin() {

        const players = ["X", "O"];
        

        for (const player of players) {
            
            if (this.checkRowsForWin() === player || this.checkColsForWin() === player || this.checkDiagonalForWin() === player) {
                console.log(`${player} is the winner!`);
                return true
            }
        }   

        return false;
    }

    clearBoard() {
        for (let i = 0; i < this.nSize; i++) {
            for (let j = 0; j < this.nSize; j++) {
                this.grid[i][j] = null;
            }
        }    
    }
    
    toString() {
        let res = "[\n";

        this.grid.forEach((row) => {
            res += "    ";
            row.forEach((elem) => {
                res += elem + ",";
            });
            res += "\n";
        });
        res += "]";
        return res;
    }
}


function main() {
    const board = new Board(4);
    board.placeMarker('x', {x: 1, y: 3});
    console.log(`Board after placing X at [1,3]:\n${board}`);
    console.log(board.checkWin());

    console.log("Now placing markers for O to win, and checking win condition.");
    board.placeMarker('o', {x: 0, y: 3});
    board.placeMarker('o', {x: 1, y: 2});
    board.placeMarker('o', {x: 2, y: 1});
    board.placeMarker('o', {x: 3, y: 0});
    console.log(`Board:\n${board}`);
    console.log(board.checkWin());


    console.log("Now clearing board, and placing markers for X to win, and checking win condition.");
    board.clearBoard();
    board.placeMarker('x', {x: 1, y: 0});
    board.placeMarker('x', {x: 1, y: 1});
    board.placeMarker('x', {x: 1, y: 2});
    board.placeMarker('x', {x: 1, y: 3});
    console.log(`Board:\n${board}`);
    console.log(board.checkWin());
}

main();
