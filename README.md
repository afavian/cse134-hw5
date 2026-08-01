# Andrea Favian Cruz 
## Local Setup

### Install dependencies 
```bash
npm install
```
### Run the development server
```bash
npm start
```
### Build the site
```bash
npm run build
```

## Part 1
I completed **Option A: Theme Picker**
Without JavaScript, the site automatically follows the user's operating system preferences using the CSS `perfers-color-scheme` media query and `color-scheme`. 

## Part 2
Custom Element: `<weather-widget>`

Supported Attributes: attribute --> location, description --> city name, default --> san diego

The component supports the idle, loading, success, and error states. 

## Part 3
This project uses **Eleventy (11ty)**. Using Eleventy removed duplicated HTML across pages by moving shared content into layouts and reusable components. Nav, headers, footers, and metadata are now defined once instead of being copied onto every page. 

It is a more complex structure, therefore, I think I would just stick with the writing the nav, headers, footers and metadata onto every page :) 
