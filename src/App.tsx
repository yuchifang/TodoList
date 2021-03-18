import React, { useState } from "react";
import DrinkCard from "./pages/DrinkCard";
import DrinkInputGroup from "./pages/DrinkInputGroup";
import { drinkType, updateDrinkType } from './InterFaces/InterFace'

type drinkInitType = {
  id?: string;
  itemName: string;
  options: string;
  buyer: string;
}


const App = () => {
  const drinkInitialList: drinkInitType[] = [
    {
      itemName: "烏龍綠",
      options: "半糖去冰",
      buyer: "kk"
    },
    {
      itemName: "珍奶",
      options: "無糖少冰",
      buyer: "ken"
    }
  ];

  const drinkList: drinkInitType[] = drinkInitialList.map((obj: drinkInitType, index) => {
    const newObj = { ...obj }
    newObj["id"] = index + obj.buyer;
    return newObj;
  });
  //@ts-ignore
  const [drinkListState, setDrinkListState] = useState<drinkType[]>(drinkList);

  const handleDelete = (id: string) => {
    setDrinkListState((prevState) => {
      const newState = prevState.filter((state: drinkType) => state.id !== id);
      return newState;
    });
  };

  const handleUpdate = (id: string) => (drinkUpdateValue: updateDrinkType) => {
    //其中一個子層取得id 
    const newDrinkArr = drinkListState.map(drink => {
      const newDrink = { ...drink }
      if (drink.id === id) {
        newDrink.buyer = drinkUpdateValue.buyer
        newDrink.itemName = drinkUpdateValue.itemName
        newDrink.options = drinkUpdateValue.options
      }
      return newDrink
    })
    setDrinkListState(newDrinkArr)
  }

  const handleCreate = async (drink: drinkType) => {
    setDrinkListState((prevState) => [
      ...prevState,
      {
        id: prevState.length + drink.options,
        itemName: drink.itemName,
        options: drink.options,
        buyer: drink.buyer
      }
    ]);
  };

  return (
    <main className="py-5">
      <div className="container">
        <DrinkInputGroup onCreate={handleCreate} />
        {drinkListState.length === 0 && <h3>目前沒有訂購任何飲料</h3>}
        {drinkListState.length > 0 &&
          drinkListState.map((drink, index) => (
            <DrinkCard
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              id={drink.id}
              key={index + drink.buyer}
              buyer={drink.buyer}
              name={drink.itemName}
              options={drink.options}
            />
          ))}
      </div>
    </main>
  );
};

export default App;
