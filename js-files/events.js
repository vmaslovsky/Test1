'use strict';

import OPTIONS_BUTTONS from './constant.js';
import EditHtml from './editHTML.js';
import DrawFigure from './drawFigures.js';

let GeometricFigure = {
    color: '',
    speed: null,
    name: '',
    setInLocalStorage: function () {
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

    },
    setDataAndDrawAFigure: function (properties, parentId) {
        this.parentId = parentId;
        for (let property in properties) {
            this[property] = properties[property];
        }

        switch (this.name) {
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

let ListEvents = {
    addBlocksEvent: (event) => {

        let selectForButtonRemove = '.button-' + OPTIONS_BUTTONS.OptionsButtonRemove.title.toLowerCase();

        if (!document.querySelector(selectForButtonRemove)) {
            event.target.parentElement.appendChild(EditHtml.createButton(OPTIONS_BUTTONS.OptionsButtonRemove));
        }

        EditHtml.creatingBlockForFigure(event.target.parentElement);

    },

    removeBlocksEvent: (event) => {

        let isDelete = deleteСоnfirmation();

        if (isDelete) {
            let listCheckbox = document.querySelectorAll(".block-for-figures > input[type='checkbox']");

            for (let i = 0; i < listCheckbox.length; i++) {
                if (listCheckbox[i].checked) {
                    listCheckbox[i].parentNode.remove();
                }
            }

            event.target.disabled = true;
        }
    },

    targetDisabledButtonRemoveEvent: (event) => {

        let listCheckbox = document.querySelectorAll(".block-for-figures > input[type='checkbox']");

        let isChecked = [].some.call(listCheckbox, (checkbox) => checkbox.checked);

        document.querySelector('.button-remove').disabled = !isChecked;
    },

    addFigureEvent: (event) => {

        let uniqueParentID = event.target.parentNode.id;
        document.querySelector('form').className = uniqueParentID;
        document.querySelector('.form-for-new-figure').style.display = 'block';
        document.querySelector('.shadow-for-form').style.display = 'block';

    },

    removeFigureEvent: function (event) {
        let isDelete = deleteСоnfirmation();

        if (isDelete) {
            let listCheckbox = document.querySelectorAll("input[type='checkbox']");

            for (let i = 0; i < listCheckbox.length; i++) {
                if (listCheckbox[i].checked) {
                    listCheckbox[i].parentNode.remove();
                }
            }

            event.target.disabled = true;
        }
    },

    checkedFigureEvent: function (event) {

        let node = event.target;

        while (!node.classList.length || !node.classList.contains('block-for-figures')) {
            node = node.parentNode;
        }

        let classNameButtonRemove = '.button-remove';

        let listCheckbox = document.querySelectorAll('#' + node.id + " .content-block-for-figures input[type='checkbox']");

        let isChecked = [].some.call(listCheckbox, (checkbox) => checkbox.checked);

        document.querySelector('#' + node.id + ' ' + classNameButtonRemove).disabled = !isChecked;
    },

    changeSelectEvent: (event) => {
        document.querySelector('#picker').style.display = 'block';
        document.querySelector('#slide').style.display = 'block';

        switch (event.target.value) {
            case 'square': {
                EditHtml.addInputForForm(Square);
                break;
            }
            case 'rectangle': {
                EditHtml.addInputForForm(Rectangle);
                break;
            }
            case 'triangle': {
                EditHtml.addInputForForm(Triangle);
                break;

            }
            case 'circle': {
                EditHtml.addInputForForm(Circle);
                break
            }
        }
    },

    submitForm: (event) => {
        let listInputs = document.querySelectorAll('.form-for-new-figure input');
        if (validate(listInputs)) {

            let optionButtonRemoveFigure = OPTIONS_BUTTONS.OptionsButtonRemove;
            let parentBlockID = document.querySelector('.form-for-new-figure form').className;

            if (!document.querySelector('#' + parentBlockID + " .button-remove")) {

                optionButtonRemoveFigure.parentBlockID = parentBlockID;
                optionButtonRemoveFigure.styles.display = 'inline';
                optionButtonRemoveFigure.styles.width = '75px';
                optionButtonRemoveFigure.callback = ListEvents.removeFigureEvent;
                document.querySelector('#' + parentBlockID).appendChild(EditHtml.createButton(optionButtonRemoveFigure));
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

            EditHtml.closeModal();
            document.querySelector('.form-for-new-figure form p.error').style.display = 'none';

        } else {
            document.querySelector('.form-for-new-figure form p.error').style.display = 'block';
        }
    },

    animationFigure: (event) => {

        if (event.target.tagName == "CANVAS") {
            let figure = event.target.parentNode;
            let speed = parseInt(figure.className.substring(7));
            let deltaHeight = figure.parentNode.offsetHeight - figure.offsetHeight;
            let top = 0;

            let timeInterval = Math.floor(1 / speed * 1000);

            let timer = setInterval(() => {

                if (top >= deltaHeight) {
                    clearInterval(timer);
                    timer = setInterval( () => {

                        if (top <= 0) {
                            clearInterval(timer);
                            return;
                        }

                        top -= 2;
                        figure.style.top = top + 'px';

                    }, timeInterval);
                    return;
                }

                top += 2;
                figure.style.top = top + 'px';

            }, timeInterval);
        }
    }
};

const validate = (listProperty) => {
    return [].every.call(listProperty, function (inputNode) {

        switch (inputNode.className) {
            case 'color': {

                let color = inputNode.value.match(/#[a-f0-9]{6}\b/gi);
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
};

const deleteСоnfirmation = () => { return confirm("Are you sure you want to delete?");};

export default ListEvents;