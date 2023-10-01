import { IBook } from "./models";
import { useNavigate } from "react-router-dom";

interface BookProps {
  book: IBook;
}

export function Book({ book }: BookProps) {
  const { title, authors, imageLinks } = book.volumeInfo;
  const image =
    imageLinks?.thumbnail ??
    imageLinks?.smallThumbnail ??
    `https://vignette3.wikia.nocookie.net/tomb-raider/images/0/03/Cargando.gif/revision/latest?cb=20130324014301&path-prefix=es`;

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/book?id=${book.id}`);
  };

  return (
    <>
      <div className="card">
        <img src={image} alt="" onClick={onClick} />
        <div className="title">{title}</div>
        <br></br>
        <div className="author">{authors}</div>
      </div>
    </>
  );
}
