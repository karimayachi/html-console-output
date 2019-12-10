import './style.css';

const output: HTMLDivElement = document.createElement('div');
output.classList.add('console-block');
document.getElementsByTagName('body')[0].appendChild(output);

const oldLog: Function = window.console.log;

window.console.log = function (...items: any[]) {
    oldLog.apply(this, arguments);

    const outputLine: HTMLDivElement = document.createElement('div');
    outputLine.classList.add('console-line');
    output.appendChild(outputLine);

    for (let item of items) {
        outputLine.appendChild(createItem(item, true));
    }
}

function createItem(o: any, baseLevel: boolean): HTMLDivElement {
    let item: HTMLDivElement = document.createElement('div');
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
                item.appendChild(createObjectItem(o));
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

function createObjectItem(o: any): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const id: string = 'u' + Math.random().toString(36).substr(2, 8);
    const toggle: HTMLInputElement = document.createElement('input');
    const label: HTMLLabelElement = document.createElement('label');
    const labelText: HTMLSpanElement = document.createElement('span');
    const labelTextShort: HTMLSpanElement = document.createElement('span');
    const content: HTMLDivElement = document.createElement('div');
    const contentInner: HTMLDivElement = document.createElement('div');

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
        labelTextShort.innerHTML = '[&mldr;]';
        labelTextShort.appendChild(createLengthSpan(o));
    } else {
        labelTextShort.innerHTML = '{&mldr;}';

        let prototype: any = Object.getPrototypeOf(o);
        labelText.innerHTML = prototype && prototype.constructor ? prototype.constructor.name : 'Object ';
    }

    labelText.innerHTML += ' ';
    labelText.appendChild(createObjectPreview(o));

    label.classList.add('label-toggle');
    label.setAttribute('for', id);
    label.appendChild(labelText);
    label.appendChild(labelTextShort);

    for (let property in o) {
        const serializedProperty: HTMLDivElement = document.createElement('div');
        serializedProperty.classList.add('console-property');
        serializedProperty.innerHTML = property + ': ';
        serializedProperty.appendChild(createItem(o[property], false));
        contentInner.appendChild(serializedProperty);
    }

    content.appendChild(contentInner);

    fragment.appendChild(toggle);
    fragment.appendChild(label);
    fragment.appendChild(content);

    return fragment;
}

function createLengthSpan(a: any[]): HTMLSpanElement {
    const span: HTMLSpanElement = document.createElement('span');
    span.style.color = '#aaa';
    span.innerHTML = `(${a.length})`;

    return span;
}

function createObjectPreview(o: any): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const span: HTMLSpanElement = document.createElement('span');
    span.innerHTML = JSON.stringify(o);

    fragment.appendChild(span);
    return fragment;
}