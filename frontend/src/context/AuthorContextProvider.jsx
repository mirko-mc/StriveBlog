import { createContext, useEffect, useState } from "react";
import { GetMe } from "../data/fetch.js";
export const AuthorContext = createContext();

export const AuthorContextProvider = ({ children }) => {
  const [AuthAuthor, SetAuthAuthor] = useState();
  const [Token, SetToken] = useState(localStorage.getItem("token"));

  const GetMeData = async () => {
    try {
      const Me = await GetMe();
      SetAuthAuthor(Me);
    } catch (err) {
      console.log(err.message);
      if (err.message === "401") {
        SetToken(null);
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    if (Token) GetMeData();
  }, [Token]);

  const value = { AuthAuthor, Token, SetToken };
  return (
    <AuthorContext.Provider value={value}>{children}</AuthorContext.Provider>
  );
};
