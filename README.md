ReactJS Shopping Cart

This is a simple shopping cart web app.

## Instructions

In the project directory, run:

### `yarn install`

Installs packages and dependencies required for the app to run.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
Currently runs 4 tests (Add product to cart, increase product quantity in cart, decrease product quantity in cart, and delete product from cart)

## Technical Decisions

1. 'useReducer', as it provides a built-in way to perform a number of different state operations with the help of the reducer function, which makes it more dynamic overall than 'useState'.

2. Context API, as it provides a way to pass data through the component tree without having to pass props down manually at every level. (Props drilling)

3. LocalStorage, used to store a user's cart data, so the data persists between sessions, with no expiration date.
