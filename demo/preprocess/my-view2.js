/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import 'i18n-behavior/i18n-behavior.js';

Polymer({
  importMeta: import.meta,

  _template: ((t) => { t.setAttribute("localizable-text", "embedded"); return t; })(html`
    <style>
      :host {
        display: block;
        padding: 10px;
      }
      .card {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        padding: 16px;
        margin: 24px;
        border-radius: 5px;
        background-color: #fff;
        color: #757575;
      }
      .circle {
        display: inline-block;
        height: 64px;
        width: 64px;
        border-radius: 50%;
        background: #ddd;
        line-height: 64px;
        font-size: 30px;
        color: #555;
        text-align: center;
      }
      h1 {
        font-size: 22px;
        margin: 16px 0;
        color: #212121;
      }
    </style>

    <div class="card">
      <div class="circle">{{text.div_1:div}}</div>
      <h1>{{text.div_1:h1_1}}</h1>
      <p>{{text.div_1:p_2}}</p>
      <p>{{text.div_1:p_3}}</p>
    </div>
  <template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "div_1:div": "2",
  "div_1:h1_1": "View Two",
  "div_1:p_2": "Ea duis bonorum nec, falli paulo aliquid ei eum.",
  "div_1:p_3": "Id nam odio natum malorum, tibique copiosae expetenda mel ea.Detracto suavitate repudiandae no eum. Id adhuc minim soluta nam.Id nam odio natum malorum, tibique copiosae expetenda mel ea."
}
</json-data>
</template>
`),

  is: 'my-view2',

  behaviors: [ BehaviorsStore.I18nBehavior ]

});
