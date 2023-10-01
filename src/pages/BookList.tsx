import { useEffect, useState } from "react";
import { Book } from "../Book";
import { IBook } from "../models";
import axios from "axios";

interface BookListProps {
  searchValue: string;
}

function BookList({ searchValue }: BookListProps) {
  const keyApi2 = "AIzaSyDPG9XRUg6u_g6zzkGibtZ3n6wrxhzTKbU";
  const [offset, setOffset] = useState(0);
  const [loadedBooks, setLoadedBooks] = useState<IBook[]>([]);
  const [hasMoreBooks, setHasMoreBooks] = useState(true);
  const [noBooksFound, setNoBooksFound] = useState(false);

  const searchBook = () => {
    if (searchValue !== "") {
      setOffset(0);
      setHasMoreBooks(true);
      setNoBooksFound(false);
      setLoadedBooks([]);
      try {
        axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchValue}&key=${keyApi2}&startIndex=${offset}&maxResults=40`,
          )
          .then((response) => {
            if (response.data.items) {
              setLoadedBooks(response.data.items);
              console.log(response.data.totalItems);
              console.log(response.data.items);
              if (response.data.totalItems <= offset + 40) {
                setHasMoreBooks(false);
              }
              if (response.data.totalItems === 0) {
                setNoBooksFound(true);
              }
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
      if (hasMoreBooks) {
        const newOffset = offset + 40;
        axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchValue}&key=${keyApi2}&startIndex=${newOffset}&maxResults=40`,
          )
          .then((response) => {
            if (response.data.items) {
              const newBooks = response.data.items.filter(
                (book: IBook) =>
                  !loadedBooks.some((loadedBook) => loadedBook.id === book.id),
              );

              setLoadedBooks((prevBooks) => [...prevBooks, ...newBooks]);
              setOffset(
                (prevOffset) => prevOffset + response.data.items.length,
              );
              if (
                response.data.totalItems <=
                offset + response.data.items.length
              ) {
                setHasMoreBooks(false);
              }
            }
          });
      }
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

  useEffect(() => {
    searchBook();
  }, [searchValue]);

  return (
    <>
      <div className="container">
        {noBooksFound ? (
          <div className="noBooksFound">Книги не найдены</div>
        ) : (
          loadedBooks
            .filter((book) => book.volumeInfo.imageLinks)
            .map((book) => <Book book={book} key={book.id} />)
        )}
      </div>
    </>
  );
}
export default BookList;
