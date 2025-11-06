# Get started with something

<kbd><a href="/docs/index.md">Home</a></kbd> / <kbd>Get Started</kbd><br><br>

## Install

```bash
# requires node.js and pnpm. if you don't use pnpm replace pnpm with npm
$ pnpm install @aworldc/something
# or clone the repo (probably best right now as the npm package is wildly out of date)
$ git clone https://github.com/Aworldc/something
```

## Get some boilerplate running

I'm sure everyone knows this by now. But here it is anyway.

### Create an index.html file

Follow the damn title. Here's some copy-paste if you want it:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <div class="app"></div>
        <script type="module" src="main.js"></script>
    </body>
</html>
```

### Create a javascript file

Again. Follow the title. Call it whatever you want, I don't care.<br> Make sure
to load it in to the html file **_in_** the body, but **_after_** all content.

If you are not using a bundler, which is a very bad idea in production, make
sure to add `type="module"` to your script tag, as something is built on es
modules.

If you don't know what on earth a bundler is, you should probably go check out
[esbuild](https://esbuild.github.io/).

## Import and use something

```javascript
import { $, _ } from '@aworldc/something'

$('.app').insert(_('h1').text('Hello, world!'))
```

The above is just an example, obviously. if you couldn't guess what the code
above does, it inserts `<h1>Hello, world!</h1>` into the first element with a
class of `app`.

## Read the documentation

Yes, I know. You have to read the ~~freaking~~ friendly manual.<br>Wait, you
wanted a link? Oh ok. [Here](api.md).

Or continue with the tutorial, [over the page](/docs/using-reactivity.md).
