# html-console-output
Fancy html-based Javascript console output window

> Important: html-console-output is still in beta. More data-types visualization and prototype tracing will be added. Could also be buggy.

## What is it?
html-console-output appends console output to the HTML of a webpage. It was made with JSFiddle or similar webtools in mind. It's main purpose is to extend the use of these JavaScript playgrounds to allow debugging and demonstrations. But as it's just HTML added to the webpage, it can be styled and used in any project, for instance as an always open debugging-pane.

## Usage

### CDN / JSFiddle
Insert the following tag in your HTML:

```html
<script type="text/javascript" src="https://unpkg.com/html-console-output"></script>
```

Specifically for JSFiddle, add `https://unpkg.com/html-console-output` to the resources.

### NPM

Add the module to your project as a dependency
```shell
npm i html-console-output
```

Import the module ES6-style
```typescript
import 'html-console-output';
```
or CommonJS-style
```javascript
require('html-console-output');
```

## Build
Run development server with test-page:
```shell
npm run dev
```

Build for development from source code:
```shell
npm run build
```

Build for production from source code:
```shell
npm run build-prod
```

## Caveats
Most browsers when logging anything other than primitives to the console don't serialize the object to a string, but keep a reference to the original object. When inspecting the object in the console, you'll inspect the state it has at the time of inspecting, not the time of logging. html-console-ouput on the other hand captures the state at logging-time and serializes it to text.

Consider this example:
```javascript
var person = { name: 'John', age: 41};
console.log(person);

person.age += 1; // go shorty, it's your birthday

console.log(person);
```

When inspecting in Firefox it shows the state at the time of inspecting:<br>
![image](doc/screenshot-firefox.png)

When inspecting in html-console-output it shows the state at the time of logging:<br>
![image](doc/screenshot-html-console.png)

Actually I feel the latter is more useful when debugging timings and dynamic user interfaces, but it's something to keep in mind either way.

## License
Copyright 2019, Karim Ayachi

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
