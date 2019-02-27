'use strict';

import OPTIONS_BUTTONS from './constant.js';
import create from './init.js';
import Form from './editFigures.js';

let GeometricFigure = {
    color: '',
    speed: null,
    name: '',
    setInLocalStorage: function () {
        debugger;
        let memoryForBlocks = {};
        let isEmptyLocalStorage = !!window.localStorage.getItem('memoryForBlocks');

        if(isEmptyLocalStorage){
            memoryForBlocks = JSON.parse(window.localStorage.getItem('memoryForBlocks'));
            console.log(memoryForBlocks);
            if(memoryForBlocks[this.parentId] && memoryForBlocks[this.parentId].length){
                memoryForBlocks[this.parentId].push(this);
            }else {
                let newBlock = [];
                newBlock.push(this);
                memoryForBlocks[this.parentId] = newBlock;
            }

        }else {
            let newBlock = [];
            newBlock.push(this);
            memoryForBlocks[this.parentId] = newBlock;
        }
        window.localStorage.setItem('memoryForBlocks', JSON.stringify(memoryForBlocks));

    },
    setDataAndDrawAFigure: function (properties, parentId) {
        this.parentId = parentId;
        for (let property in properties) {
            this[property] = properties[property];
        }

        switch (this.name) {
            case 'square': {
                Form.DrawFigure.Square(this);
                break;
            }
            case 'rectangle': {
                Form.DrawFigure.Rectangle(this);
                break;
            }
            case 'triangle': {
                Form.DrawFigure.Triangle(this);
                break;
            }
            case 'circle': {
                Form.DrawFigure.Circle(this);
                break
            }
        }
    }
};

let Square = {
    name: 'square',
    width: null
};
Square.__proto__ = GeometricFigure;

let Rectangle = {
    name: 'rectangle',
    height: null
};

Rectangle.__proto__ = Square;

let Triangle = {
    name: 'triangle'
};

Triangle.__proto__ = Square;

let Circle = {
    name: 'circle',
    radius: null
};

Circle.__proto__ = GeometricFigure;

Object.defineProperty(GeometricFigure, "setInLocalStorage", {enumerable: false});
Object.defineProperty(GeometricFigure, "setDataAndDrawAFigure", {enumerable: false});

const ListEvents = {
    addBlocksEvent: function (event) {

        let selectForButtonRemove = '.button-' + OPTIONS_BUTTONS.OptionsButtonRemove.title.toLowerCase();

        if (!document.querySelector(selectForButtonRemove)) {
            event.target.parentElement.appendChild(create.createButton(OPTIONS_BUTTONS.OptionsButtonRemove));
        }

        create.creatingBlockForFigure(event.target.parentElement);

    },

    removeBlocksEvent: function (event) {

        let listCheckbox = document.querySelectorAll("input[type='checkbox']");

        for (let i = 0; i < listCheckbox.length; i++) {

            if (listCheckbox[i].checked) {
                listCheckbox[i].parentNode.remove()
            }
        }

        event.target.disabled = true;
    },

    targetDisabledButtonRemoveEvent: function (event) {

        let selectForButtonRemove = '.button-' + OPTIONS_BUTTONS.OptionsButtonRemove.title.toLowerCase();
        let listCheckbox = document.querySelectorAll("input[type='checkbox']");

        let isChecked = [].some.call(listCheckbox, function (checkbox) {
            return checkbox.checked;
        });

        document.querySelector(selectForButtonRemove).disabled = !isChecked;
    },

    addFigureEvent: function (event) {
        let uniqueParentID = event.target.parentNode.id;
        document.querySelector('form').className = uniqueParentID;
        document.querySelector('.form-for-new-figure').style.display = 'block';
        document.querySelector('.shadow-for-form').style.display = 'block';
    },

    removeFigureEvent: function (event) {
        console.log('removeFigure', event.target);
    },

    checkedFigureEvent: function (event) {
        console.log('checkedFigure', event.target);
    },

    changeSelectEvent: function (event) {
        document.querySelector('#picker').style.display = 'block';
        document.querySelector('#slide').style.display = 'block';

        switch (event.target.value) {
            case 'square': {
                create.addInputForForm(Square);
                break;
            }
            case 'rectangle': {
                create.addInputForForm(Rectangle);
                break;
            }
            case 'triangle': {
                create.addInputForForm(Triangle);
                break;

            }
            case 'circle': {
                create.addInputForForm(Circle);
                break
            }
        }
    },

    submitForm: function (event) {
        let listInputs = document.querySelectorAll('.form-for-new-figure input');
        if (create.validate(listInputs)) {

            let optionButtonRemoveFigure = OPTIONS_BUTTONS.OptionsButtonRemove;
            let parentBlockID = document.querySelector('.form-for-new-figure form').className;

            if(!document.querySelector('#' + parentBlockID + " .button-remove" )){

                optionButtonRemoveFigure.parentBlockID = parentBlockID;
                optionButtonRemoveFigure.styles.display = 'inline';
                optionButtonRemoveFigure.styles.width = '75px';
                optionButtonRemoveFigure.callback = ListEvents.removeFigureEvent;
                document.querySelector('#' + parentBlockID).appendChild(create.createButton(optionButtonRemoveFigure));
            }

            let properties = {};
            listInputs.forEach(function (input) {
                properties[input.className] = input.value;
            });

            let nameFigure = document.querySelector('.form-for-new-figure select').value;
            let parentId = document.querySelector('.form-for-new-figure form').className;

            switch (nameFigure) {
                case 'square': {
                    Square.setDataAndDrawAFigure(properties, parentId);
                    Square.setInLocalStorage();
                    break;
                }
                case 'rectangle': {
                    Rectangle.setDataAndDrawAFigure(properties, parentId);
                    Rectangle.setInLocalStorage();
                    break;
                }
                case 'triangle': {
                    Triangle.setDataAndDrawAFigure(properties, parentId);
                    Triangle.setInLocalStorage();
                    break;

                }
                case 'circle': {
                    Circle.setDataAndDrawAFigure(properties, parentId);
                    Circle.setInLocalStorage();
                    break
                }
            }

            Form.closeModal();
            document.querySelector('.form-for-new-figure form p.error').style.display = 'none';

        } else {
            document.querySelector('.form-for-new-figure form p.error').style.display = 'block';
        }
    }
};

export default ListEvents;