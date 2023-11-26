import React, { useState } from "react";
import {
  ListItem,
  MenuItemContent,
  MenuListCard,
  MenuListWrapper,
  MenuItemFooter,
} from "./MenuList.styles";
import { FaIndianRupeeSign } from "react-icons/fa6";
import MenuForm from "../MenuForm/MenuForm";
import { useCommonActions } from "../../../store/commonStore";
import { FaStar } from "react-icons/fa";

const MenuList = ({
  menu,
  onChange,
}: {
  menu: any[];
  onChange: (menu: any[]) => void;
}) => {
  const [showEditFormIndex, setShowEditFormIndex] = useState(-1);
  const { setSnackbarMessage } = useCommonActions();

  const onEdit = (updatedItem: any, index: number) => {
    menu[index] = updatedItem;
    onChange([...menu]);
    setSnackbarMessage("Item updated successfully!");
  };

  const onDelete = (index: number) => {
    menu.splice(index, 1);
    onChange([...menu]);
    setSnackbarMessage("Item deleted successfully!");
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
        <ListItem>{item.isBestSeller ? <FaStar /> : <></>}</ListItem>
        <ListItem isLarge className="price">
          <FaIndianRupeeSign size={20} /> {item.price}
        </ListItem>
      </MenuItemContent>
    );
  };

  const renderItemFooter = (index: number) => {
    return (
      <MenuItemFooter>
        <div onClick={() => toggleEditForm(index)}>
          {showEditFormIndex === index ? "CLOSE EDIT" : "EDIT"}
        </div>
        <div onClick={() => onDelete(index)}>DELETE</div>
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
              onCancel={() => setShowEditFormIndex(-1)}
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
