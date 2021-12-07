// Prod and Development URL's allow us to dynamically change the
// url of the API endpoint that should be hit during development.
// Running the react app with a Development flag uses localhost:8000
// as the end URL, which lets us develop the frontend and backend side
// by side.
const PROD_URL = "";
const DEV_URL = "localhost:8000";

const BASE_URL =
  process.env.REACT_APP_ENVIRONMENT === "development" ? DEV_URL : PROD_URL;

const API_URL = [BASE_URL, "api"].join("/")

export {
  PROD_URL,
  DEV_URL,
  BASE_URL,
  API_URL
};
