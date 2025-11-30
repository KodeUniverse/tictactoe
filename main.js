

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

            console.log(Object.keys(location).length);
            console.log(location);
            throw new TypeError("Incorrect location specification. Must pass location param as {x: number, y: number}");
        }

        if (type === "x" || type === "o") {
            this.grid[location.x][location.y] = type.toUpperCase();
        } else {
            throw new TypeError("Incorrect type param specification. Must specify either 'x' or 'o'.");
        }
    } 
    
    checkWin() {
        // check row-wise
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
            console.log(`xCount = ${xCount}, oCount = ${oCount}, nSize = ${this.nSize}`);
            if (xCount == this.nSize || oCount == this.nSize)
                return true;
        };
        console.log('Row-wise pass completed!');
        // check column-wise
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

            console.log(`xCount = ${xCount}, oCount = ${oCount}, nSize = ${this.nSize}`);
            if (xCount === this.nSize || oCount === this.nSize)
                return true;
        }

        console.log('Column-wise pass completed!');
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
            console.log(`i = ${i}, j = ${j}`);
            i++;
            j++;
        }

        console.log('First diagonal pass completed!');
        console.log(`xCount = ${xCount}, oCount = ${oCount}, nSize = ${this.nSize}`);
        if (xCount === this.nSize || oCount === this.nSize)
            return true;

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
            console.log(`i = ${i}, j = ${j}`);
            i++;
            j--;
        }
        
        console.log('Second diagonal pass completed!');
        console.log(`xCount = ${xCount}, oCount = ${oCount}, nSize = ${this.nSize}`);
        if (xCount === this.nSize || oCount === this.nSize)
            return true;
        
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
    console.log(`Winning board ${board}`);
    console.log(board.checkWin());

}

main();
