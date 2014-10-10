var TileMapEditor = {
    tileWidth: 30,
    tileHeight: 30,
    mapWidth: 900,
    mapHeight: 600,
    columns: [0],
    rows: [0],
    tiles: [],
    tileColor: {
        H: 204,
        S: 100,
        L: 47,
        A: 1
    },
    hoverTile: null,
    hoverTileColor: {
        H: 10,
        S: 92,
        L: 47,
        A: .6
    },
    update: function() {
        // Checks which tile the mouse is hovering over.
        for (var i = 0; i < this.columns.length; i++) {
            if (GameEngine.Mouse.x >= this.columns[i] && GameEngine.Mouse.x <= (this.columns[i] + this.tileWidth)) {
                this.hoverTile.x = this.columns[i];
            }
        }
        for (var j = 0; j < this.rows.length; j++) {
            if (GameEngine.Mouse.y >= this.rows[j] && GameEngine.Mouse.y <= (this.rows[j] + this.tileHeight)) {
                this.hoverTile.y = this.rows[j];
            }
        }
        this.updateInput();
    },
    updateInput: function() {
        if (GameEngine.Mouse.State.current == GameEngine.Mouse.State.PRESSED) {
            if (GameEngine.Keyboard.isKeyDown(GameEngine.Keyboard.Key.SHIFT)) {
                this.removeTile(this.hoverTile);
            } else {
                this.placeTile(this.hoverTile);
            }
        }
    },
    changeTileColor: function() {
        TileMapEditor.tileColor.H = document.getElementById('rangeH').value;
        TileMapEditor.tileColor.S = document.getElementById('rangeS').value;
        TileMapEditor.tileColor.L = document.getElementById('rangeL').value;
        TileMapEditor.tileColor.A = document.getElementById('rangeA').value;
        // Show value in span tags
        document.getElementById('valueH').innerHTML = TileMapEditor.tileColor.H;
        document.getElementById('valueS').innerHTML = TileMapEditor.tileColor.S;
        document.getElementById('valueL').innerHTML = TileMapEditor.tileColor.L;
        document.getElementById('valueA').innerHTML = TileMapEditor.tileColor.A;
        document.getElementById('tileColorPreview').style.background = 'hsla(' + TileMapEditor.tileColor.H + ',' + TileMapEditor.tileColor.S + '%, ' + TileMapEditor.tileColor.L + '%, ' + TileMapEditor.tileColor.A + ')';
    },
    changeDimension: function() {
        TileMapEditor.tileWidth = parseInt(document.getElementById('tileWidth').value);
        TileMapEditor.tileHeight = parseInt(document.getElementById('tileHeight').value);
        TileMapEditor.mapWidth = parseInt(document.getElementById('canvasWidth').value);
        TileMapEditor.mapHeight = parseInt(document.getElementById('canvasHeight').value);
        TileMapEditor.init();
    },
    draw: function(ctx) {
        // Draw each map tile.
        for (var i = 0; i < this.tiles.length; i++) {
            this.tiles[i].draw(ctx);
        }
        this.hoverTile.draw(ctx);
    },
    removeTile: function(tile) {
        for (var i = 0; i < this.tiles.length; i++) {
            // Removes the correct tile.
            if (tile.x == this.tiles[i].x &&
                tile.y == this.tiles[i].y &&
                tile.width == this.tiles[i].width &&
                tile.height == this.tiles[i].height) {
                this.tiles.splice(this.tiles.indexOf(this.tiles[i]), 1);
            }
        }
    },
    placeTile: function(tile) {
        this.removeTile(tile.x, tile.y);
        this.tiles[this.tiles.length] = new Tile(tile.x, tile.y, this.tileWidth, this.tileHeight, this.tileColor);
    },
    /*outputMap: function() {
        var arrayOfCoors = '';
        console.log('output coordinates below ==================================================');
        for (var i = 0; i < this.tiles.length; i++) {
            arrayOfCoors += 'new Tile(' + this.tiles[i].x + ',' + this.tiles[i].y + ',' + this.tiles[i].width + ',' + this.tiles[i].height + ",'" + this.tiles[i].color + "'),";
        }
        // Removes the last comma created by the for loop.
        arrayOfCoors = arrayOfCoors.substring(0, arrayOfCoors.length - 1);
        console.log('[' + arrayOfCoors + ']');
    },*/
    init: function() {
        GameEngine.Canvas.changeDimension('canvas', this.mapWidth, this.mapHeight);
        // Create rows and columns.
        this.columns = [0];
        this.rows = [0];
        for (var x = 1; x < (this.mapWidth / this.tileWidth); x++) {
            this.columns[x] = this.columns[x-1] + this.tileWidth;
        }
        for (var y = 1; y < (this.mapHeight / this.tileHeight); y++) {
            this.rows[y] = this.rows[y-1] + this.tileHeight;
        }
        this.hoverTile = new Tile(0, 0, this.tileWidth, this.tileHeight, this.hoverTileColor);

        // Update dom elements to show correct values
        document.getElementById('tileWidth').value = this.tileWidth;
        document.getElementById('tileHeight').value = this.tileHeight;
        document.getElementById('canvasWidth').value = this.mapWidth;
        document.getElementById('canvasHeight').value = this.mapHeight;
        document.getElementById('rangeH').value = this.tileColor.H;
        document.getElementById('rangeS').value = this.tileColor.S;
        document.getElementById('rangeL').value = this.tileColor.L;
        document.getElementById('rangeA').value = this.tileColor.A;
        document.getElementById('valueH').innerHTML = this.tileColor.H;
        document.getElementById('valueS').innerHTML = this.tileColor.S;
        document.getElementById('valueL').innerHTML = this.tileColor.L;
        document.getElementById('valueA').innerHTML = this.tileColor.A;
        document.getElementById('tileColorPreview').style.background = 'hsla(' + this.tileColor.H + ',' + this.tileColor.S + '%, ' + this.tileColor.L + '%, ' + this.tileColor.A + ')';
    }
}

/*******************************************************************************
* TILE
*******************************************************************************/
var Tile = function(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = {
        H: color.H,
        S: color.S,
        L: color.L,
        A: color.A
    };
}
Tile.prototype.draw = function(ctx) {
    ctx.fillStyle = 'hsla(' + this.color.H + ',' + this.color.S + '%, ' + this.color.L + '%, ' + this.color.A + ')';
    ctx.fillRect(this.x, this.y, this.width, this.height);
};









/*******************************************************************************
* POINT
*******************************************************************************/
var Point = function(x, y) {
    if (arguments.length === 0) {
        // Defaults to (0, 0)
        this.x = 0;
        this.y = 0;
    } else if (arguments.length === 2) {
        // Use specified values
        this.x = x;
        this.y = y;
    }
};

Point.prototype.add = function(point2) {
    return new Point(this.x + point2.x, this.y + point2.y);
};

Point.prototype.subtract = function(point2) {
    return new Point(this.x - point2.x, this.y - point2.y);
};

Point.prototype.multiply = function(point2) {
    return new Point(this.x * point2.x, this.y * point2.y);
};

Point.prototype.divide = function(point2) {
    return new Point(this.x / point2.x, this.y / point2.y);
};

Point.prototype.copy = function() {
    return new Point(this.x, this.y);
};

/*******************************************************************************
* RECTANGLE
*******************************************************************************/
var Rectangle = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

Rectangle.prototype.setPosition = function(point) {
    return new Rectangle(point.x, point.y, this.width, this.height);
};

Rectangle.prototype.contains = function(point) {
    return  (point.x >= this.x && point.x <= this.width) &&
            (point.y >= this.y && point.y <= this.height);
};


/*******************************************************************************
* GameEngine-v1.0.js
*******************************************************************************/
var GameEngine = {
    requestAnimFrame: (function(e) {
        return  window.requestAnimationFrame(e)        ||
                window.webkitRequestAnimationFrame(e)  ||
                window.mozRequestAnimationFrame(e)     ||
                window.oRequestAnimationFrame(e)       ||
                window.msRequestAnimationFrame(e);
    }),
    State: {
        PAUSED: 'paused',
        RUNNING: 'running',
        current: 'paused'
    },
    Time: {
        startTime: new Date().getTime(),
        elapsed: 0,
        update: function() {
            this.elapsed = new Date().getTime() - this.startTime;
        }
    },
    Canvas: {
        clear: function(id, x, y, width, height) {
            if(arguments.length === 1) {
                // Clear the whole canvas.
                this[id].ctx.clearRect(0, 0, this[id].element.width, this[id].element.height);
            } else if (arguments.length === 5) {
                // Clear a portion of the canvas.
                this[id].ctx.clearRect(x, y, width, height);
            }
        },
        changeDimension: function(id, width, height) {
            this[id].element.width = width;
            this[id].element.height = height;
        },
        add: function(id) {
            this[id] = {};
            this[id].element = document.getElementById(id);
            this[id].ctx = this[id].element.getContext('2d');
            this[id].boundingBox = new Rectangle(0, 0, this[id].element.width, this[id].element.height);
        }
    },
    AssetManager: {
        images: {},
        numImagesToLoad: 0,
        numImagesLoaded: 0,
        currentLoadPercent: 0,
        addImages: function(images) {
            // Begin loading all images.
            this.numImagesToLoad = images.length;
            for (var url = 0; url < this.numImagesToLoad; url++) {
                var img = new Image();
                img.addEventListener('error', GameEngine.AssetManager.loadFail, false);
                img.addEventListener('abort', GameEngine.AssetManager.loadFail, false);
                img.addEventListener('load', GameEngine.AssetManager.loadSuccess, false);
                img.src = images[url];
                img.id = images[url].substring(images[url].lastIndexOf('/') + 1, images[url].lastIndexOf('.'));
                this.images[img.id] = img;
            }
        },
        checkReady: function() {
            this.currentLoadPercent = this.numImagesLoaded / this.numImagesToLoad * 100;
            if (this.numImagesLoaded === this.numImagesToLoad) {
                // If all assets have loaded, initialize the game.
                GameEngine.init();
            }
        },
        loadSuccess: function() {
            GameEngine.AssetManager.numImagesLoaded++;
            GameEngine.AssetManager.checkReady();
        },
        loadFail: function() {
            console.log('The file "' + this.src + '" failed to load.');
        }
    },
    Keyboard: {
        Key: {
            SHIFT: 16
        },
        keysDown: [], // List of keys that are currently down.
        keyPressed: function(e) {
            var key = e.keyCode || e.which;
            if (!GameEngine.Keyboard.isKeyDown(key)) {
                // If it's not in the list, add it.
                GameEngine.Keyboard.keysDown.push(key);
            }
        },
        keyReleased: function(e) {
            var key = e.keyCode || e.which;
            // Remove it from the list.
            GameEngine.Keyboard.keysDown.splice(GameEngine.Keyboard.keysDown.indexOf(key), 1);
        },
        isKeyDown: function(key) {
            for (var k = 0; k < GameEngine.Keyboard.keysDown.length; k++) {
                // Check if the specified key is down.
                if (GameEngine.Keyboard.keysDown[k] === key) {
                    return true;
                }
            }
            return false;
        },
        isAnyKeyDown: function() {
            return this.keysDown.length > 0;
        }
    },
    Mouse: {
        x: 0,
        y: 0,
        State: {
            PRESSED: 'pressed',
            RELEASED: 'released',
            current: 'released'
        },
        moved: function(e) {
            // Coordinates relative to the specified canvas.
            GameEngine.Mouse.x = e.pageX - GameEngine.Canvas.canvas.element.offsetLeft;
            GameEngine.Mouse.y = e.pageY - GameEngine.Canvas.canvas.element.offsetTop;
            //console.log("x:" + GameEngine.Mouse.x + "     y:" + GameEngine.Mouse.y);
        },
        pressed: function(e) {
            GameEngine.Mouse.State.current = GameEngine.Mouse.State.PRESSED;
        },
        released: function(e) {
            GameEngine.Mouse.State.current = GameEngine.Mouse.State.RELEASED;
        }
    },
    start: function() {
        this.State.current = this.State.RUNNING;
        this.requestAnimFrame(this.loop);
    },
    pause: function() {
        this.State.current = this.State.PAUSED;
    },
    reset: function() {
    },
    update: function() {
        TileMapEditor.update();
    },
    draw: function() {
        this.Canvas.clear('canvas');
        TileMapEditor.draw(this.Canvas.canvas.ctx);
    },
    loop: function() {
        GameEngine.requestAnimFrame(GameEngine.loop);
        GameEngine.Time.update();

        switch(GameEngine.State.current) {
            case GameEngine.State.RUNNING:
                GameEngine.update();
                GameEngine.draw();
            break;
            case GameEngine.State.PAUSED:
            break;
        }
    },
    init: function() {
        // Called when all resources have loaded.
        // Add canvases here.
        this.Canvas.add('canvas');
        // Add event listeners here.

        // Color ranges
        document.getElementById('rangeH').addEventListener('input', TileMapEditor.changeTileColor, false);
        document.getElementById('rangeS').addEventListener('input', TileMapEditor.changeTileColor, false);
        document.getElementById('rangeL').addEventListener('input', TileMapEditor.changeTileColor, false);
        document.getElementById('rangeA').addEventListener('input', TileMapEditor.changeTileColor, false);

        // Dimension text boxes
        document.getElementById('tileWidth').addEventListener('input', TileMapEditor.changeDimension, false);
        document.getElementById('tileHeight').addEventListener('input', TileMapEditor.changeDimension, false);
        document.getElementById('canvasWidth').addEventListener('input', TileMapEditor.changeDimension, false);
        document.getElementById('canvasHeight').addEventListener('input', TileMapEditor.changeDimension, false);

        document.addEventListener('keydown', GameEngine.Keyboard.keyPressed, false);
        document.addEventListener('keyup', GameEngine.Keyboard.keyReleased, false);
        document.addEventListener('mousemove', GameEngine.Mouse.moved, false);
        this.Canvas.canvas.element.addEventListener('mousedown', GameEngine.Mouse.pressed, false);
        this.Canvas.canvas.element.addEventListener('mouseup', GameEngine.Mouse.released, false);

        TileMapEditor.init();

        this.reset();
        this.start();
    },
    load: function() {
        // Called when window.onload happens.
        // Add images that need to be loaded here.
        // GameEngine.AssetManager.addImages([
        //    'images/playerSprite.png'
        //]);
        GameEngine.init();
    }
};




window.onload = GameEngine.load;