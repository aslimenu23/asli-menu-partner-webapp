import React, { useEffect, useState } from "react";
import {
  AddCta,
  List,
  ListItem,
  RestaurantsWrapper,
} from "./Restaurants.styles";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import {
  AiFillPlusSquare,
  AiTwotoneDelete,
  AiTwotoneEdit,
  AiFillBook,
} from "react-icons/ai";
import { ROUTES } from "../../common/constants";
import { getAllRestaurants } from "../../actions/actions";
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

  const onDelete = (id: string) => {
    setRestaurants([...restaurants.filter((r) => r.id !== id)]);
  };

  const renderList = () => {
    const items = restaurants.map((r, index) => {
      return (
        <ListItem key={index}>
          <div>{r.restaurant.name}</div>
          <div className="footer">
            <AiTwotoneEdit
              size={20}
              onClick={() => {
                navigate(ROUTES.ADD_RESTAURANT, { state: { restaurant: r } });
              }}
            />
            <AiTwotoneDelete size={20} onClick={() => onDelete(r.id)} />
            <AiFillBook
              size={20}
              onClick={() => {
                navigate(ROUTES.MENU, { state: { restaurant: r } });
              }}
            />
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
          {restaurants.length ? renderList() : <></>}
          <AddCta>
            <AiFillPlusSquare size={50} onClick={addRestaurant} />
          </AddCta>
        </>
      )}
    </RestaurantsWrapper>
  );
};

export default Restaurants;
