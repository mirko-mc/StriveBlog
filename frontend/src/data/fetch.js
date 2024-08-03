const FetchAuthorsUrl = "http://localhost:5000/authors";
const FetchBlogPostsUrl = "http://localhost:5000/blogPosts";

/** RECUPERA TUTTI GLI AUTORI */
export const GetAllAuthors = async () => {
  try {
    const res = await fetch(FetchAuthorsUrl);
    const data = await res.json();
    console.log("RES GetAllAuthors\n", res);
    console.log("DATA GetAllAuthors\n", data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log("ERR GetAllAuthors\n", err);
  }
};

/** RECUPERA IL SINGOLO AUTORE CON L'ID ASSOCIATO */
export const GetSingleAuthor = async (id) => {
  try {
    const res = await fetch(`${FetchAuthorsUrl}/${id}`);
    const data = await res.json();
    console.log("RES GetSingleAuthor\n", res);
    console.log("DATA GetSingleAuthor\n", data);
    if (!res.ok) throw new Error(res);
  } catch (err) {
    console.log("ERR GetSingleAuthor\n", err);
  }
};

/** CREA UN NUOVO AUTORE */
export const PostNewAutor = async (formValue) => {
  try {
    const res = await fetch(FetchAuthorsUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formValue),
    });
    const data = await res.json();
    console.log("RES PostNewAutor\n", res);
    console.log("DATA PostNewAutor\n", data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log("ERR PostNewAutor\n", err);
  }
};

/** MODIFICA UN AUTORE ESISTENTE CON L'ID ASSOCIATO */
export const PutEditAuthor = async (id, formValue) => {
  try {
    const res = await fetch(`${FetchAuthorsUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(formValue),
    });
    const data = await res.json();
    console.log("RES PutEditAuthor\n", res);
    console.log("DATA PutEditAuthor\n", data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log("ERR PutEditAuthor\n", err);
  }
};

/** CANCELLA L'AUTORE CON L'ID ASSOCIATO */
export const DeleteAuthor = async (id) => {
  try {
    const res = await fetch(`${FetchAuthorsUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    const data = await res.json();
    console.log("RES DeleteAuthor\n", res);
    console.log("DATA DeleteAuthor\n", data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log("ERR DeleteAuthor\n", err);
  }
};

/** /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ BLOGPOSTS /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ */

/** RECUPERA TUTTI I BlogPosts */
export const GetAllBlogPosts = async () => {
  try {
    const res = await fetch(FetchBlogPostsUrl);
    const data = await res.json();
    console.log("RES GetAllBlogPosts\n", res);
    console.log("DATA GetAllBlogPosts\n", data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log("ERR GetAllBlogPosts\n", err);
  }
};

/** RECUPERA IL SINGOLO BLOGPOST CON L'ID ASSOCIATO */
export const GetSingleBlogPost = async (id) => {
  try {
    const res = await fetch(`${FetchBlogPostsUrl}/${id}`);
    const data = await res.json();
    console.log("RES GetSingleBlogPost\n", res);
    console.log("DATA GetSingleBlogPost\n", data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log("ERR GetSingleBlogPost\n", err);
  }
};

/** RECUPERA I BLOGPOSTS DI UN AUTORE CON L'ID ASSOCIATO */
export const GetAuthorBlogPosts = async (id) => {
  try {
    const res = await fetch(`${FetchAuthorsUrl}/${id}/blogPosts`);
    const data = await res.json();
    console.log("RES GetAuthorBlogPosts\n", res);
    console.log("DATA GetAuthorBlogPosts\n", data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log("ERR GetAuthorBlogPosts\n", err);
  }
};

/** FILTRA I BLOGPOSTS RESTITUENDONE L'UNICO CHE CORRISPONDA ALLA CONDIZIONE DI RICERCA */
export const GetBlogPostsQueryTitle = async (title) => {
  try {
    const res = await fetch(`${FetchBlogPostsUrl}?title=${title}`);
    const data = await res.json();
    console.log("RES GetBlogPostsQueryTitle\n", res);
    console.log("DATA GetBlogPostsQueryTitle\n", data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log("ERR GetBlogPostsQueryTitle\n", err);
  }
};

/** CREA UN NUOVO BLOGPOST */
export const PostNewBlogPost = async (formValue) => {
  try {
    const res = await fetch(FetchBlogPostsUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formValue),
    });
    const data = await res.json();
    console.log("RES PostNewBlogPost\n", res);
    console.log("DATA PostNewBlogPost\n", data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log("ERR PostNewBlogPost\n", err);
  }
};

/** MODIFICA IL BLOGPOST CON L'ID ASSOCIATO */
export const PutEditBlogPost = async (id, formValue) => {
  try {
    const res = await fetch(`${FetchBlogPostsUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(formValue),
    });
    const data = await res.json();
    console.log("RES PutEditBlogPost\n", res);
    console.log("DATA PutEditBlogPost\n", data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log("ERR PutEditBlogPost\n", err);
  }
};

/** ELIMINA IL BLOGPOST CON L'ID ASSOCIATO */
export const DeleteBlogPost = async (id) => {
  try {
    const res = await fetch(`${FetchBlogPostsUrl}/${id}`);
    const data = await res.json();
    console.log("RES DeleteBlogPost\n", res);
    console.log("DATA DeleteBlogPost\n", data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log("ERR DeleteBlogPost\n", err);
  }
};
