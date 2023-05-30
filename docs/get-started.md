# Get started with something

## Install
```bash
# requires node.js
$ npm install @aworldc/something
```
or <kbd><a href="https://raw.githubusercontent.com/Aworldc/Something/main/main.js">Download something -&gt;</a></kbd>

## Get some boilerplate running
I'm sure everyone knows this by now. But here it is anyway.
### Create an index.html file
Follow the damn title. Here's some boilerplate:
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <div class="app"></div>
        <script src="main.js"></script>
    </body>
</html>
```
### Create a javascript file
Again. Follow the title. Call it what you want, I don't care.<br>
Make sure to load it in to the html file ***in*** the body, but ***after*** all content. If you are not using a bundler, which is a very bad idea in production, make sure to add `type="module"` to your script tag, as something is esm-only.<br>
If you don't know what on earth a bundler is, you should probably go check out [esbuild](https://esbuild.github.io/).

## Import and use something
```javascript
// if installed via npm
// import { $, _ } from '@aworldc/something'
//
// if directly downloaded, replacing <filename> with whatever you saved something with
// import { $, _ } from './<filename>'

import { $, _ } from '@aworldc/something'

$('.app').insert(_('h1').text('Hello, world!'))
```
The above is just an example, obviously. if you couldn't guess what the code above does, it inserts `<h1>Hello, world!</h1>` into the element with a class of `app`.

## Read the documentation
Go on. Read it.<br>
Wait, you wanted a link? Oh ok. [Here](api/index.md).
