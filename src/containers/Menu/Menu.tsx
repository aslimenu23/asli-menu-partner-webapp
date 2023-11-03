import React, { useEffect, useState } from "react";
import { AddMenuButton, AddMenuWrapper, SaveMenuCta } from "./Menu.styles";
import MenuForm from "./MenuForm/MenuForm";
import MenuList from "./MenuList/MenuList";
import { AiFillPlusSquare } from "react-icons/ai";
import Loader from "../../components/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { saveMenuDetails } from "../../actions/actions";
import { useUserStates } from "../../store/userStore";
import { ROUTES } from "../../common/constants";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedInUser = useUserStates().loggedInUser;

  const [menu, setMenu] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const currentRestaurant = location.state?.restaurant;

  useEffect(() => {
    setMenu(currentRestaurant?.editValue?.menu || []);
  }, [currentRestaurant?.editValue?.menu]);

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

  const goToRestaurantsPage = () => {
    navigate(ROUTES.RESTAURANTS, {
      replace: true,
    });
  };

  const saveMenu = async () => {
    const payload = {
      restaurantId: currentRestaurant.id,
      user: loggedInUser,
      menu,
    };
    const response = await saveMenuDetails(payload);
    if (response) goToRestaurantsPage();
  };

  // Go to home page if no restaurant is selected
  if (!currentRestaurant) {
    goToRestaurantsPage();
  }

  if (!menu) return <Loader isFullScreen />;
  return (
    <AddMenuWrapper>
      <MenuList menu={menu} onChange={onChange} />
      {showAddForm ? (
        <MenuForm onChange={onAddItem} />
      ) : (
        <AddMenuButton>
          <AiFillPlusSquare size={50} onClick={toggleForm} />
          ADD ITEM TO MENU
        </AddMenuButton>
      )}
      {menu.length ? (
        <SaveMenuCta>
          <Button onClick={saveMenu}>Save Menu</Button>
        </SaveMenuCta>
      ) : (
        <></>
      )}
    </AddMenuWrapper>
  );
};

export default Menu;
