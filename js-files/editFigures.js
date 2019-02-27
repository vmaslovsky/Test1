'use strict';

import ListEvents from './events.js';
import OPTIONS_BUTTONS from "./constant.js";
import create from './init.js';

function openModalWindow() {
    let htmlShadow = document.createElement('div');
    htmlShadow.className = 'shadow-for-form';
    htmlShadow.onclick = closeModal;

    let htmlFormForCreateFigure = document.createElement('div');
    htmlFormForCreateFigure.className = 'form-for-new-figure';
    htmlFormForCreateFigure.innerHTML =
        '<button class="btn-close close">X</button>\n' +
        '    <form action="">\n' +
        '        <select name="" id="">\n' +
        '            <option value="square">Square</option>\n' +
        '            <option value="rectangle">Rectangle</option>\n' +
        '            <option value="circle">Circle</option>\n' +
        '            <option value="triangle">Triangle</option>\n' +
        '        </select>\n' +
        '        <ul></ul>\n' +
        '        <div id="picker"></div>\n' +
        '        <div id="slide"></div>\n' +
        '        <p class="error">Invalid data</p></n>' +
        '    </form>\n' +
        '    <button class="btn-ok">OK</button>\n' +
        '    <button class="btn-cancel close">Cancel</button>';


    processingForm(htmlFormForCreateFigure);

    document.getElementById('root').appendChild(htmlFormForCreateFigure);
    document.getElementById('root').appendChild(htmlShadow);

    ColorPicker(
        document.getElementById('slide'),
        document.getElementById('picker'),
        function (hex, hsv, rgb) {
            document.querySelector('.form-for-new-figure ul input.color').value = hex;
        });
}

function processingForm(node) {
    node.addEventListener('click', function (event) {
        if (event.target.localName == 'button' && event.target.className != 'btn-ok') {
            closeModal();
        }
    });

    node.querySelector('select').addEventListener('click', ListEvents.changeSelectEvent);

    node.querySelector('.btn-ok').addEventListener('click', ListEvents.submitForm);

}

function closeModal() {
    let form = document.querySelector('.form-for-new-figure'), shadow = document.querySelector('.shadow-for-form');

    if (form && shadow) {
        form.style.display = 'none';
        shadow.style.display = 'none';
    }
}

const DrawFigure = {
    Square: function (properties) {

        let figure = document.createElement('div');
        figure.className = 'figure-' + properties.speed;
        figure.style.width = properties.width + 'px';
        figure.style.height = properties.width + 'px';
        let canvas = document.createElement('canvas');

        let contentBlockForFigures = document.querySelector('#' + properties.parentId + ' .content-block-for-figures');

        let OptionsCheckboxFigure = OPTIONS_BUTTONS.OptionsCheckbox;
        OptionsCheckboxFigure.callback = ListEvents.checkedFigureEvent;

        figure.appendChild(create.createButton(OptionsCheckboxFigure));
        figure.appendChild(canvas);
        contentBlockForFigures.appendChild(figure);


        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = properties.color;
            ctx.fillRect(0, 0, properties.width, properties.width);
        }

    },
    Rectangle: function (properties) {

        let figure = document.createElement('div');
        figure.className = 'figure-' + properties.speed;
        figure.style.width = properties.width + 'px';
        figure.style.height = properties.height + 'px';
        let canvas = document.createElement('canvas');

        let contentBlockForFigures = document.querySelector('#' + properties.parentId + ' .content-block-for-figures');

        let OptionsCheckboxFigure = OPTIONS_BUTTONS.OptionsCheckbox;
        OptionsCheckboxFigure.callback = ListEvents.checkedFigureEvent;

        figure.appendChild(create.createButton(OptionsCheckboxFigure));
        figure.appendChild(canvas);
        contentBlockForFigures.appendChild(figure);

        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = properties.color;
            ctx.fillRect(0, 0, properties.width, properties.height);
        }
    },
    Triangle: function (properties) {
        console.log(properties);

        let figure = document.createElement('div');
        figure.className = 'figure-' + properties.speed;
        figure.style.width = properties.width + 'px';
        figure.style.height = properties.width + 'px';
        let canvas = document.createElement('canvas');

        let contentBlockForFigures = document.querySelector('#' + properties.parentId + ' .content-block-for-figures');

        let OptionsCheckboxFigure = OPTIONS_BUTTONS.OptionsCheckbox;
        OptionsCheckboxFigure.callback = ListEvents.checkedFigureEvent;

        figure.appendChild(create.createButton(OptionsCheckboxFigure));
        figure.appendChild(canvas);;
        contentBlockForFigures.appendChild(figure);

        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');

            ctx.beginPath();
            ctx.moveTo(0, properties.width);
            ctx.lineTo(properties.width, properties.width);
            ctx.lineTo(properties.width/2, 0);
            ctx.closePath();
            ctx.fillStyle = properties.color;
            ctx.fill();
        }
    },
    Circle: function (properties) {

        let figure = document.createElement('div');
        figure.className = 'figure-' + properties.speed;
        figure.style.width = properties.radius * 2 + 'px';
        figure.style.height = properties.radius * 2 + 'px';
        let canvas = document.createElement('canvas');

        let contentBlockForFigures = document.querySelector('#' + properties.parentId + ' .content-block-for-figures');

        let OptionsCheckboxFigure = OPTIONS_BUTTONS.OptionsCheckbox;
        OptionsCheckboxFigure.callback = ListEvents.checkedFigureEvent;


        figure.appendChild(create.createButton(OptionsCheckboxFigure));
        figure.appendChild(canvas);
        contentBlockForFigures.appendChild(figure);

        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.fillStyle = properties.color;
            ctx.arc(properties.radius, properties.radius, properties.radius, 0, 2 * Math.PI, true);
            ctx.fill();
        }
    },
}

export default {openModalWindow, closeModal, DrawFigure};