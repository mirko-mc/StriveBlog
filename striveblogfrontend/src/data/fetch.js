const FetchUrl = "http://localhost:5000/authors";
export const GetAuthors = async () => {
  const res = await fetch(FetchUrl);
  const data = await res.json();
  return data;
};

export const PostAutor = async () => {
  const res = await fetch(FetchUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: "sagsfg",
      surname: "gaaag",
      email: "afga",
    }),
  });
  const data = await res.json();
  return data;
};

export const PutAuthor = async (id) => {
  const res = await fetch(FetchUrl + `/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      avatar:
        "https://njhalloffame.org/wp-content/uploads/2021/04/generic-avatar-300x300.png",
    }),
  });
  if (!res.ok) console.log(res);
  const data = await res.json();
  return data;
};

export const DelAuthor = async (id) => {
  const res = await fetch(FetchUrl + `/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  if (!res.ok) console.log(res);
  const data = await res.json();
  return data;
};
