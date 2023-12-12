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
import { useCommonActions } from "../../store/commonStore";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedInUser = useUserStates().loggedInUser;
  const { setSnackbarMessage } = useCommonActions();

  const [menu, setMenu] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showMenuSubmit, setShowMenuSubmit] = useState(false);

  const currentRestaurant = location.state?.restaurant;

  useEffect(() => {
    setLoading(true);
    setMenu(currentRestaurant?.editValue?.menu || []);
    setLoading(false);
  }, [currentRestaurant?.editValue?.menu]);

  const onAddItem = (item: any) => {
    setMenu([...menu, item]);
    setShowMenuSubmit(true);
    toggleForm();
  };

  const onChange = (updatedMenu: any[]) => {
    setMenu(updatedMenu);
    setShowMenuSubmit(true);
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
    setButtonLoading(true);
    const payload = {
      restaurantId: currentRestaurant.id,
      user: loggedInUser,
      menu,
    };
    const response = await saveMenuDetails(payload);
    if (response) {
      setSnackbarMessage("Menu saved successfully!");
      setButtonLoading(false);
      goToRestaurantsPage();
    }
  };

  // Go to home page if no restaurant is selected
  if (!currentRestaurant) {
    goToRestaurantsPage();
  }

  if (loading) return <Loader isFullScreen />;

  const latestCategorySelected =
    menu.length > 0 ? menu[menu.length - 1]?.category : null;

  return (
    <AddMenuWrapper>
      <MenuList menu={menu} onChange={onChange} />
      {showAddForm ? (
        <MenuForm
          onCancel={toggleForm}
          onChange={onAddItem}
          previousCategory={latestCategorySelected}
        />
      ) : (
        <AddMenuButton>
          <AiFillPlusSquare size={50} onClick={toggleForm} />
          ADD ITEM TO MENU
        </AddMenuButton>
      )}
      {showMenuSubmit ? (
        <SaveMenuCta>
          <Button isLoading={buttonLoading} onClick={saveMenu}>
            Save Menu
          </Button>
        </SaveMenuCta>
      ) : (
        <></>
      )}
    </AddMenuWrapper>
  );
};

export default Menu;
