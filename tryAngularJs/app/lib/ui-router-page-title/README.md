# ui-router-page-title [![Tests](https://github.com/sibiraj-s/ui-router-page-title/workflows/Tests/badge.svg)](https://github.com/sibiraj-s/ui-router-page-title/actions)

Dynamic Page Title directive for angular-ui-router(>=1.0.0)

## Getting Started

### Installation

You can directly clone/download [here][ui-router-page-title]

```bash
git clone https://github.com/sibiraj-s/ui-router-page-title.git
```

or use cdn

**Minified:**

```bash
//cdn.jsdelivr.net/npm/ui-router-page-title@latest/page-title.min.js
```

**Pretty Printed:**

```bash
//cdn.jsdelivr.net/npm/ui-router-page-title@latest/page-title.js
```

or

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ui-router-page-title --save
# or
yarn add ui-router-page-title
```

### Usage

Import the modules required for ui-router-page-title. It is necessary to include [ui.router][uirouter] for ui-router-page-title to work

```html
<script src="angular.min.js"></script>
<script src="angular-ui-router.min.js"></script>
<script src="../page-title.min.js"></script>
```

add `uiRouterTitle` dependency to the module

```js
angular.module('myApp', ['uiRouterTitle']);
```

in routes config

```js
$stateProvider.state('home', {
  url: '/home',
  data: {
    pageTitle: 'Home'
  },
  template: '<h3>Home Page!</h3>'
});
```

and in your html

```html
<title page-title>Page Title</title>
```

[uirouter]: https://ui-router.github.io/
[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[github]: https://sibiraj-s.github.io/
[ui-router-page-title]: https://github.com/sibiraj-s/ui-router-page-title
[demo]: https://sibiraj-s.github.io/ui-router-page-title/
