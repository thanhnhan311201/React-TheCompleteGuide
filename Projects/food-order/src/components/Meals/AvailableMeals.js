import { useState, useEffect } from "react";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    (async () => {
      try {
        setHttpError(false);
        const response = await fetch(
          "https://react-learning-2b31f-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const loadMeals = [];
        for (const key in data) {
          loadMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(loadMeals);
      } catch (err) {
        console.log(err.message);
        setHttpError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (httpError) {
    return (
      <div className={classes["meal-error"]}>
        <p>{httpError}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={classes["meal-loading"]}>
        <p>Loading...</p>
      </div>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      name={meal.name}
      description={meal.description}
      price={meal.price}
      key={meal.id}
      id={meal.id}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
