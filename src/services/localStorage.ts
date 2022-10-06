export const setKey = (key: string) =>
  localStorage.setItem("api_key", key);

export const getKey = () => 
  localStorage.getItem("api_key") ?
    localStorage.getItem("api_key") :
    process.env.REACT_APP_API_KEY;
