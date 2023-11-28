import React, { useEffect, useState } from "react";
import {
  AddCta,
  List,
  ListItem,
  RestaurantsWrapper,
} from "./Restaurants.styles";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";
import { ROUTES } from "../../common/constants";
import { deleteRestaurant, getAllRestaurants } from "../../actions/actions";
import { useUserStates } from "../../store/userStore";

const Restaurants = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<any[]>([]);

  const loggedInUser = useUserStates().loggedInUser;

  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const allRestaurants = await getAllRestaurants(loggedInUser);
      setRestaurants(allRestaurants);
      setLoading(false);
    })();
  }, [loggedInUser]);

  const onDelete = async (id: string) => {
    await deleteRestaurant(
      {
        user: loggedInUser,
      },
      id
    );
    const allRestaurants = await getAllRestaurants(loggedInUser);
    setRestaurants(allRestaurants);
    setLoading(false);
  };

  const renderActionButton = (text: string, onClick: any) => {
    return <div onClick={onClick}>{text}</div>;
  };

  const renderList = () => {
    const items = restaurants.map((r, index) => {
      return (
        <ListItem key={index}>
          <div className="content">{r.editValue.name}</div>
          <div className="footer">
            {renderActionButton("EDIT", () => {
              navigate(ROUTES.ADD_RESTAURANT, { state: { restaurant: r } });
            })}
            {renderActionButton("DELETE", () => onDelete(r.id))}
            {renderActionButton("MENU", () => {
              navigate(ROUTES.MENU, { state: { restaurant: r } });
            })}
          </div>
        </ListItem>
      );
    });

    return <List>{items}</List>;
  };

  const addRestaurant = () => {
    navigate(ROUTES.ADD_RESTAURANT);
  };

  return (
    <RestaurantsWrapper>
      {loading ? (
        <Loader isFullScreen />
      ) : (
        <>
          {restaurants?.length ? renderList() : <></>}
          <AddCta>
            <AiFillPlusSquare size={50} onClick={addRestaurant} />
            ADD RESTAURANT
          </AddCta>
        </>
      )}
    </RestaurantsWrapper>
  );
};

export default Restaurants;
