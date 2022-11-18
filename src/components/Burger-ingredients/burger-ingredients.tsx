import React, { useMemo, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./burger-ingredients.module.css";
import { filterIngredients } from "../utils/filter-ingredients";
import { setInfoIngredient } from "../../services/actions/currentIngredient";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { TItem } from "../../services/types/data";

interface ITabs {
  mainsRef: React.RefObject<HTMLDivElement>;
  bunsRef: React.RefObject<HTMLDivElement>;
  saucesRef: React.RefObject<HTMLDivElement>;
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs: React.FC<ITabs> = ({
  mainsRef,
  bunsRef,
  saucesRef,
  current,
  setCurrent,
}) => {
  function handleButtonClick(ref: React.RefObject<HTMLDivElement>) {
    ref.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return (
    <div className={ingredientsStyles.tab}>
      <Tab
        onClick={() => {
          handleButtonClick(bunsRef);
          setCurrent("one");
        }}
        value="one"
        active={current === "one"}
      >
        Булки
      </Tab>
      <Tab
        onClick={() => {
          handleButtonClick(saucesRef);
          setCurrent("two");
        }}
        value="two"
        active={current === "two"}
      >
        Соусы
      </Tab>
      <Tab
        onClick={() => {
          handleButtonClick(mainsRef);
          setCurrent("three");
        }}
        value="three"
        active={current === "three"}
      >
        Начинки
      </Tab>
    </div>
  );
};

const Ingredients: React.FC<{ ingredients: Array<TItem> }> = ({
  ingredients,
}) => {
  const dispatch = useAppDispatch();

  function openModal(data: TItem) {
    dispatch(setInfoIngredient(data));
  }

  return (
    <>
      <ul className={`pb-10 pt-6 pl-4 pr-4 ${ingredientsStyles.ul}`}>
        {ingredients.map((ingredient) => (
          <IngredientItem
            ingredient={ingredient}
            key={ingredient._id}
            openModal={openModal}
          />
        ))}
      </ul>
    </>
  );
};

const IngredientItem: React.FC<{
  ingredient: TItem;
  openModal: (data: TItem) => void;
}> = ({ ingredient, openModal }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const { fillings, bun } = useAppSelector(
    (state) => state.ingredientsConstructor
  );
  const counter = useMemo(() => {
    if (bun && ingredient._id === bun._id) return 2;
    let t = 0;
    fillings.forEach((elem) => {
      if (elem._id === ingredient._id) t++;
    });
    return t;
  }, [fillings, ingredient._id, bun]);
  const history = useHistory();
  let location = useLocation();

  return (
    <li
      onClick={() => {
        openModal(ingredient);
        history.push({
          pathname: `/ingredient/${ingredient._id}`,
          state: { background: location },
        });
      }}
      className={ingredientsStyles.li}
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={`pr-4 pl-4 pb-1`}>
        <img
          // id={ingredient.id}
          src={ingredient.image}
          alt={ingredient.name}
        ></img>
        <p
          className={`mt-1 mb-1 text text_type_digits-default ${ingredientsStyles.price}`}
        >
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </p>
        <div className={ingredientsStyles.counter}>
          {counter > 0 && <Counter count={counter} size="default" />}
        </div>
      </div>
      <p
        className={`text text_type_main-default ${ingredientsStyles.description}`}
      >
        {ingredient.name}
      </p>
    </li>
  );
};

export const BurgerIngredients = () => {
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const mainsRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState("one");

  const scrollHandler = () => {
    if (!ingredientsRef || !bunsRef || !saucesRef || !mainsRef) {
      setCurrent("one");
      return;
    }

    const getHeight = (ref: React.RefObject<HTMLDivElement>) => {
      if (ingredientsRef.current && ref.current) {
        return Math.abs(
          ingredientsRef.current.getBoundingClientRect().top -
            ref.current.getBoundingClientRect().top
        );
      }
      return 0;
    };

    const mainsHeight = getHeight(mainsRef);
    const saucesHeight = getHeight(saucesRef);
    const bunsHeight = getHeight(bunsRef);
    const minHeight = Math.min(bunsHeight, saucesHeight, mainsHeight);

    setCurrent(
      bunsHeight === minHeight
        ? "one"
        : saucesHeight === minHeight
        ? "two"
        : "three"
    );
  };

  return (
    <div className="mt-10">
      <h1 className="text mb-5 text_type_main-large">Соберите бургер</h1>
      <Tabs
        current={current}
        setCurrent={setCurrent}
        bunsRef={bunsRef}
        mainsRef={mainsRef}
        saucesRef={saucesRef}
      />
      <div
        ref={ingredientsRef}
        onScroll={scrollHandler}
        className={`mt-10 ${ingredientsStyles.ingredients}`}
      >
        <div ref={bunsRef} id="one">
          <h2 className="text text_type_main-medium">Булки</h2>
          <Ingredients ingredients={filterIngredients(ingredients, "bun")} />
        </div>
        <div ref={saucesRef} id="two">
          <h2 className="text text_type_main-medium">Соусы</h2>
          <Ingredients ingredients={filterIngredients(ingredients, "sauce")} />
        </div>
        <div ref={mainsRef} id="three">
          <h2 className="text text_type_main-medium">Начинки</h2>
          <Ingredients ingredients={filterIngredients(ingredients, "main")} />
        </div>
      </div>
    </div>
  );
};
