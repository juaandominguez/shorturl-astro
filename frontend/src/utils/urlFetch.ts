const urlFetch = async (data: { originalUrl: string; id: string }) => {
  try {
    const res = await fetch("http://localhost:8080/shorturl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status !== 201) {
      throw new Error("Network response was not ok");
    }
    const url = await res.json();
    return url.shortUrl;
  } catch (err) {
    console.error(err);
  }
};

export default urlFetch;
