'use strict';

import ListEvents from './events.js';
import OPTIONS_BUTTONS from "./constant.js";

let EditHtml = {

    createButton: (options) => {

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

        ////////////////
        ///////////////
        ///////////////

        newButton.addEventListener('click', options.callback);

        return newButton;

    },

    creatingBlockForFigure: (node) => {

        let blockForFigure = document.createElement('div');
        blockForFigure.id = 'id' + Math.round(Math.random() * 10000).toString(16);
        blockForFigure.classList += 'block-for-figures';


        let optionButtonAddFigure = OPTIONS_BUTTONS.OptionsButtonAdd;

        optionButtonAddFigure.parentBlockID = blockForFigure.id;
        optionButtonAddFigure.styles.display = 'inline';
        optionButtonAddFigure.styles.width = '75px';
        optionButtonAddFigure.callback = ListEvents.addFigureEvent;


        let OptionsCheckbox = OPTIONS_BUTTONS.OptionsCheckbox;
        blockForFigure.appendChild(EditHtml.createButton(optionButtonAddFigure));
        blockForFigure.appendChild(EditHtml.createButton(OptionsCheckbox));

        let contentBlockForFigure = document.createElement('div');
        contentBlockForFigure.className = 'content-block-for-figures';


        //animation for figures
        contentBlockForFigure.addEventListener('dblclick', ListEvents.animationFigure);

        blockForFigure.appendChild(contentBlockForFigure);

        node.appendChild(blockForFigure);

    },

    addInputForForm: (objectFigure) => {
        let blockForListOfProperties = document.querySelector('.form-for-new-figure ul');
        blockForListOfProperties.innerHTML = '';

        for (let property in objectFigure) {
            if (property != 'name' && property != 'parentId') {
                let newItemList = document.createElement('li');
                newItemList.innerHTML = '<p> ' + property + ': <input class="' + property + '" type="text"></p>';
                blockForListOfProperties.appendChild(newItemList);
            }
        }
    },

    openModalWindow: () => {
        let htmlShadow = document.createElement('div');
        htmlShadow.className = 'shadow-for-form';
        htmlShadow.onclick = EditHtml.closeModal();

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


        EditHtml.processingForm(htmlFormForCreateFigure);

        document.getElementById('root').appendChild(htmlFormForCreateFigure);
        document.getElementById('root').appendChild(htmlShadow);

        ColorPicker(
            document.getElementById('slide'),
            document.getElementById('picker'),
            function (hex, hsv, rgb) {
                document.querySelector('.form-for-new-figure ul input.color').value = hex;
            });
    },

    processingForm: (node) => {
        node.addEventListener('click', function (event) {
            if (event.target.localName == 'button' && event.target.className != 'btn-ok') {
                EditHtml.closeModal();
            }
        });

        node.querySelector('select').addEventListener('click', ListEvents.changeSelectEvent);

        node.querySelector('.btn-ok').addEventListener('click', ListEvents.submitForm);

    },

    closeModal: () => {
        let form = document.querySelector('.form-for-new-figure'), shadow = document.querySelector('.shadow-for-form');

        if (form && shadow) {
            form.style.display = 'none';
            shadow.style.display = 'none';
        }
    }
};

export default EditHtml;