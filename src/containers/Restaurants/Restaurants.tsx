import React, { useEffect, useState } from "react";
import {
  AddCta,
  List,
  ListItem,
  RestaurantsWrapper,
} from "./Restaurants.styles";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { AiFillPlusSquare, AiTwotoneEdit } from "react-icons/ai";
import { ROUTES } from "../../common/constants";

const Restaurants = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    // API to fetch restaurants
    setRestaurants([]);
    setLoading(false);
  }, []);

  const renderList = () => {
    const items = restaurants.map((r, index) => {
      return (
        <ListItem key={index}>
          {r.name} <AiTwotoneEdit size={20} />
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
