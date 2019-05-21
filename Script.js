// function InsertCell() {
//     // let width=parseInt(prompt('Input Width: '));
//     // let height=parseInt(prompt('Input Height: '));
//     let cell='';
//     for (let i=0;i<10;i++){
//         for (let j=0;j<10;j++){
//             let top = i*40;
//             let left= j*40;
//             cell='<div class="cell" style="position: absolute; width: 50px; height:40px; left: '+left+'px; top: '+top+'px; line-height: 40px;"></div>';
//             document.getElementById('game-board').innerHTML+=cell;
//         }
//     }
//     }
// let width=parseInt(prompt('Nhap so cot:'));
// let height=parseInt(prompt('nhap so hang:'));
const value_empty = 1;
const valueX = 2;
const valueO = 3;
const cell_size = 50;
var Cell = function (x, y) {
    this.x = x;
    this.y = y;
    this.value = value_empty;
    this.gethtml = function () {
        let top = this.x * cell_size;
        let left = this.y * cell_size;
        let cellHtml = '<div id="cell-' + x + '-' + y + '" onclick="play(' + x + ',' + y + ')" class="cell" style="position: absolute; width: ' +
            +cell_size + 'px; height:' + cell_size + 'px; left: ' + left + 'px; top: ' + top + 'px; line-height: ' + cell_size + 'px;"></div>'
        return cellHtml;
    };
    this.draw = function () {
        switch (this.value) {
            case valueX:
                document.getElementById('cell-' + x + '-' + y).innerHTML = 'X';
                break;
            case valueO:
                document.getElementById('cell-' + x + '-' + y).innerHTML = 'O';
                break;
            default:
                document.getElementById('cell-' + x + '-' + y).innerHTML = '';
                break;
        }
    }
};
var GameBoard = function (rows, cols, name) {
    this.cols = cols;
    this.rows = rows;
    this.name = name;
    this.turn = valueX;
    this.cells = [];
    this.cellsvalue = []
    this.isOver = false;
    this.draw = function () {
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            this.cells.push(row);
            for (let j = 0; j < this.cols; j++) {
                let cell = new Cell(i, j);
                row.push(cell);
                document.getElementById(this.name).innerHTML += cell.gethtml();
            }
        }
    };
    this.play = function (x, y) {
        if (this.isOver){
            return
        }else {
            let cell = this.cells[x][y];
            if (cell.value === value_empty) {
                cell.value = this.turn;
                cell.draw();
                this.check(x, y);
                if (this.turn === valueX) {
                    this.turn = valueO;
                } else {
                    this.turn = valueX;
                }
            } else {
                alert('Cell is not empty')
            }
        }
    };
    this.check = function (x, y) {
        var cell = this.cells[x][y].value;
        var i = 1;
        var count = 1;
        while ((y + i < this.cols) && this.cells[x][y + i].value === cell) {
            count++;
            i++;
        }
        i = 1;
        while ((y - i >= 0) && this.cells[x][y - i].value === cell) {
            count++;
            i++;
        }
        this.endGame(count, cell);
        count = 1;
        i = 1;
        while ((x + i < this.rows) && this.cells[x + i][y].value === cell) {
            count++;
            i++;
        }
        i = 1;
        while ((x - i >= 0) && this.cells[x - i][y].value === cell) {
            count++;
            i++
        }
        this.endGame(count, cell);
        count = 1;
        i = 1;
        var j = 1;
        while ((x + i < this.rows) && (y + j < this.cols) && this.cells[x + i][y + j].value === cell) {
            count++;
            i++;
            j++;
        }
        i = 1;
        j = 1;
        while ((x - i >= 0) && (y - j >= 0) && this.cells[x - i][y - j].value === cell) {
            count++;
            i++;
            j++;
        }
        this.endGame(count, cell);
        count = 1;
        i = 1;
        j = 1;
        while ((x + i < this.rows) && (y - j >= 0) && this.cells[x + i][y - j].value === cell) {
            count++;
            i++;
            j++;
        }
        i = 1;
        j = 1;
        while ((x + i >= 0) && (y - j < this.cols) && this.cells[x - i][y + j].value === cell) {
            count++;
            i++;
            j++;
        }
        this.endGame(count, cell)
    };
    this.endGame = function (count, cell) {
        if (count >= 5) {
            if (cell === valueX) {
                alert('X win');
            } else if (cell === valueO) {
                alert('O win')
            }
            this.isOver=true;
        }
    }
};``


function play(x, y) {
    Game.play(x, y);
}
let rows=parseInt(prompt('Nhap so hang '));
let cols=parseInt(prompt('Nhap so cot '));
var Game = new GameBoard(rows, cols, 'game-board');
Game.draw();
