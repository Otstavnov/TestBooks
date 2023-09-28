import React, { useEffect, useState } from "react";
import "./App.css";
import { Book } from "./Book";
import { IBook } from "./models";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const keyApi1 = "AIzaSyAWXUr33PRKRXXG4yFt0fvgALVcgXABHn8";
  const keyApi2 = "AIzaSyDPG9XRUg6u_g6zzkGibtZ3n6wrxhzTKbU";
  const [offset, setOffset] = useState(0);
  const [loadedBooks, setLoadedBooks] = useState<IBook[]>([]);
  const [hasMoreBooks, setHasMoreBooks] = useState(true);
  const [noBooksFound, setNoBooksFound] = useState(false);

  const searchBook = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter" && search != "") {
      setOffset(0);
      setHasMoreBooks(true);
      setNoBooksFound(false);
      setLoadedBooks([]);
      try {
        axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${search}&key=${keyApi2}&startIndex=${offset}&maxResults=40`,
          )
          .then((response) => {
            setLoadedBooks(response.data.items);
            console.log(response.data.totalItems);
            console.log(response.data.items);
            if (response.data.totalItems <= offset + 40) {
              setHasMoreBooks(false);
            }
            if (response.data.totalItems === 0) {
              setNoBooksFound(true);
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
    console.log(noBooksFound);
  };

  const loadMoreBook = () => {
    try {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${search}&key=${keyApi2}&startIndex=${offset}&maxResults=40`,
        )
        .then((response) => {
          const newBooks = response.data.items.filter(
            (book: IBook) =>
              !loadedBooks.some((loadedBook) => loadedBook.id === book.id),
          );
          setLoadedBooks((prevBooks) => [...prevBooks, ...newBooks]);
          setOffset((prevOffset) => prevOffset + 40);
          console.log(response.data.items);
          if (response.data.totalItems <= offset + 40) {
            setHasMoreBooks(false);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = (e: any) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
        e.target.documentElement.scrollHeight &&
      hasMoreBooks
    ) {
      loadMoreBook();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadedBooks, hasMoreBooks]);

  return (
    <>
      <div className="navbar">
        <ul>
          <li>{/* <img src={"./books.png"} alt="эмблема" /> */}</li>
          <li>
            <div className="title"> Книжная лавка</div>
          </li>
          <li>
            <input
              type="text"
              placeholder="Введите название или автора книги"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={searchBook}
            />
          </li>
        </ul>
      </div>
      <div className="container">
        {noBooksFound ? (
          <div className="noBooksFound">Книги не найдены</div>
        ) : (
          loadedBooks.map((book) => <Book book={book} key={book.id} />)
        )}
      </div>
    </>
  );
}
export default App;
