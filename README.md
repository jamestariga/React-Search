# Useful Search Functions in React

- Debounce with a custom hook
- Filter

## Quick Start

Clone the repository

```
git clone this_repo
```

Install the dependencies

```
npm install
```

Run the server

```
npm run dev
```

## Constraints

- In the debounce example, the state that is passed in the useDebounce hook's param must be a string.

- Example of open API's that this will work with includes the openweathermap's API and spoonacular's API.

- In the filter example, you will need to initialize two array states. One of the states is a deep copy of the other state.

- useEffect must fire on mount as you will need to fetch the API.
