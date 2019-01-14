/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

import Suite from 'scenarist/Suite.mjs';
import './common-test.js';
import './dialog-test.js';
import './panel-test.js';
import './iconview-test.js';
import './listview-test.js';
import './storageview-test.js';
import './browserstorage-test.js';
import './firebasestorage-test.js';
import './filestorage-test.js';
import './multistorage-test.js';

Suite.isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
