# Frontend Mentor - Stats preview card component solution

This is a solution to the [Stats preview card component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/stats-preview-card-component-8JqbgoU62). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - Stats preview card component solution](#frontend-mentor---stats-preview-card-component-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
  - [Author](#author)


## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [https://github.com/adamwozhere/frontend-mentor-challenges/tree/main/stats-preview-card-component/](https://github.com/adamwozhere/frontend-mentor-challenges/tree/main/stats-preview-card-component/)
- Live Site URL: [https://adamwozhere.github.io/frontend-mentor-challenges/stats-preview-card-component/](https://adamwozhere.github.io/frontend-mentor-challenges/stats-preview-card-component/)

## My process

I built this component mostly with BEM css to keep the styling scoped to the component itself, but using CUBE CSS also with some global properties (that I imagine would be set by design tokens globally if it were in a larger project) - accent colours being selected directly rather than by a class for example:
```
h2 span {
  color: var(--clr-accent);
}
```

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- BEM
- CUBE CSS

## Author

- Website - [Adam Wozniak](https://www.adamwozniak.uk)
- Frontend Mentor - [@adamwozhere](https://www.frontendmentor.io/profile/adamwozhere)


