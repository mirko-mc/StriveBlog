import { createContext, useEffect, useState } from "react";
import { GetMe } from "../data/fetch.js";
export const AuthorContext = createContext();

export const AuthorContextProvider = ({ children }) => {
  const [AuthAuthor, SetAuthAuthor] = useState();
  const [Token, SetToken] = useState(localStorage.getItem("token"));

  const GetMeData = async () => {
    const Me = await GetMe();
    SetAuthAuthor(Me);
  };

  useEffect(() => {
    if (Token) GetMeData();
  }, [Token]);

  const value = { AuthAuthor, Token, SetToken };
  return (
    <AuthorContext.Provider value={value}>{children}</AuthorContext.Provider>
  );
};
