'use strict';

/* Import WebpackApp */
import '@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import '@polymer/iron-form/iron-form.js';
import '../../number-input.js';
import '../../integer-input.js';

const $template = document.createElement('template');

$template.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style include="demo-pages-shared-styles">
      input,
      integer-input,
      number-input {
        margin: 4px;
      }
      integer-input,
      number-input {
        --input-color: #111;
        --input-padding: 0.2em 0.4em;
        --input-border-radius: 0.2em;
        --input-border-color: #ddd;
        --input-transition: background-color 150ms ease-in-out, border-color 150ms ease-in-out;
        --input-focus-border-style: solid;
        --input-focus-border-color: #555;
        --input-focus-background: rgba(0, 0, 0, 0.15);
        --input-invalid-background: rgba(0, 0, 255, 0.15);
        --input-invalid-border-color: #b11e1e;
        --input-invalid-border-style: dashed;
      }
      iron-form {
        @apply --shadow-elevation-2dp;
        padding: 20px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($template.content);
