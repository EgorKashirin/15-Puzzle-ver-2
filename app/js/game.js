let buttonReset = document.getElementById('reset');
function Game() { }
Game.prototype = {
    start: function () {
        this.grid = [[], [], [], []];
        this.fly_order = 0;
        this.steps_counter = 1;
        var _game = this,
            numbers = _.shuffle(_.range(1, 16));
        _.range(0, 4).map(function (x) {
            _.range(0, 4).map(function (y) {
                var number = numbers.pop();
                _game.grid[y].push(number);
                _game.drawTile(x, y, number);
                _game.fly_order++;
            })
        })
        _game.grid[3][3] = 0;
    },
    drawTile: function (x, y, num) {
        var _game = this,
            tile = $('<div>', {id: 'num'})
                .text(num)
                .click(function (e) { _game.tileClick(e); })
                .data('state', [x, y])
                .data('num', num)
                .css({ "top": 120, "left": 120 })
        $('#game').append(tile);
        setTimeout(function () {
            _game.updateTilePos(tile, x, y, num, true);
        }, 100 * this.fly_order);
    },
    updateTilePos: function (tile, x, y, num, fill) {
        tile.css({ "top": 8 + (y * 76), "left": 8 + (x * 76) }).data('state', [x, y]).data('num', num);
        if (!fill) {
            this.grid[x][y] = num;
            $('#steps').html(this.steps_counter++);
            WinCheck();
        }
    },
    tileClick: function (e) {
        var $tile = $(e.target),
            state = $tile.data('state'),
            num = $tile.data('num'),
            x = state[0], y = state[1];

        this.grid[x][y] = 0;

        if (this.grid[x + 1] != undefined && this.grid[x + 1][y] === 0) {
            this.updateTilePos($tile, x + 1, y, num);
        } else if (this.grid[x - 1] != undefined && this.grid[x - 1][y] === 0) {
            this.updateTilePos($tile, x - 1, y, num);
        } else if (this.grid[x] != undefined && this.grid[x][y + 1] === 0) {
            this.updateTilePos($tile, x, y + 1, num);
        } else if (this.grid[x] != undefined && this.grid[x][y - 1] === 0) {
            this.updateTilePos($tile, x, y - 1, num);
        } else {
            this.grid[x][y] = num;
            $tile.addClass('animated wobble');
            setTimeout(function () { $tile.removeClass('animated wobble'); }, 1000);
        }
    }
}

function StartGame() {
    var game = new Game();
    game.start();
}

function NewGame() {
    $('#steps').html(this.steps_counter = 0);
    for (var i = 0; i < 16; i++) {
        var blocks = document.getElementById('num');
        blocks.outerHTML = "";
    }
    StartGame();
}


StartGame()

buttonReset.addEventListener('click', NewGame)



