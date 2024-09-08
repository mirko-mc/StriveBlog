const FetchAuthorsUrl = `${process.env.REACT_APP_API_URL}/authors`;
const FetchBlogPostsUrl = `${process.env.REACT_APP_API_URL}/blogPosts`;

// * /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ AUTHORS /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ * \\

/** RECUPERA TUTTI GLI AUTORI */
export const GetAllAuthors = async (page, perPage) => {
  try {
    console.log("data => fetch.js - GetAllAuthors");
    let res = null;
    if (!perPage || !page) res = await fetch(FetchBlogPostsUrl);
    else
      res = await fetch(`${FetchAuthorsUrl}?page=${page}&perPage=${perPage}`);
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR GetAllAuthors\n", err);
  }
};

/** RECUPERA IL SINGOLO AUTORE CON L'ID ASSOCIATO */
export const GetSingleAuthor = async (id) => {
  try {
    console.log("data => fetch.js - GetSingleAuthor");
    const res = await fetch(`${FetchAuthorsUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR GetSingleAuthor\n", err);
  }
};

/** CREA UN NUOVO AUTORE */
export const PostNewAuthor = async (formValue) => {
  try {
    console.log("data => fetch.js - PostNewAutor");
    const res = await fetch(FetchAuthorsUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify(formValue),
    });
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR PostNewAutor\n", err);
  }
};

/** MODIFICA UN AUTORE ESISTENTE CON L'ID ASSOCIATO */
export const PutEditAuthor = async (id, formValue) => {
  try {
    console.log("data => fetch.js - PutEditAuthor");
    const res = await fetch(`${FetchAuthorsUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PUT",
      body: JSON.stringify(formValue),
    });
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR PutEditAuthor\n", err);
  }
};

/** CANCELLA L'AUTORE CON L'ID ASSOCIATO */
export const DeleteAuthor = async (id) => {
  try {
    console.log("data => fetch.js - DeleteAuthor");
    const res = await fetch(`${FetchAuthorsUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "DELETE",
    });
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR DeleteAuthor\n", err);
  }
};

/** RECUPERA I BLOGPOSTS DI UN AUTORE CON L'ID ASSOCIATO */
export const GetAuthorBlogPosts = async (id) => {
  try {
    console.log("data => fetch.js - GetAuthorBlogPosts");
    const res = await fetch(`${FetchAuthorsUrl}/${id}/blogPosts`);
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR GetAuthorBlogPosts\n", err);
  }
};

// * /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ BLOGPOSTS /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ * \\

/** RECUPERA TUTTI I BlogPosts */
export const GetAllBlogPosts = async (page, perPage, title) => {
  try {
    console.log("data => fetch.js - GetAllBlogPosts");
    let NewFetchUrl = FetchBlogPostsUrl;
    (page || perPage || title) && (NewFetchUrl += "?");
    (page || perPage) && (NewFetchUrl += `page=${page}&perPage=${perPage}`);
    page && perPage && title && (NewFetchUrl += "&");
    title && (NewFetchUrl += `title=${title}`);
    const res = await fetch(NewFetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR GetAllBlogPosts\n", err);
  }
};

/** RECUPERA IL SINGOLO BLOGPOST CON L'ID ASSOCIATO */
export const GetSingleBlogPost = async (id) => {
  try {
    console.log("data => fetch.js - GetSingleBlogPost");
    const res = await fetch(`${FetchBlogPostsUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR GetSingleBlogPost\n", err);
  }
};

/** FILTRA I BLOGPOSTS RESTITUENDONE L'UNICO CHE CORRISPONDA ALLA CONDIZIONE DI RICERCA */
export const GetBlogPostsQueryTitle = async (title) => {
  try {
    console.log("data => fetch.js - GetBlogPostsQueryTitle");
    const res = await fetch(`${FetchBlogPostsUrl}?title=${title}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR GetBlogPostsQueryTitle\n", err);
  }
};

/** CREA UN NUOVO BLOGPOST */
export const PostNewBlogPost = async (formValue) => {
  try {
    console.log("data => fetch.js - PostNewBlogPost");
    const res = await fetch(FetchBlogPostsUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify(formValue),
    });
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR PostNewBlogPost\n", err);
  }
};

/** MODIFICA IL BLOGPOST CON L'ID ASSOCIATO */
export const PutEditBlogPost = async (id, formValue) => {
  try {
    console.log("data => fetch.js - PutEditBlogPost");
    const res = await fetch(`${FetchBlogPostsUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PUT",
      body: JSON.stringify(formValue),
    });
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR PutEditBlogPost\n", err);
  }
};

/** ELIMINA IL BLOGPOST CON L'ID ASSOCIATO */
export const DeleteBlogPost = async (id) => {
  try {
    console.log("data => fetch.js - DeleteBlogPost");
    const res = await fetch(`${FetchBlogPostsUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "DELETE",
    });
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR DeleteBlogPost\n", err);
  }
};

// PATCH /blogPosts/:blogPostId/cover, carica un'immagine per il post specificato dall'id. Salva l'URL creato da Cloudinary nel post corrispondente.
export const PatchPicture = async (type, id, fD) => {
  try {
    console.log("data => fetch.js - PatchPicture");
    const NewFetchUrl =
      type && type === "cover"
        ? `${FetchBlogPostsUrl}/${id}/${type}`
        : `${FetchAuthorsUrl}/${id}/${type}`;
    const res = await fetch(NewFetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      body: fD,
    });
    if (!res.ok) throw new Error(res);
    const data = res.json();
    return data;
  } catch (err) {
    console.log("ERR PatchPicture\n", err);
  }
};

// * /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ AUTH /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ * //
/** /login */
export const PostLogin = async (formValue) => {
  try {
    console.log("data => fetch.js - PostLogin");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formValue),
    });
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR PostLogin\n", err);
  }
};

/** /me */
export const GetMe = async () => {
  try {
    console.log("data => fetch.js - GetMe");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR GetMe\n", err);
    throw new Error(err.message);
  }
};

// * /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ COMMENT /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ * //
/** GET /blogPosts/:blogPostId/comments => ritorna tutti commenti di uno specifico post */
export const GetAllComments = async (BlogPostId) => {
  try {
    console.log("data => fetch.js - GetAllComments");
    const res = await fetch(`${FetchBlogPostsUrl}/${BlogPostId}/comments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log("ERR GetAllComments\n", err);
  }
};

/** GET /blogPosts/:blogPostId/comments/:commentId => ritorna un commento specifico di un post specifico */
export const GetSingleComment = async (BlogPostId, CommentId) => {
  try {
    console.log("data => fetch.js - GetSingleComment");
    const res = await fetch(
      `${FetchBlogPostsUrl}/${BlogPostId}/comments/${CommentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR GetSingleComment\n", err);
  }
};

/** POST /blogPosts/:blogPostId => aggiungi un nuovo commento ad un post specifico */
export const PostComment = async (BlogPostId, Comment) => {
  try {
    console.log("data => fetch.js - PostComment");
    const res = await fetch(`${FetchBlogPostsUrl}/${BlogPostId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(Comment),
    });
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR PostComment\n", err);
  }
};

/** PUT /blogPosts/:blogPostId/comment/:commentId => cambia un commento di un post specifico */
export const PutComment = async (BlogPostId, CommentId, Comment) => {
  try {
    console.log("data => fetch.js - PutComment");
    const res = await fetch(
      `${FetchBlogPostsUrl}/${BlogPostId}/comment/${CommentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(Comment),
      }
    );
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR PutComment\n", err);
  }
};

/** DELETE /blogPosts/:blogPostId/comment/:commentId => elimina un commento specifico da un post specifico. */
export const DeleteComment = async (BlogPostId, CommentId) => {
  try {
    console.log("data => fetch.js - DeleteComment");
    const res = await fetch(
      `${FetchBlogPostsUrl}/${BlogPostId}/comment/${CommentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "DELETE",
      }
    );
    if (!res.ok) throw new Error(res);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERR DeleteComment\n", err);
  }
};

/** /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ FINE COMMENT /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ */

// /** /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ RANDOM DATA /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ */
// const names = [
//   "Andrea",
//   "Antonio",
//   "Chris",
//   "Christian",
//   "Cosimo",
//   "Giorgia",
//   "Giovanni",
//   "Maria Clara Rezende",
//   "Marialucia",
//   "Martina",
//   "Mauro",
//   "Mirko",
//   "Patrizia",
//   "Petro",
//   "Roberto",
//   "Samuele",
//   "Sara",
//   "Umberto",
//   "Vincenzo",
//   "Vladislava",
// ];
// const surnames = [
//   "Allocco",
//   "Brinza",
//   "Calabrese",
//   "Campetiello",
//   "Casetta",
//   "Casotto",
//   "Cavalca",
//   "Conedera",
//   "Di Maria",
//   "Fedele",
//   "Giudice",
//   "Lombardi",
//   "Marasciulo",
//   "Martina",
//   "Martinelli",
//   "Moretto",
//   "Olivieri",
//   "Patti",
//   "Ruocco",
//   "Sota",
// ];

// const blogPostTitles = [
//   "Innovare con il Cloud",
//   "Dallo sviluppo di software al Data Science",
//   "Il web come piattaforma di vendita",
//   "Il futuro del web: le nuove tecnologie e come fare a saperne di più",
//   "Il viaggiatore immersivo: la realtà aumentata nelle sue potenzialità",
//   "L'arte del networking: 10 consigli per connetterti al mondo",
//   "Il marketing digitale: come conquistare il web",
//   "La programmazione per principianti: come imparare a programmare",
//   "Il web come piattaforma di socializzazione",
//   "La gestione dei progetti software: 10 consigli per gestirli correttamente",
//   "Il web come piattaforma di e-commerce",
//   "Il web come piattaforma di intrattenimento",
//   "Il web come piattaforma di comunicazione",
//   "Il web come piattaforma di business",
//   "Il web come piattaforma di e-learning",
//   "Il web come piattaforma di innovazione",
//   "Il web come piattaforma di marketing digitale",
//   "Il web come piattaforma di sviluppo di software",
//   "Il web come piattaforma di realtà aumentata",
// ];

// const blogPostContents = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed magna risus, vulputate in tempor eu, blandit non metus. Donec tincidunt vestibulum est vel lobortis. Quisque gravida libero vel tortor rutrum, non tempor risus lacinia. Vivamus tincidunt feugiat ultricies. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent ac efficitur libero. Morbi eu est ac ipsum rhoncus interdum quis vitae risus. Etiam rutrum placerat turpis, in convallis risus venenatis et. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed maximus egestas mauris id pharetra. Praesent auctor nisi rhoncus dictum consequat. Etiam ut lacus rhoncus, iaculis quam vitae, porttitor ipsum. Curabitur fringilla congue lacus, at placerat odio posuere at. Etiam vestibulum et odio ac ultricies. Donec ac pretium libero. Quisque non vehicula tellus. Sed turpis lacus, posuere eget tortor a, maximus aliquet quam. Aenean condimentum a orci eget ultrices. Nam tortor arcu, mollis eu metus vitae, auctor lacinia magna. Sed cursus est mauris, eu sagittis neque dictum imperdiet. Duis viverra dignissim nunc sit amet rhoncus. Maecenas ex nulla, pellentesque nec enim vel, iaculis sollicitudin velit. Maecenas cursus euismod sollicitudin. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus finibus urna nunc, vel vulputate lectus facilisis a. In arcu justo, vehicula id nulla quis, vulputate faucibus nisi. Duis sit amet risus sed nunc vehicula interdum tempor placerat libero.

// `;
// const categories = [
//   "Categoria 1",
//   "Categoria 2",
//   "Categoria 3",
//   "Categoria 4",
//   "Categoria 5",
// ];
// const getRandomData = (data) => {
//   const randomIndex = Math.floor(Math.random() * data.length);
//   return data[randomIndex];
// };

// const GetRandomBirthDate = () => {
//   const birthDate = new Date();
//   birthDate.setFullYear(
//     Math.floor(Math.random() * (2005 - 1970)) + 1970,
//     Math.floor(Math.random() * 12),
//     Math.floor(Math.random() * 28) + 1
//   );
//   return birthDate.toISOString().split("T")[0];
// };

// const CreateRandomAuthor = async () => {
//   const name = await getRandomData(names);
//   const surname = await getRandomData(surnames);
//   const email = `${name.toLowerCase()}@${surname.toLowerCase()}.com`;
//   // const birthDate = GetRandomBirthDate();
//   return {
//     name,
//     surname,
//     email,
//     birthDate: GetRandomBirthDate(),
//     avatar:
//       "https://njhalloffame.org/wp-content/uploads/2021/04/generic-avatar-300x300.png",
//   };
// };

// const CreateRandomBlogPost = async () => {
//   const allAuthorsId = [];
//   await GetAllAuthors(20).then((data) => {
//     for (const ITEM of data.data) {
//       allAuthorsId.push(ITEM._id);
//     }
//   });
//   console.table(allAuthorsId);
//   const category = await getRandomData(categories);
//   const title = await getRandomData(blogPostTitles);
//   const author = await getRandomData(allAuthorsId);
//   return {
//     category,
//     title,
//     cover: "https://picsum.photos/1000/300",
//     // readTime,
//     author,
//     content: blogPostContents,
//   };
// };
// export const setRandomAuthors = async () => {
//   console.log("SETRANDOMAUTHORS => randomAuthor");
//   for (let i = 0; i < 20; i++) {
//     const randomAuthor = await CreateRandomAuthor().catch((err) =>
//       console.log(err)
//     );
//     await PostNewAuthor(randomAuthor)
//       .then(() => console.log(`Author ${i + 1} created`))
//       .catch((err) => console.log(err));
//   }
// };
// export const setRandomBlogPosts = async () => {
//   console.log("SETRANDOMBLOGPOSTS => randomBlogPost");
//   for (let i = 0; i < 20; i++) {
//     const randomBlogPost = await CreateRandomBlogPost().catch((err) =>
//       console.log(err)
//     );
//     await PostNewBlogPost(randomBlogPost);
//     // console.log(randomBlogPost);
//   }
// };
