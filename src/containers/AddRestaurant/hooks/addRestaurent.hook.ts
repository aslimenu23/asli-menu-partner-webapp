import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCommonStates } from "../../../store/commonStore";
import { DEFAULT_TIME } from "../AddRestaurant.constants";
import { Timing } from "../AddRestaurant.types";

const useAddRestaurantStates = () => {
  const location = useLocation();
  const resChoices = useCommonStates().resChoices;

  const editedRestaurant = location.state?.restaurant?.editValue || {};

  // Page level states
  const [loading, setLoading] = useState(false);
  const [cuisinesList, setCuisinesList] = useState<any[]>(
    resChoices?.cuisines || []
  );
  const [validationErrors, setValidationErrors] = useState<any>({});

  // Basic details
  const [name, setName] = useState({
    value: editedRestaurant.name || "",
    error: "",
  });
  const [gmapLink, setGmapLink] = useState({
    value: editedRestaurant.location?.gmapLink || "",
    error: "",
  });
  const [fullAddress, setFullAddress] = useState({
    value: editedRestaurant.location?.fullAddress || "",
    error: "",
  });
  const [areaName, setAreaName] = useState(
    editedRestaurant.location?.areaName || ""
  );
  const [cuisines, setCuisines] = useState<any[]>(editedRestaurant.cuisines);
  const [avgPriceForOne, setAvgPriceForOne] = useState({
    value: editedRestaurant.avgPrice,
    error: "",
  });

  // Manager/Owner details
  const [phoneNumbers, setPhoneNumbers] = useState<any[]>(
    editedRestaurant.phoneNumbers && editedRestaurant.phoneNumbers.length > 0
      ? editedRestaurant.phoneNumbers.map((n: string) => ({
          value: n,
          error: false,
        }))
      : [{ value: "", error: false }]
  );
  const [isManagedByOwner, setIsManagedByOwner] = useState(
    editedRestaurant.isManagedByOwner
  );

  // Timings and Facilities
  const [dineInDetails, setDineInDetails] = useState(
    editedRestaurant.dineInDetails || {
      enabled: false,
      timings: [DEFAULT_TIME],
    }
  );
  const [takeawayDetails, setTakeawayDetails] = useState(
    editedRestaurant.takeAwayDetails || {
      enabled: false,
      timings: [DEFAULT_TIME],
    }
  );

  const [freeDeliveryDistance, setFreeDeliveryDistance] = useState({
    value: editedRestaurant.deliveryDetails?.freeDeliveryDistance || 0,
    error: "",
  });
  const [deliveryFee, setDeliveryFee] = useState({
    value: editedRestaurant.deliveryDetails?.deliveryFee || 0,
    error: "",
  });
  const [deliveryDetails, setDeliveryDetails] = useState(
    editedRestaurant.deliveryDetails || {
      enabled: false,
      timings: [DEFAULT_TIME],
    }
  );

  return {
    states: {
      name,
      cuisines,
      avgPriceForOne,
      phoneNumbers,
      isManagedByOwner,
      dineInDetails,
      takeawayDetails,
      deliveryDetails,
      cuisinesList,
      validationErrors,
      loading,
      gmapLink,
      fullAddress,
      areaName,
      freeDeliveryDistance,
      deliveryFee,
    },
    actions: {
      setDeliveryFee,
      setFreeDeliveryDistance,
      setAreaName,
      setFullAddress,
      setName,
      setGmapLink,
      setCuisines,
      setAvgPriceForOne,
      setPhoneNumbers,
      setIsManagedByOwner,
      setDineInDetails,
      setTakeawayDetails,
      setDeliveryDetails,
      setCuisinesList,
      setValidationErrors,
      setLoading,
    },
  };
};

export default useAddRestaurantStates;