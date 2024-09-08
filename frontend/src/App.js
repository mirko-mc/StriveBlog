import React, { useContext, useEffect, useState } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthorContext } from "./context/AuthorContextProvider";
import { Me } from "./views/me/Me";

function App() {
  console.log("root => app.js");
  const { SetToken } = useContext(AuthorContext);
  
  // * blocco accesso google
  useEffect(() => {
    /** prendo il token dall'url */
    const JwtToken = new URLSearchParams(window.location.search).get("token");
    /** se esiste salvo il token nel localStorage, nel context e ridireziono alla home */
    if (JwtToken) {
      localStorage.setItem("token", JwtToken);
      SetToken(JwtToken);
    }
  }, [SetToken]);
  // * fine blocco accesso google
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blogPosts/:blogPostId" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
        <Route path="/me" element={<Me />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
