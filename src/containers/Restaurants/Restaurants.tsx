import React, { useEffect, useState } from "react";
import {
  AddCta,
  List,
  ListItem,
  LoadingWrapper,
  RestaurantsWrapper,
} from "./Restaurants.styles";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    // API to fetch restaurants
    setTimeout(() => {
      setRestaurants([]);
      setLoading(false);
    }, 2000);
  }, []);

  const renderList = () => {
    const items = restaurants.map((r, index) => {
      return <ListItem key={index}>{r.name}</ListItem>;
    });

    return <List>{items}</List>;
  };

  const addRestaurant = () => {
    navigate("/add-restaurant");
  };

  return (
    <RestaurantsWrapper>
      {loading ? (
        <LoadingWrapper>
          <Loader />
        </LoadingWrapper>
      ) : (
        <>
          {restaurants.length ? renderList() : <></>}
          <AddCta>
            <Button onClick={addRestaurant}>Add restaurant</Button>
          </AddCta>
        </>
      )}
    </RestaurantsWrapper>
  );
};

export default Restaurants;
