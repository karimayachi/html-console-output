# html-console
Fancy html-based Javascript console output window

## What is it?
html-console appends console output to the HTML of the webpage. It was made for JSFiddle and similar webtools to extend the use of these JavaScript playgrounds for debugging and demonstration purposes. But as it's jus HTML added to the webpage, it can be styled and used in any project, for instance as an always open debugging-pane.

## Usage

### CDN / JSFiddle
Insert the following tag in your HTML:

```html
<script type="text/javascript" src="https://unpkg.com/html-console"></script>
```

Specifically for JSFiddle, add `https://unpkg.com/html-console` to the resources.

### NPM

In your project add the module as a dependency
```shell
npm i html-console
```

Add the module ES6-style
```typescript
import 'html-console';
```
or CommonJS-style
```javascript
require('html-console');
```

## Build
Run development server with test-page"
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