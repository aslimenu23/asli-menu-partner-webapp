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

const Restaurants = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    // API to fetch restaurants
    setRestaurants([{ name: "Some Restaurant" }]);
    setLoading(false);
  }, []);

  const onDelete = (index: number) => {
    restaurants.splice(index, 1);
    setRestaurants([...restaurants]);
  };

  const renderList = () => {
    const items = restaurants.map((r, index) => {
      return (
        <ListItem key={index}>
          <div>{r.name}</div>
          <div className="footer">
            <AiTwotoneEdit
              size={20}
              onClick={() => {
                navigate(ROUTES.ADD_RESTAURANT, { state: { restaurant: r } });
              }}
            />
            <AiTwotoneDelete size={20} onClick={() => onDelete(index)} />
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
