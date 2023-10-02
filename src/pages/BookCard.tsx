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
    /////////
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((response) => {
        setLoadedBook(response.data);
      });
  }, []);

  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    // Проверка наличия книги в списке избранных
    const isFavorite = favoriteBooks.some((book) => book.id === loadedBook?.id);
    setFavorite(isFavorite);
  }, [favoriteBooks, loadedBook]);

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
      <div className="goBack" onClick={onClick}>
        🢀
      </div>
      <div className="book-card">
        <div className="book-card-image">
          <img src={loadedBook?.volumeInfo.imageLinks.thumbnail}></img>
        </div>
        <div className="book-card-info">
          <h2 className="book-title">
            Название<br></br>
            {loadedBook?.volumeInfo.title}
          </h2>
          <p className="book-author">
            Автор/авторы<br></br>
            {loadedBook?.volumeInfo.authors}
          </p>
          <p className="book-publisher">
            Кем опубликовано<br></br>
            {loadedBook?.volumeInfo.publisher}
          </p>
          <p className="book-publishedDate">
            Дата публикации<br></br>
            {loadedBook?.volumeInfo.publishedDate}
          </p>
        </div>
        <button
          className={`btn-fav ${favorite ? "btn-fav--favorite" : ""}`}
          onClick={onClickFav}
        >
          ❤
        </button>
      </div>
    </>
  );
}
export default BookCard;
