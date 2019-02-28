'use strict';

import OPTIONS_BUTTONS from './constant.js';
import ListEvents from './events.js';
import EditHtml from './editHTML.js';

let DrawFigure = {
    Square: (properties) => {

        let canvas = createDivForFigure(properties.width, properties.width, properties.speed, properties.parentId);

        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = properties.color;
            ctx.fillRect(0, 0, properties.width, properties.width);
        }

    },
    Rectangle: (properties) => {

        let canvas = createDivForFigure(properties.width, properties.height, properties.speed, properties.parentId);

        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = properties.color;
            ctx.fillRect(0, 0, properties.width, properties.height);
        }
    },
    Triangle: (properties) => {

        let canvas = createDivForFigure(properties.width, properties.width, properties.speed, properties.parentId);

        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');

            ctx.beginPath();
            ctx.moveTo(0, properties.width);
            ctx.lineTo(properties.width, properties.width);
            ctx.lineTo(properties.width / 2, 0);
            ctx.closePath();
            ctx.fillStyle = properties.color;
            ctx.fill();
        }
    },
    Circle: (properties) => {

        let canvas = createDivForFigure(properties.radius * 2, properties.radius * 2, properties.speed, properties.parentId);

        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.fillStyle = properties.color;
            ctx.arc(properties.radius, properties.radius, properties.radius, 0, 2 * Math.PI, true);
            ctx.fill();
        }
    },
};

const createDivForFigure = (width, height, speed, parentId) => {
    let blockForCanvas = document.createElement('div');
    blockForCanvas.className = 'block-for-canvas';
    blockForCanvas.style.width = width + 'px';

    let figure = document.createElement('div');
    figure.className = 'figure-' + speed;
    figure.style.width = width + 'px';

    let canvas = document.createElement('canvas');
    canvas.width  = width;
    canvas.height = width;

    let contentBlockForFigures = document.querySelector('#' + parentId + ' .content-block-for-figures');

    let OptionsCheckboxFigure = Object.assign({}, OPTIONS_BUTTONS.OptionsCheckbox);
    OptionsCheckboxFigure.callback = ListEvents.checkedFigureEvent;

    figure.appendChild(EditHtml.createButton(OptionsCheckboxFigure));
    figure.appendChild(canvas);
    blockForCanvas.appendChild(figure);
    contentBlockForFigures.appendChild(blockForCanvas);

    return canvas;
};

export default DrawFigure;