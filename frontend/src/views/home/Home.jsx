import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import {
  setRandomAuthors,
  GetAllBlogPosts,
  setRandomBlogPosts,
} from "../../data/fetch";

const Home = (props) => {
  /**
   * !!! refactorizzare dopo la modifica del frontend. la ricerca del blogPost era ben implementata nel backend ma la ripetevo nel frontend
   */
  const [AllBlogPosts, setAllBlogPosts] = useState({});
  const [BlogPostsToRender, setBlogPostsToRender] = useState([]);
  const { SearchBlogPost } = props;

  const HandleGetAllBlogPosts = async () => {
    /** ESEGUO LA FETCH PER RECUPERARE TUTTI I BLOGPOSTS E LI INSERISCO NELLO STATO */
    const Posts = await GetAllBlogPosts(null, null, SearchBlogPost);
    return setAllBlogPosts(Posts);
  };

  useEffect(() => {
    /** UTILIZZO DELLE FUNZIONI ASYNC PER POPOLARE LO STATO COSI' DA NON TRIGGERARE LO USEFFECT PRIMA CHE LA FETCH SIA COMPLETATA */
    HandleGetAllBlogPosts();
    // console.log("USE EFFECT => !AllBlogPosts?.data\n", !AllBlogPosts?.data);
    /** SE SIA ALLTHEBLOGPOSTS CHE SEARCHBLOGPOST SONO VALORIZZATI VUOL DIRE CHE L'UTENTE VUOLE EFFETTUARE UNA RICERCA... */
    // if (AllBlogPosts && SearchBlogPost) {
    //   /** ...ALLORA FILTRO I BLOGPOSTS SUL TITOLO PER RESTITUIRE SOLO I BLOGPOSTS CHE STA CERCANDO... */
    //   const FilteredBlogPosts = AllBlogPosts.data.filter((blogPost) =>
    //     blogPost.title.toLowerCase().includes(SearchBlogPost.toLowerCase())
    //   );
    /** ...E LI SETTO NELLO STATO DEI BLOGPOSTS DA RENDERIZZARE... */
    // setBlogPostsToRender(FilteredBlogPosts);
    // console.log("THEN\n", BlogPostsToRender);
    // } else {
    /** ...ALTRIMENTI SETTO TUTTI I BLOGPOSTS NELLO STATO DEI BLOGPOSTS DA RENDERIZZARE PERCHE' L'UTENTE NON STA EFFETTUANDO UNA RICERCA */
    // setBlogPostsToRender(AllBlogPosts?.data);
    // console.log("ELSE\n", BlogPostsToRender);
    // }
    /** AD USEEFFECT AGGANCIO SIA ALLBLOGPOSTS CHE SEARCHBLOGPOST AFFINCHE' LO STATO DEI BLOGPOSTS DA RENDERIZZARE SIA SEMPRE AGGIORNATO */
  }, [SearchBlogPost]);

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <Row className="justify-content-evenly">
        <Button onClick={setRandomAuthors}>Genera 20 autori casuali</Button>
        <Button onClick={setRandomBlogPosts}>Genera 20 post casuali</Button>
      </Row>
      {AllBlogPosts?.data && (
        <BlogList BlogPostsToRender={AllBlogPosts?.data} />
      )}
    </Container>
  );
};

export default Home;
