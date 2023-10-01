import { useEffect, useState } from "react";
import { Book } from "../Book";
import { IBook } from "../models";

function Favourites() {
  const [loadedBooks, setLoadedBooks] = useState<IBook[]>([]);
  const [noFavBooks, setNoFavBooks] = useState(false);

  const loadFavBooks = () => {
    const storedFavoriteBooks = localStorage.getItem("favoriteBooks");
    if (storedFavoriteBooks) {
      setLoadedBooks(JSON.parse(storedFavoriteBooks));
    } else {
      setNoFavBooks(true);
    }
  };

  useEffect(() => {
    loadFavBooks();
  }, []);

  return (
    <>
      <div className="container">
        {noFavBooks ? (
          <div className="noBooksFound">Вы ничего не добавили в избранное</div>
        ) : (
          loadedBooks.map((book) => <Book book={book} key={book.id} />)
        )}
      </div>
    </>
  );
}
export default Favourites;
