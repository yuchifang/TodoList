import React, { useState } from "react";
import EditCard from "./EditCard";
import styled from "styled-components";
import { updateDrinkType } from '../InterFaces/InterFace'

const WEditButton = styled.button`
  list-style: none;
  outline: none;
  border: red solid 1px;
  background-color: transparent;
  color: red;
  margin: 0 10px 0 auto;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  padding: 5px 10px;
  &:focus {
    border: red solid 1px;
    outline: none;
  }
  &:hover {
    color: white;
    background-color: red;
  }
`;

type DrinkCardType = {
  id: string,
  buyer: string,
  name: string,
  options: string,
  onDelete: (id: string) => void,
  onUpdate: (id: string) => (drinkUpdateValue: updateDrinkType) => void
}

const DrinkCard = ({
  buyer,
  name,
  options,
  onDelete,
  onUpdate,
  id
}: DrinkCardType) => {

  const [editStatus, setEditStatus] = useState<boolean>(false);

  const handleDelete = () => {
    onDelete && onDelete(id);
  };

  const handleEditStatus = () => {
    setEditStatus(!editStatus);
  };

  return (
    <div className="card mb-1">
      <div className="position-relative card-body">
        <div className="d-flex align-items-center mb-3">
          <button
            onClick={handleDelete}
            className="btn btn-outline-danger mr-3"
          >
            X
          </button>
          <h5 className="card-title m-0 mr-1">{name}</h5>
          <div className="card-text m-0">{options}</div>
          <WEditButton onClick={handleEditStatus}>
            編輯
          </WEditButton>
        </div>
        <blockquote className="blockquote mb-0">
          <footer className="blockquote-footer">
            <cite>{buyer}</cite>
          </footer>
        </blockquote>
        {editStatus && (
          <EditCard
            // editStatus={editStatus}
            onEditStatus={handleEditStatus}
            onUpdate={onUpdate(id)}
            options={options}
            itemName={name}
            buyer={buyer}
          />
        )}
      </div>
    </div>
  );
};

export default DrinkCard;
