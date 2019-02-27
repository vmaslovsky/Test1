'use strict';

import OPTIONS_BUTTONS from './constant.js';
import ListEvents from './events.js';
import Form from './editFigures.js';

(function f() {

    document.getElementById('root').appendChild(createButton(OPTIONS_BUTTONS.OptionsButtonAdd));
    Form.openModalWindow();

})();

function createButton(options) {

    let newButton;

    if (options.nameTag == 'button') {
        newButton = document.createElement(options.nameTag);

        newButton.innerHTML = options.title;
        newButton.className = 'button-' + options.title.toLowerCase();

        for (let nameStyle in options.styles) {
            newButton.style[nameStyle] = options.styles[nameStyle];
        }

        if (options.isDisabled) {
            newButton.disabled = options.isDisabled;
        }
    } else {
        newButton = document.createElement(options.nameTag);
        newButton.type = options.type;
    }

    newButton.addEventListener('click', options.callback);

    return newButton;

}

function creatingBlockForFigure(node) {

    let blockForFigure = document.createElement('div');
    blockForFigure.id = 'id' + Math.round(Math.random() * 10000).toString(16);
    blockForFigure.classList += 'block-for-figures';


    let optionButtonAddFigure = OPTIONS_BUTTONS.OptionsButtonAdd;

    optionButtonAddFigure.parentBlockID = blockForFigure.id;
    optionButtonAddFigure.styles.display = 'inline';
    optionButtonAddFigure.styles.width = '75px';
    optionButtonAddFigure.callback = ListEvents.addFigureEvent;


    blockForFigure.appendChild(createButton(optionButtonAddFigure));
    blockForFigure.appendChild(createButton(OPTIONS_BUTTONS.OptionsCheckbox));

    let contentBlockForFigure = document.createElement('div');
    contentBlockForFigure.className = 'content-block-for-figures';
    blockForFigure.appendChild(contentBlockForFigure);

    node.appendChild(blockForFigure);

}

function addInputForForm(objectFigure) {
    let blockForListOfProperties = document.querySelector('.form-for-new-figure ul');
    blockForListOfProperties.innerHTML = '';

    for (let property in objectFigure) {
        if (property != 'name' && property != 'parentId') {
            let newItemList = document.createElement('li');
            newItemList.innerHTML = '<p> ' + property + ': <input class="' + property + '" type="text"></p>';
            blockForListOfProperties.appendChild(newItemList);
        }
    }
}

function validate(listProperty) {
    return [].every.call(listProperty, function (inputNode) {

        switch (inputNode.className) {
            case 'color': {

                let color = inputNode.value.match(/#[a-f0-9]{6}\b/gi);
                console.log('Color', color);
                return !!color;
            }
            case 'height':
            case 'speed':
            case 'radius':
            case 'width': {
                return !isNaN(parseFloat(inputNode.value)) && isFinite(inputNode.value);
            }
        }
    });
}

export default {createButton, creatingBlockForFigure, addInputForForm, validate};