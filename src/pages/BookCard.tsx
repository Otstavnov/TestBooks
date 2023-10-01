import { useEffect, useState } from "react";
import "../index.css";
import axios from "axios";
import { IBook } from "../models";
import { useNavigate } from "react-router-dom";

function BookCard() {
  const [loadedBook, setLoadedBook] = useState<IBook>();
  const [favorite, setFavorite] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState<IBook[]>([]);

  const location = useEffect(() => {
    const storedFavoriteBooks = localStorage.getItem("favoriteBooks");
    if (storedFavoriteBooks) {
      setFavoriteBooks(JSON.parse(storedFavoriteBooks));
    } else {
      setFavoriteBooks([]);
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    console.log(id);

    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((response) => {
        setLoadedBook(response.data);
      });
  }, []);

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/`);
  };

  const onClickFav = () => {
    if (favorite && loadedBook !== undefined) {
      // Удаление книги из списка избранных
      const updatedFavoriteBooks = favoriteBooks.filter(
        (book) => book.id !== loadedBook.id,
      );
      setFavoriteBooks(updatedFavoriteBooks);
      setFavorite(false);
      localStorage.setItem(
        "favoriteBooks",
        JSON.stringify(updatedFavoriteBooks),
      );
      console.log("удаление");
    }
    if (!favorite && loadedBook !== undefined) {
      // Добавление книги в список избранных
      const updatedFavoriteBooks = [...favoriteBooks, loadedBook];
      setFavoriteBooks(updatedFavoriteBooks);
      setFavorite(true);
      localStorage.setItem(
        "favoriteBooks",
        JSON.stringify(updatedFavoriteBooks),
      );
      console.log("добавление");
    }
  };

  return (
    <>
      <button className="goToHome" onClick={onClick}>
        Назад
      </button>
      <div className="book-card">
        <button className="btn-fav" onClick={onClickFav}>
          ♥
        </button>
        <img src={loadedBook?.volumeInfo.imageLinks.smallThumbnail}></img>
        <h2 className="book-title">{loadedBook?.volumeInfo.title}</h2>
        <p className="book-author">{loadedBook?.volumeInfo.authors}</p>
        <p className="book-publisher">{loadedBook?.volumeInfo.publisher}</p>
        <p className="book-publishedDate">
          {loadedBook?.volumeInfo.publishedDate}
        </p>
      </div>
    </>
  );
}
export default BookCard;
