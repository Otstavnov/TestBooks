import { useEffect, useState } from "react";
import { Book } from "../Book";
import { IBook } from "../models";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="goBack" onClick={onClick}>
        🢀
      </div>
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
