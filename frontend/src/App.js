import React, { useState } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthorContextProvider } from "./context/AuthorContextProvider";
import { Me } from "./views/me/Me";

function App() {
  const [SearchBlogPost, setSearchBlogPost] = useState("");
  return (
    <AuthorContextProvider>
      <Router>
        <NavBar setSearchBlogPost={setSearchBlogPost} />
        <Routes>
          <Route
            path="/"
            exact
            element={<Home SearchBlogPost={SearchBlogPost} />}
          />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/new" element={<NewBlogPost />} />
          <Route path="/me" element={<Me />}></Route>
        </Routes>
        <Footer />
      </Router>
    </AuthorContextProvider>
  );
}

export default App;
