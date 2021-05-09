export const API =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BACKEND_URL_PRODUCTION
    : process.env.REACT_APP_BACKEND;
