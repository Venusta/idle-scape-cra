/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { getIcon } from "../../model/Icon";

interface ItemProps {
  itemID: number;
  amount: string;
  colour: string;

}

interface ItemImageProps {
  itemID: number
}

const ItemImage = ({ itemID }: ItemImageProps): JSX.Element => (
  <img
    className="itemImage"
    width="36"
    height="32"
    src={`data:image/png;base64, ${getIcon(itemID)}`}
  />
);

interface ItemAmountTagProps {
  amount: string
  colour: string
}

const ItemAmountTag = ({ amount, colour }: ItemAmountTagProps) => (
  <div className={`itemAmountTag ${colour}`}>{amount}</div>
);

export const Item = ({ itemID, amount, colour }: ItemProps): JSX.Element => (
  <div className="item" title={`${itemID}`}>
    <ItemAmountTag amount={amount} colour={colour} />
    <ItemImage itemID={itemID} />
  </div>
);

export const ItemInBank = ({ itemID, amount, colour }: ItemProps): JSX.Element => {
  let extra = "";
  if (amount === "0") {
    extra = " itemImage-placeholder";
  }

  return (
    <div className={`itemInBank ${extra}`} draggable="true">
      <Item itemID={itemID} amount={amount} colour={colour} />
    </div>
  );
};
