import React, { useState } from "react";
import {
  ListItem,
  MenuItemContent,
  MenuListCard,
  MenuListWrapper,
  MenuItemFooter,
} from "./MenuList.styles";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { AiTwotoneEdit, AiTwotoneDelete, AiOutlineEdit } from "react-icons/ai";
import MenuForm from "../MenuForm/MenuForm";

const MenuList = ({
  menu,
  onChange,
}: {
  menu: any[];
  onChange: (menu: any[]) => void;
}) => {
  const [showEditFormIndex, setShowEditFormIndex] = useState(-1);

  const onEdit = (updatedItem: any, index: number) => {
    menu[index] = updatedItem;
    onChange([...menu]);
  };

  const onDelete = (index: number) => {
    menu.splice(index, 1);
    onChange([...menu]);
  };

  const toggleEditForm = (index: number) => {
    setShowEditFormIndex((prevIndex) => {
      if (prevIndex === index) {
        return -1;
      }
      return index;
    });
  };

  const renderItemContent = (item: any) => {
    return (
      <MenuItemContent>
        <div>
          <ListItem isLarge>{item.name}</ListItem>
          <ListItem>{item.category}</ListItem>
        </div>
        <ListItem>{item.dishType}</ListItem>
        <ListItem isLarge className="price">
          <FaIndianRupeeSign size={20} /> {item.price}
        </ListItem>
      </MenuItemContent>
    );
  };

  const renderItemFooter = (index: number) => {
    return (
      <MenuItemFooter>
        {showEditFormIndex === index ? (
          <AiOutlineEdit size={20} onClick={() => toggleEditForm(index)} />
        ) : (
          <AiTwotoneEdit size={20} onClick={() => toggleEditForm(index)} />
        )}
        <AiTwotoneDelete size={20} onClick={() => onDelete(index)} />
      </MenuItemFooter>
    );
  };

  return (
    <MenuListWrapper>
      {menu.map((item, index) => (
        <>
          <MenuListCard>
            {renderItemContent(item)}
            {renderItemFooter(index)}
          </MenuListCard>
          {showEditFormIndex === index ? (
            <MenuForm
              item={item}
              onChange={(newItem: any) => onEdit(newItem, index)}
            />
          ) : (
            <></>
          )}
        </>
      ))}
    </MenuListWrapper>
  );
};

export default MenuList;
