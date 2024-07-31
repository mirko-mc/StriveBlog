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
  return console.log(data);
};
