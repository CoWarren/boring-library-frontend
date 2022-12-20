export async function removeFavourite(e, bookId,updateFavourite,
    setUpdateFavourite,
    favorites,
    setFavorites) {
  e.stopPropagation();
  fetch(
    `http://localhost:8080/users/${sessionStorage.getItem(
      "userId"
    )}/${bookId}`,
    {
      method: "DELETE",
    }
  ).then(function () {
    setUpdateFavourite(updateFavourite + 1)
  });
}

export async function addToFavourites(e, authors, title, id, thumbnail,updateFavourite,
    setUpdateFavourite,
    favorites,
    setFavorites,
    setPage) {
  e.stopPropagation();
  try {
    fetch(`http://localhost:8080/users/${sessionStorage.getItem("userId")}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: authors,
        title: title,
        id: id,
        thumbnail: thumbnail,
      }),
    }).then((res) => {
      if (!res.ok) {
        return;
      }
      if (res.url != "http://localhost:8080/users/-1") {
        //if user is logged in
        setUpdateFavourite(updateFavourite + 1);
      } else {
        setPage("login");
      }
    });
  } catch (error) {
    console.log("Error on fetch")
  }
}


