import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { GetAllBlogPosts } from "../../data/fetch";

const Home = (props) => {
  const [AllBlogPosts, setAllBlogPosts] = useState({});
  const [BlogPostsToRender, setBlogPostsToRender] = useState([]);
  const { SearchBlogPost } = props;

  const HandleGetAllBlogPosts = async () => {
    /** ESEGUO LA FETCH PER RECUPERARE TUTTI I BLOGPOSTS E LI INSERISCO NELLO STATO */
    // le due righe successive eseguono la medesima cosa. quale modo è più corretto?
    // return await GetAllBlogPosts().then((data) => setAllBlogPosts(data));
    return setAllBlogPosts(await GetAllBlogPosts());
  };

  useEffect(() => {
    /** UTILIZZO UNA FUNZIONE ASYNC PER POPOLARE LO STATO COSI' DA NON TRIGGERARE LO USEFFECT PRIMA CHE LA FETCH SIA COMPLETATA */
    !AllBlogPosts?.data && HandleGetAllBlogPosts();
    // console.log("USE EFFECT => !AllBlogPosts?.data\n", !AllBlogPosts?.data);
    /** SE SIA ALLTHEBLOGPOSTS CHE SEARCHBLOGPOST SONO VALORIZZATI VUOL DIRE CHE L'UTENTE VUOLE EFFETTUARE UNA RICERCA... */
    if (AllBlogPosts && SearchBlogPost) {
      /** ...ALLORA FILTRO I BLOGPOSTS SUL TITOLO PER RESTITUIRE SOLO I BLOGPOSTS CHE STA CERCANDO... */
      const FilteredBlogPosts = AllBlogPosts.data.filter((blogPost) =>
        blogPost.title.toLowerCase().includes(SearchBlogPost.toLowerCase())
      );
      /** ...E LI SETTO NELLO STATO DEI BLOGPOSTS DA RENDERIZZARE... */
      setBlogPostsToRender(FilteredBlogPosts);
      // console.log("THEN\n", BlogPostsToRender);
    } else {
      /** ...ALTRIMENTI SETTO TUTTI I BLOGPOSTS NELLO STATO DEI BLOGPOSTS DA RENDERIZZARE PERCHE' L'UTENTE NON STA EFFETTUANDO UNA RICERCA */
      setBlogPostsToRender(AllBlogPosts?.data);
      // console.log("ELSE\n", BlogPostsToRender);
    }
    /** ALLO USEEFFECT AGGANCIO SIA ALLBLOGPOSTS CHE SEARCHBLOGPOST AFFINCHE' LO STATO DEI BLOGPOSTS DA RENDERIZZARE SIA SEMPRE AGGIORNATO */
  }, [AllBlogPosts, SearchBlogPost]);

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      {BlogPostsToRender && <BlogList BlogPostsToRender={BlogPostsToRender} />}
    </Container>
  );
};

export default Home;
