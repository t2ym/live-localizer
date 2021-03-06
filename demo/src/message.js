/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

import {html, bind} from 'i18n-element/i18n.js';

export const binding = bind('get-message', import.meta); // the name must be unique among the app

let mutatingMessage = '';
setInterval(() => {
  mutatingMessage = Date.now();
  binding.element.fire('lang-updated'); // Any events other than 'lang-updated' will do as long as the user (lit-clock) can detect them
}, 500);
const getMutatingMessage = () => {
  return mutatingMessage;
};

export const getMessage = () => {
  return html`${'get-message',binding}<div>message</div><div>${getMutatingMessage()}</div>`;
}
