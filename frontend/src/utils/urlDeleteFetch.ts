const urlFetch = async (url: string) => {
  const res = await fetch("http://localhost:8080/shorturl", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: url,
  });
  if (res.status !== 204) {
    throw new Error("Network response was not ok");
  }
};

export default urlFetch;
