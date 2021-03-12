# Demo App for the Composition API

## Context

> THIS DEMO IS QUITE OLD AND OUTDATED - THE FINAL APIS in Vue 3.0 are different in a few places. This demo will not be updated.

This repository contains a demo application meant to demonstrate various usecases and patterns that arise with the new composition API that Vuejs 3 will introduce.

It is meant as an extension of a talk about the new API which I gave at [Vuejs London 2019](https://vuejs.london) on October 4th, 2019. You can find the slides [here](https://github.com/LinusBorg/talks/tree/master/2019-10-04%20Vuejs%20London).

This repo represents the current state of my endeavor at playing with this API and seeing where it takes me, what patterns I can come up with etc., and I plan on adding new examples as I come up with / across them.

So keep in mind, it doesn't *do* anything useful, and it's also not a pretty thing to look at in the browser - it's meant as a demo of the API, nothing more. It's also not a good idea to take any of the demos as prescriptive in terms of the patterns used there. We as a community will have to figure out what the best patterns, the do's and don'ts will be, and I don't claim to have found the best ones yet.

## The talk

The slides for the talk can be found here:

https://github.com/LinusBorg/talks/tree/master/2019-10-04%20Vuejs%20London

If/when a video recoding of the talk has ben published I will update the README with a link.

The code in `/src` does differ from the slide examples, as the had to be simplified to fit on slides and be explainable in a 30 min talk.

The code for the slide examples can be found in `/slides-examples`.

## The examples - a quick overview

### The routes (`/views`)

The `/views` folder contains route components, each containing examples for different use cases. Most of these examples make  use of a few different composition functions.

- `Form.vue`: Using a composition function to do reactive form validation
- `Images.vue`: Build an Infinite Scrolling image gallery out of a few different composition functions (uses jsonplaceholder.typicode.com for the API - thanks!)
- `Posts.vue`: With a slight variation of the code used in `Images.vue`, this component paginates a pre-populated array of posts.
- `Upload.vue`: Demonstrates how to use composition functions to share a component's behaviour without a template, providing a more convenient and complete replacement of the "renderless components" pattern.

### The composition functions (`/composables`)

The `/composables` folder contains all of the composition functions used in these example components. They cover quite some different use cases and often, build upon each other by composing other, more primitive compositions functions to achieve something new.

Not all of the functions already have an example in `/views`, but most do. A few are not finished yet, but hopefully soon will be.

### Pagination

#### `use-pagination.js`

Provides reactive pagination state and functions to manipulate it.

#### `use-array-pagination.js`

Wrapping `usePagination`, it paginates an array that you pass to it.

### Event handling

#### `use-event.js`

A very basic wrapper around the pattern of adding event listeners imperatively in `mounted` and removing them in `beforeDestroy`.

It's the basis for a couple of more advanced a examples wrapping it.

#### `use-scroll.js`

Reactive state tracking the window's scroll position (and any other element).

#### `use-end-of-page.js`

Extending `use-scroll`, this composition function accepts a callback that is run when the page has been scrolled to the bottom (margin can be specified).

#### `use-media.js`

Boolean Ref indicating whether the specified media query is fulfilled or not.

### Handling Promises

#### `use-promise.js`

Wraps a function that returns a promise. Creates reactive state tracking `loading` state, `error` and `result` of the promise returned by calling that wrapped function.

#### `use-endpoint.js`

**unfinished** Similar to `use-promise`. Intended as an example of how to wrap a fetch library and cancel requests when the function is called again.

Current implementation isn't doing that in the way I want it to. Not used in any example right now for this reason.

### Form Validation

#### `use-validation.js`

Reactive form validation, overly simplified.

### "Renderless" component - File Dropzone

#### `use-filednd.js`

Returns various state and functions that can be used to easily build your own version of a dropzone for files.

#### `use-global-dnd.js`

Allows to track files being dragged into the browser window. Useful to highlight your dropzone when a file being dragged into the window so the user is guided to where the file can be dropped.

### Store

> This example is found in `/src/store`

Demonstrates how to create a Vuex-like state module and share it with components in a tree through provide & inject.

Still missing an example implementation

## Vuejs 2 Plugin

This App uses the `@vue/composition-api` package, which makes this new API available for experimentation in Vue 2 (with a few caveats).

## Contributing

I'd like to extend this project over time and collect more examples. I'll try and come up with a proper contributing guide later. Until then:

### Examples

I'm open to contributions and happy to help. Just open an issue with a short description of the example you want to add and I'll quickly review it - then you can send a PR.

### Tests

This repo has no tests so far, as I was short on time for my talk and don't work in a TDD fashion.

But I think adding tests would be great for example purposes, so I'm grateful for any contribution that adds tests for any of the examples.
