'use strict';

import OPTIONS_BUTTONS from './constant.js';
import EditHtml from './editHTML.js';

(() => {

    document.getElementById('root').appendChild(EditHtml.createButton(OPTIONS_BUTTONS.OptionsButtonAdd));
    EditHtml.openModalWindow();

})();
