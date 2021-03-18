import React, { useRef } from "react";
import DrinkInput from "./DrinkInput";
import { drinkType } from '../../InterFaces/InterFace'

const DrinkInputGroup = ({ onCreate }: {
  onCreate: (drink: drinkType) => Promise<void>
}) => {

  const itemNameRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLInputElement>(null);
  const buyerRef = useRef<HTMLInputElement>(null);

  const handleCreate = () => {
    let errorArr: string[] = []

    let nameValue = itemNameRef?.current?.value;
    let optionsValue = optionsRef?.current?.value;
    let buyerValue = buyerRef?.current?.value;

    if (nameValue === "") errorArr.push("請填入飲品名稱")
    if (optionsValue === "") errorArr.push("請填入糖度冰塊")
    if (buyerValue === "") errorArr.push("請填入姓名")

    if (errorArr.length === 0) {
      //@ts-ignore
      onCreate?.({ itemName: nameValue, options: optionsValue, buyer: buyerValue })
        .then(() => {
          if (itemNameRef && itemNameRef.current) itemNameRef.current.value = "";
          if (optionsRef && optionsRef.current) optionsRef.current.value = "";
          if (buyerRef && buyerRef.current) buyerRef.current.value = "";
          return
        })
        .catch(() => {
          alert("error");
        });
    } else {
      alert(errorArr)
    }
  };

  return (
    <div className="input-group mb-3">
      <DrinkInput
        ref={buyerRef}
        placeholderText="訂購人"

        setClassName="form-control"
      />
      <DrinkInput
        placeholderText="飲品名稱"
        ref={itemNameRef}
        setClassName="form-control"
      />
      <DrinkInput
        placeholderText="糖度冰塊"
        ref={optionsRef}
        setClassName="form-control mr-1"
      />
      <button
        onClick={handleCreate}
        className="btn btn-primary"
      >
        新增
      </button>
    </div>
  );
};

export default DrinkInputGroup;
