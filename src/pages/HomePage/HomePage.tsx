import React from "react";
import "./HomePage.scss";
import { Button } from "@mui/material";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="home__wrapper">
      <div className="home__container">
        <h1>
          Добро пожаловать на <b>генератор формы</b>
        </h1>
        <div className="home__button-group">
          <Button className="home__button-item" variant="contained">
            <Link href={"/form-constructor"}>Конструктор</Link>
          </Button>
          <Button className="home__button-item" variant="contained">
            <Link href={"/form-list"}>Список вопросов</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
