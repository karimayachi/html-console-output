# html-console-output
Fancy html-based Javascript console output window

## What is it?
html-console-output appends console output to the HTML of the webpage. It was made for JSFiddle and similar webtools to extend the use of these JavaScript playgrounds for debugging and demonstration purposes. But as it's jus HTML added to the webpage, it can be styled and used in any project, for instance as an always open debugging-pane.

## Usage

### CDN / JSFiddle
Insert the following tag in your HTML:

```html
<script type="text/javascript" src="https://unpkg.com/html-console-output"></script>
```

Specifically for JSFiddle, add `https://unpkg.com/html-console-output` to the resources.

### NPM

In your project add the module as a dependency
```shell
npm i html-console-output
```

Add the module ES6-style
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

## License
Copyright 2019, Karim Ayachi

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
