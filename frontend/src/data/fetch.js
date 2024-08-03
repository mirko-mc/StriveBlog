const FetchAuthorsUrl = "http://localhost:5000/authors";
const FetchBlogPostsUrl = "http://localhost:5000/blogPosts";

/** RECUPERA TUTTI GLI AUTORI */
export const GetAllAuthors = async () => {
  try {
    const res = await fetch(FetchAuthorsUrl);
    const data = await res.json();
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log(err);
  }
};

/** RECUPERA IL SINGOLO AUTORE CON L'ID ASSOCIATO */
export const GetSingleAuthor = async (id) => {
  try {
    const res = await fetch(`${FetchAuthorsUrl}/${id}`);
    const data = await res.json();
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(res);
  } catch (err) {
    console.log(err);
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
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log(err);
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
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log(err);
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
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log(err);
  }
};

/** /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ BLOGPOSTS /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ */

/** RECUPERA TUTTI I BlogPosts */
export const GetAllBlogPosts = async () => {
  try {
    const res = await fetch(FetchBlogPostsUrl);
    const data = await res.json();
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log(err);
  }
};

/** RECUPERA IL SINGOLO BLOGPOST CON L'ID ASSOCIATO */
export const GetSingleBlogPost = async (id) => {
  try {
    const res = await fetch(`${FetchBlogPostsUrl}/${id}`);
    const data = await res.json();
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log(err);
  }
};

/** RECUPERA I BLOGPOSTS DI UN AUTORE CON L'ID ASSOCIATO */
export const GetAuthorBlogPosts = async (id) => {
  try {
    const res = await fetch(`${FetchAuthorsUrl}/${id}/blogPosts`);
    const data = await res.json();
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log(err);
  }
};

/** FILTRA I BLOGPOSTS RESTITUENDONE L'UNICO CHE CORRISPONDA ALLA CONDIZIONE DI RICERCA */
export const GetBlogPostsQueryTitle = async (title) => {
  try {
    const res = await fetch(`${FetchBlogPostsUrl}?title=${title}`);
    const data = await res.json();
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log(err);
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
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log(err);
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
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log(err);
  }
};

/** ELIMINA IL BLOGPOST CON L'ID ASSOCIATO */
export const DeleteBlogPost = async (id) => {
  try {
    const res = await fetch(`${FetchBlogPostsUrl}/${id}`);
    const data = await res.json();
    console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log(err);
  }
};
