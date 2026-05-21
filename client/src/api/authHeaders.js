import { loadToken }
  from "../utils/authStorage";

/*
  🔐 Auth header helper

  Automatically attaches JWT token
  to protected backend requests.
*/
const getAuthHeaders = () => {

  const token =
    loadToken();

  return {
    "Content-Type":
      "application/json",

    Authorization:
      `Bearer ${token}`,
  };
};

export default getAuthHeaders;