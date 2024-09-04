const FetchAuthorsUrl = "http://localhost:5000/authors";
const FetchBlogPostsUrl = "http://localhost:5000/blogPosts";

/** /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ AUTHORS /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ */

/** RECUPERA TUTTI GLI AUTORI */
export const GetAllAuthors = async (page, perPage) => {
  try {
    let res = null;
    if (!perPage || !page) res = await fetch(FetchBlogPostsUrl);
    else
      res = await fetch(`${FetchAuthorsUrl}?page=${page}&perPage=${perPage}`);
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
export const PostNewAuthor = async (formValue) => {
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

/** /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ BLOGPOSTS /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ */

/** RECUPERA TUTTI I BlogPosts */
export const GetAllBlogPosts = async (page, perPage, title) => {
  try {
    let NewFetchUrl = FetchBlogPostsUrl;
    (page || perPage || title) && (NewFetchUrl += "?");
    (page || perPage) && (NewFetchUrl += `page=${page}&perPage=${perPage}`);
    page && perPage && title && (NewFetchUrl += "&");
    title && (NewFetchUrl += `title=${title}`);
    // let res = null;
    // if (!perPage || !page) {
    //   if (!title) res = await fetch(FetchBlogPostsUrl);
    //   else res = await fetch(`${FetchBlogPostsUrl}?title=${title}`);
    // } else
    //   res = await fetch(`${FetchBlogPostsUrl}?page=${page}&perPage=${perPage}`);
    const res = await fetch(NewFetchUrl);
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
    console.log("PostNewBlogPost formValue\n", formValue);
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
    console.log("RES PostNewBlogPost\n", res);
    console.log("DATA PostNewBlogPost\n", data);
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

// PATCH /blogPosts/:blogPostId/cover, carica un'immagine per il post specificato dall'id. Salva l'URL creato da Cloudinary nel post corrispondente.
// upload coverBlogPost
// TODO upload authorProPic
export const PatchPicture = async (type, id, fD) => {
  try {
    console.log(id);
    const NewFetchUrl =
      type && type === "cover"
        ? `${FetchBlogPostsUrl}/${id}/${type}`
        : `${FetchAuthorsUrl}/${id}/${type}`;
    const res = await fetch(NewFetchUrl, {
      method: "PATCH",
      body: fD,
    });
    const data = res.json();
    console.log("RES PatchPicture\n", res);
    console.log("DATA PatchPicture\n", data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log("ERR PatchPicture\n", err);
  }
};

/** /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ AUTH /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ */
//??? LOGIN
export const PostLogin = async (formValue) => {
  try {
    console.log("data => fetch.js - PostLogin");
    const res = await fetch("http://localhost:5000/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formValue),
    });
    console.log("RES PostLogin\n", res);
    const data = await res.json();
    console.log("DATA PostLogin\n", data);
    if (!res.ok) throw new Error(res);
    return data;
  } catch (err) {
    console.log("ERR PostLogin\n", err);
  }
};

//??? ME
export const GetMe = async () => {
  try {
    console.log("data => fetch.js - GetMe");
    const res = await fetch("http://localhost:5000/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res.status);
    console.log("RES GetMe\n", res);
    const data = await res.json();
    console.log("DATA GetMe\n", data);
    return data;
  } catch (err) {
    console.log("ERR GetMe\n", err);
    throw new Error(err.message);
  }
};

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
