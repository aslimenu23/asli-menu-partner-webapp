import React, { useEffect, useMemo, useState } from "react";
import { AddMenuButton, AddMenuWrapper } from "./Menu.styles";
import MenuForm from "./MenuForm/MenuForm";
import MenuList from "./MenuList/MenuList";
import { AiFillPlusSquare } from "react-icons/ai";
import { LOCAL_STORAGE_KEY_REFIX } from "../../common/constants";
import Loader from "../../components/Loader/Loader";
import { useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  const [menu, setMenu] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const localStorageKey = useMemo(() => `${LOCAL_STORAGE_KEY_REFIX}menu`, []);

  useEffect(() => {
    // BE API to fetch menu for the restaurant
    const currentRestaurant = location.state?.restaurant;
    setMenu([]);
  }, [localStorageKey, location.state?.restaurant]);

  const onAddItem = (item: any) => {
    setMenu([...menu, item]);
    toggleForm();
  };

  const onChange = (updatedMenu: any[]) => {
    setMenu(updatedMenu);
  };

  const toggleForm = () => {
    setShowAddForm((value) => !value);
  };

  if (!menu) return <Loader isFullScreen />;
  return (
    <AddMenuWrapper>
      <MenuList menu={menu} onChange={onChange} />
      {showAddForm ? (
        <MenuForm onChange={onAddItem} />
      ) : (
        <AddMenuButton>
          <AiFillPlusSquare size={50} onClick={toggleForm} />
        </AddMenuButton>
      )}
    </AddMenuWrapper>
  );
};

export default Menu;
