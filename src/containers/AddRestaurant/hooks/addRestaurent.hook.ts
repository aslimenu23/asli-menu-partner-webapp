import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCommonActions, useCommonStates } from "../../../store/commonStore";
import { DEFAULT_TIME } from "../AddRestaurant.constants";
import { useUserStates } from "../../../store/userStore";
import { ROUTES } from "../../../common/constants";
import { addRestaurant, saveRestaurantDetails } from "../../../actions/actions";
import { convertToCapitalCase } from "../../../common/utils";
import { getPayload } from "./addRestaurent.helpers";

const useAddRestaurantStates = () => {
  const location = useLocation();
  const resChoices = useCommonStates().resChoices;
  const navigate = useNavigate();

  const loggedInUser = useUserStates().loggedInUser;
  const setSnackbarMessage = useCommonActions().setSnackbarMessage;

  const editedRestaurant = location.state?.restaurant?.editValue || {};
  const editedRestaurantId = location.state?.restaurant?.id || "";

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
      : [{ value: "", error: true }]
  );
  const [isManagedByOwner, setIsManagedByOwner] = useState(
    editedRestaurant.isManagedByOwner
  );

  // Timings and Facilities
  const [dineInDetails, setDineInDetails] = useState(
    editedRestaurant.dineInDetails || {
      enabled: false,
      timings: [null],
    }
  );
  const [takeawayDetails, setTakeawayDetails] = useState(
    editedRestaurant.takeAwayDetails || {
      enabled: false,
      timings: [null],
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
      timings: [null],
    }
  );

  const addNewItemToCuisines = (values: any) => {
    const latestItem = values[values.length - 1];
    if (latestItem?.__isNew__) {
      setCuisinesList([
        ...cuisinesList,
        {
          label: convertToCapitalCase(latestItem.label),
          value: latestItem.value.toUpperCase(),
        },
      ]);
    }
    setCuisines(values);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();

    setLoading(true);
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());

    const fieldsForValidation = {
      ...formDataObject,
      cuisines,
    };

    const states = {
      name,
      cuisines,
      dineInDetails,
      takeawayDetails,
      deliveryDetails,
      gmapLink,
      fullAddress,
      areaName,
      avgPriceForOne,
      phoneNumbers,
      isManagedByOwner,
    };

    const { error, payload } = getPayload(states);
    if (error) {
      setSnackbarMessage(error);
      setLoading(false);
      return;
    }

    // @ts-ignore
    payload.user = loggedInUser;

    /**
     * Add/Save restaurant details
     */
    let response = null;
    if (editedRestaurant) {
      response = await saveRestaurantDetails(payload, editedRestaurantId);
    } else {
      response = await addRestaurant(payload);
    }

    if (!response) {
      setLoading(false);
      throw new Error("Something went wrong");
    }

    if (editedRestaurant) {
      // Edit flow
      navigate(ROUTES.RESTAURANTS, { replace: true });
    } else {
      // Add flow
      navigate(ROUTES.MENU, { replace: true });
    }
  };

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
      onSubmit,
      addNewItemToCuisines,
    },
  };
};

export default useAddRestaurantStates;
