'use strict';

import DrawFigure from './drawFigures.js';

function GeometricFigure() {
    this.nameFigure = '';
}

GeometricFigure.prototype.setInLocalStorage = function () {
    let memoryForBlocks = {};
    let isEmptyLocalStorage = !!window.localStorage.getItem('memoryForBlocks');

    if (isEmptyLocalStorage) {
        memoryForBlocks = JSON.parse(window.localStorage.getItem('memoryForBlocks'));

        if (memoryForBlocks[this.parentId] && memoryForBlocks[this.parentId].length) {
            memoryForBlocks[this.parentId].push(this);
        } else {
            let newBlock = [];
            newBlock.push(this);
            memoryForBlocks[this.parentId] = newBlock;
        }

    } else {
        let newBlock = [];
        newBlock.push(this);
        memoryForBlocks[this.parentId] = newBlock;
    }
    window.localStorage.setItem('memoryForBlocks', JSON.stringify(memoryForBlocks));

};
GeometricFigure.prototype.setDataAndDrawAFigure = function (properties, parentId) {
    this.parentId = parentId;
    for (let property in properties) {
        this[property] = properties[property];
    }

    switch (this.nameFigure) {
        case 'square': {
            DrawFigure.Square(this);
            break;
        }
        case 'rectangle': {
            DrawFigure.Rectangle(this);
            break;
        }
        case 'triangle': {
            DrawFigure.Triangle(this);
            break;
        }
        case 'circle': {
            DrawFigure.Circle(this);
            break
        }
    }
};

// }

function Square() {
    this.nameFigure = 'square';
    this.color = '';
    this.speed = null;
    this.width = null;
}

Square.prototype = Object.create(GeometricFigure.prototype);

function Rectangle() {
    Square.apply(this, arguments);
    this.nameFigure = 'rectangle';
    this.height = null;
}

function Triangle() {
    Square.apply(this, arguments);
    this.nameFigure = 'triangle';
}

function Circle() {
    this.nameFigure = 'circle';
    this.color = '';
    this.speed = null;
    this.radius = null;
}

Circle.prototype = Object.create(GeometricFigure.prototype);

export { Square, Rectangle, Triangle, Circle }