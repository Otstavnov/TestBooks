import React, { useEffect, useState } from "react";
import "./App.css";
import BookList from "./pages/BookList";
import { useNavigate } from "react-router-dom";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [corSearchValue, setCorSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setCorSearchValue(searchValue);
    }
  };
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/favourites`);
  };

  return (
    <>
      <div className="navbar">
        <ul>
          <li>
            <div className="titleApp">Тестовое задание</div>
          </li>
          <li>
            <div className="navFav" onClick={onClick}>
              Избранное
            </div>
          </li>
          <li>
            <input
              type="text"
              placeholder="Введите название или автора книги "
              value={searchValue}
              onChange={handleSearchChange}
              onKeyUp={handleKeyPress}
            />
          </li>
        </ul>
      </div>
      <BookList searchValue={corSearchValue} />
    </>
  );
}
export default App;
