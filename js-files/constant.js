'use strict';

import ListEvents from './events.js';

const OptionsButtonAdd = {
    nameTag: 'button',
    title: 'Add',
    styles: {
        color: 'green',
        borderColor: 'green',
        display: 'block',
        width: '100px'
    },
    isDisabled: false,
    callback: ListEvents.addBlocksEvent
};

const OptionsButtonRemove = {
    nameTag: 'button',
    title: 'Remove',
    styles: {
        color: 'red',
        borderColor: 'red',
        display: 'block',
        width: '100px'
    },
    isDisabled: true,
    callback: ListEvents.removeBlocksEvent
};

const OptionsCheckbox = {
    nameTag: 'input',
    type: 'checkbox',
    styles: {
        color: 'red',
        borderColor: 'red',
        display: 'block'
    },
    callback: ListEvents.targetDisabledButtonRemoveEvent
};

export default { OptionsButtonAdd, OptionsButtonRemove, OptionsCheckbox };