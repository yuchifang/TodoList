import React, { useState } from "react";
import styled from "styled-components";
import { updateDrinkType } from '../InterFaces/InterFace'

const WEditCard = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  width: 100%;
  height: 100%;
  border: none;
`;

const WCardValueInput = styled.input`
  padding: 0px 5px;
  width: 120px;
  &:focus {
    border: solid 1px black;
  }
`;

const WCardValueLabel = styled.label`
  margin-bottom: 0px;
  margin-right: 10px;
  margin-left: 20px;
`;

const WEditButton = styled.button`
  list-style: none;
  outline: none;
  border: solid 1px ${(props) => props.color && props.color};
  background-color: transparent;
  color: ${(props) => props.color && props.color};
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0px 5px;
  &:focus {
    border: solid 1px ${(props) => props.color && props.color};
    outline: none;
  }
  &:hover {
    color: white;
    background-color: ${(props) => props.color && props.color};
  }
`;

const WButtonBlock = styled.div`
  display: flex;
  margin-top: 10px;
`;


const EditCard = ({ onEditStatus, options, itemName, buyer, onUpdate }: {
  onEditStatus: () => void,
  onUpdate: (drinkUpdateValue: updateDrinkType) => void,
  options: string,
  itemName: string,
  buyer: string
}) => {
  const [drink, setDrink] = useState<updateDrinkType>({ itemName, options, buyer })

  const handleConfirm = () => {
    onUpdate && onUpdate(drink)
    onEditStatus && onEditStatus()
  };

  const handleCancel = () => {
    onEditStatus && onEditStatus()
  };

  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    setDrink({ ...drink, itemName: e.currentTarget.value })
  }

  const handleOptions = (e: React.FormEvent<HTMLInputElement>) => {
    setDrink({ ...drink, options: e.currentTarget.value })
  }

  const handleBuyer = (e: React.FormEvent<HTMLInputElement>) => {
    setDrink({ ...drink, buyer: e?.currentTarget?.value })
  }

  return (
    <WEditCard className="position-absolute card mb-1">
      <div className="card-body">
        <div className="d-flex justify-content-around flex-wrap align-items-center h-100 ">
          <div>
            <WCardValueLabel htmlFor="name">飲品名稱:</WCardValueLabel>
            <WCardValueInput
              id="name"
              placeholder={itemName}
              onChange={handleName}
              className="card-title m-0 mr-1"
            />
            <WCardValueLabel htmlFor="options">
              糖度冰塊:
            </WCardValueLabel>
            <WCardValueInput
              id="options"
              placeholder={options}
              onChange={handleOptions}
              className="card-text m-0"
            />
            <WCardValueLabel htmlFor="buyer">訂購人:</WCardValueLabel>
            <WCardValueInput
              id="buyer"
              placeholder={buyer}
              onChange={handleBuyer}
              className="card-text m-0"
            />
          </div>
          <WButtonBlock>
            <WEditButton color="blue" onClick={handleConfirm}>
              確認
            </WEditButton>
            <WEditButton color="red" onClick={handleCancel}>
              取消
            </WEditButton>
          </WButtonBlock>
        </div>
      </div>
    </WEditCard>
  );
};
export default EditCard;
