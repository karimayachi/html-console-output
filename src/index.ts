import './style.css';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const MAXITEMSINOBJECTPREVIEW = 3;
const MAXITEMSINARRAYPREVIEW = 5;

const output = document.createElement('div');
output.classList.add('console-block');

const oldLog = window.console.log;

window.console.log = (...items: unknown[]) => {
  oldLog(items);

  const outputLine = document.createElement('div');
  outputLine.classList.add('console-line');
  output.appendChild(outputLine);

  for (const item of items) {
    outputLine.appendChild(createItem(item, true, false));
  }
};

window.onerror = (message): void => {
  const outputLine = document.createElement('div');
  outputLine.classList.add('console-line');
  outputLine.classList.add('error');
  output.appendChild(outputLine);

  const errorMessage = document.createElement('span');
  errorMessage.innerHTML = <string>message;
  outputLine.appendChild(errorMessage);
};

ifDomReady(output);

/* poll DOM in stead of using onload event, because JSFiddle will overwrite onload event handler */
function ifDomReady(consoleBlock: HTMLDivElement): void {
  if (document.getElementById('html-console-output') || document.getElementsByTagName('body').length > 0) {
    if (document.getElementById('html-console-output')) {
      document.getElementById('html-console-output')!.appendChild(consoleBlock);
    } else {
      document.getElementsByTagName('body')[0].appendChild(consoleBlock);
    }
  } else {
    setTimeout((): void => {
      ifDomReady(output);
    }, 50);
  }
}

/**
 * Serialize an object or primitive to HTML
 * @param o The object to be serialized
 * @param baseLevel true if used as top-level element, false when used in recursive child serialization
 * @param inline true if used in preview for Array or Object
 */
function createItem(o: unknown, baseLevel: boolean, inline: boolean) {
  const item = document.createElement('div');
  item.classList.add('console-item');

  switch (typeof o) {
    case 'string':
      if (baseLevel) {
        item.innerHTML = o;
      } else {
        item.style.color = '#ed5c65';
        item.innerHTML = `"${o}"`;
      }
      break;
    case 'number':
    case 'boolean':
      item.style.color = '#249d7f';
      item.innerHTML = o.toString();
      break;
    case 'object':
      if (o === null) {
        item.style.color = '#777';
        item.innerHTML = 'null';
      } else {
        item.style.color = '#2795ee';
        if (inline) {
          item.innerHTML = '{&mldr;}';
        } else {
          item.appendChild(createObjectItem(o as { [key: string]: unknown }));
        }
      }
      break;
    case 'function':
      item.style.color = 'rgb(238, 151, 39)';
      item.innerHTML = 'function()';
      break;
    case 'undefined':
      item.style.color = '#777';
      item.innerHTML = 'undefined';
      break;
  }

  return item;
}

function createObjectItem(o: { [key: string]: unknown }) {
  const fragment = document.createDocumentFragment();
  const id = 'u' + Math.random().toString(36).substr(2, 8);
  const toggle = document.createElement('input');
  const label = document.createElement('label');
  const labelText = document.createElement('span');
  const labelTextShort = document.createElement('span');
  const content = document.createElement('div');
  const contentInner = document.createElement('div');

  content.classList.add('collapsible-content');
  contentInner.classList.add('content-inner');

  toggle.classList.add('toggle');
  toggle.type = 'checkbox';
  toggle.id = id;

  labelText.classList.add('label-text');
  labelTextShort.classList.add('label-text-short');

  if (o instanceof Array) {
    labelText.innerHTML = 'Array';
    labelText.appendChild(createLengthSpan(o));
    labelText.appendChild(createArrayPreview(o));

    labelTextShort.innerHTML = '[&mldr;]';
    labelTextShort.appendChild(createLengthSpan(o));
  } else {
    labelTextShort.innerHTML = '{&mldr;}';

    const prototype: object = Object.getPrototypeOf(o);
    labelText.innerHTML = prototype && prototype.constructor ? prototype.constructor.name : 'Object';
    labelText.innerHTML += ' ';
    labelText.appendChild(createObjectPreview(o));
  }

  label.classList.add('label-toggle');
  label.setAttribute('for', id);
  label.appendChild(labelText);
  label.appendChild(labelTextShort);

  for (const property in o) {
    if (Object.getOwnPropertyNames(o).indexOf(property) == -1) continue;

    const serializedProperty = document.createElement('div');
    serializedProperty.classList.add('console-property');
    serializedProperty.innerHTML = property + ': ';
    serializedProperty.appendChild(createItem(o[property], false, false));
    contentInner.appendChild(serializedProperty);
  }

  for (const property of getHiddenProperties(o)) {
    const serializedProperty = document.createElement('div');
    serializedProperty.classList.add('console-property');
    const lockIcon: HTMLElement = <HTMLElement>icon(faLock).node[0];
    lockIcon.style.color = '#aaa';
    serializedProperty.appendChild(lockIcon);
    serializedProperty.innerHTML += ` ${property}: `;
    serializedProperty.appendChild(createItem(o[property], false, false));
    contentInner.appendChild(serializedProperty);
  }

  const proto: object = Object.getPrototypeOf(o);
  if (proto !== null) {
    const serializedProperty = document.createElement('div');
    serializedProperty.classList.add('console-property');
    serializedProperty.style.color = '#777';
    serializedProperty.innerHTML = '(prototype): ';
    serializedProperty.appendChild(createItem(proto, false, false));
    contentInner.appendChild(serializedProperty);
  }

  content.appendChild(contentInner);

  fragment.appendChild(toggle);
  fragment.appendChild(label);
  fragment.appendChild(content);

  return fragment;
}

function createLengthSpan(a: unknown[]) {
  const span = document.createElement('span');
  span.style.color = '#aaa';
  span.innerHTML = `(${a.length}) `;

  return span;
}

function createObjectPreview(o: { [key: string]: unknown }) {
  const fragment = document.createDocumentFragment();
  const span = document.createElement('span');

  span.innerHTML = '{';

  let index: number = 0;
  for (const property in o) {
    span.innerHTML += ` ${property}: `;
    span.appendChild(createItem(o[property], false, true));

    if (index >= MAXITEMSINOBJECTPREVIEW - 1 || index == Object.keys(o).length - 1) {
      break;
    }

    span.innerHTML += ',';
    index++;
  }

  if (Object.keys(o).length > MAXITEMSINOBJECTPREVIEW) {
    span.innerHTML += ', &mldr;';
  }

  span.innerHTML += ' }';

  fragment.appendChild(span);
  return fragment;
}

function createArrayPreview(a: unknown[]) {
  const fragment = document.createDocumentFragment();
  const span = document.createElement('span');

  span.innerHTML = '[';

  for (let i = 0; i < MAXITEMSINARRAYPREVIEW && i < a.length; i++) {
    span.innerHTML += ' ';
    span.appendChild(createItem(a[i], false, true));

    if (i < a.length - 1 && i < MAXITEMSINARRAYPREVIEW - 1) {
      span.innerHTML += ',';
    }
  }

  if (a.length > MAXITEMSINARRAYPREVIEW) {
    span.innerHTML += ', &mldr;';
  }

  span.innerHTML += ' ]';

  fragment.appendChild(span);
  return fragment;
}

function getHiddenProperties(o: object): string[] {
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
   */

  const all: string[] = Object.getOwnPropertyNames(o);
  const enumOnly: string[] = Object.keys(o);

  return all.filter((key: string): boolean => enumOnly.indexOf(key) === -1);
}
