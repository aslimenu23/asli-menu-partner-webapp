import React, { useState } from "react";
import {
  AddRestaurantWrapper,
  PhoneNumbersWrapper,
} from "./AddRestaurant.styles";
import TextInput from "../../components/TextInput/TextInput";
import { FIELD_NAMES_FOR_CUSTOM_VALIDATION } from "./AddRestaurant.constants";
import Checkbox from "../../components/Checkbox/Checkbox";
import { InputTypes } from "../../components/TextInput/TextInput.types";
import Button from "../../components/Button/Button";
import AddDeleteIcon from "../../components/AddDeleteIcon/AddDeleteIcon";
import { MAX_RESTAURANT_PHOTO_COUNT, ROUTES } from "../../common/constants";
import ImageInput from "../../components/ImageInput/ImageInput";
import { useLocation, useNavigate } from "react-router-dom";
import { AREA_TYPES, SetTiming, Timing } from "./AddRestaurant.types";
import { addRestaurant, saveRestaurantDetails } from "../../actions/actions";
import { useUserStates } from "../../store/userStore";
import moment from "moment";
import Section from "../../components/Section/Section";
import { useCommonStates } from "../../store/commonStore";
import {
  convertToCapitalCase,
  performCustomValidations,
} from "../../common/utils";
import Select from "../../components/Select/Select";
import Loader from "../../components/Loader/Loader";
import PhoneNumbers from "./PhoneNumbers";
import Timings from "./Timings";

const AddRestaurant = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loggedInUser = useUserStates().loggedInUser;
  const resChoices = useCommonStates().resChoices;

  const editedRestaurant = location.state?.restaurant?.editValue || {};
  const editedRestaurantId = location.state?.restaurant?.id || "";

  const [loading, setLoading] = useState(false);

  const [cuisinesList, setCuisinesList] = useState<any[]>(
    resChoices?.cuisines || []
  );

  const [cuisines, setCuisines] = useState<any[]>(editedRestaurant.cuisines);
  const [areaName, setAreaName] = useState<any[]>(
    editedRestaurant.location?.areaName
  );

  const [validationErrors, setValidationErrors] = useState<any>({});

  // Basic details
  const [phoneNumbers, setPhoneNumbers] = useState<any[]>(
    editedRestaurant.phoneNumbers && editedRestaurant.phoneNumbers.length > 0
      ? editedRestaurant.phoneNumbers
      : [""]
  );
  const [images, setImages] = useState(
    editedRestaurant.images && editedRestaurant.images.length > 0
      ? editedRestaurant.images
      : [{}]
  );

  // boolean
  const [dineIn, setDineIn] = useState(
    !!editedRestaurant.dineInDetails?.enabled
  );
  const [takeaway, setTakeaway] = useState(
    !!editedRestaurant.takeAwayDetails?.enabled
  );
  const [delivery, setDelivery] = useState(
    !!editedRestaurant.deliveryDetails?.enabled
  );

  // Timings
  const [restaurantTimings, setRestaurantTimings] = useState<Timing[]>(
    editedRestaurant.dineInDetails?.timings &&
      editedRestaurant.dineInDetails?.timings.length > 0
      ? editedRestaurant.dineInDetails?.timings
      : [{ startTime: moment(), endTime: moment() }]
  );
  const [takeawayTimings, setTakeawayTimings] = useState<Timing[]>(
    editedRestaurant.takeawayDetails?.timings &&
      editedRestaurant.takeawayDetails?.timings.length > 0
      ? editedRestaurant.takeawayDetails?.timings
      : [{ startTime: moment(), endTime: moment() }]
  );
  const [deliveryTimings, setDeliveryTimings] = useState<Timing[]>(
    editedRestaurant.deliveryDetails?.timings &&
      editedRestaurant.deliveryDetails?.timings.length > 0
      ? editedRestaurant.deliveryDetails?.timings
      : [{ startTime: moment(), endTime: moment() }]
  );

  const addNewItemToCuisines = (values: any) => {
    const latestItem = values[values.length - 1];
    if (latestItem.__isNew__) {
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

    const { name, location, fullAddress, freeDeliveryDistance, avgPrice } =
      formDataObject;

    const fieldsForValidation = {
      ...formDataObject,
      cuisines,
      areaName,
    };

    const validationsPassed = performCustomValidations(
      fieldsForValidation,
      FIELD_NAMES_FOR_CUSTOM_VALIDATION
    );

    if (!validationsPassed.isValid) {
      setValidationErrors(validationsPassed.errors);
      setLoading(false);
      return;
    }

    const payload = {
      user: loggedInUser,
      name,
      images,
      phoneNumbers,
      avgPrice,
      cuisines,
      location: {
        areaName,
        fullAddress,
        gmapLink: location,
      },
      dineInDetails: {
        enabled: dineIn,
        timings: restaurantTimings,
        freeDeliveryDistance,
      },
      takeAwayDetails: takeaway
        ? {
            enabled: takeaway,
            timings: takeawayTimings,
          }
        : null,
      deliveryDetails: delivery
        ? {
            enabled: delivery,
            timings: deliveryTimings,
          }
        : null,
    };

    /**
     * Add restaurant -> Add menu
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

  return (
    <AddRestaurantWrapper>
      <form onSubmit={onSubmit}>
        <Section text="Basic Restaurant Details" removeMarginTop />
        <TextInput
          isRequired
          label="Restaurant Name"
          name="name"
          defaultValue={editedRestaurant.name}
        />
        <TextInput
          isRequired
          label="Restaurant Location"
          name="location"
          placeholder="Paste map link here"
          defaultValue={editedRestaurant.location?.gmapLink}
        />
        <TextInput
          isRequired
          label="Restaurant Full Address"
          name="fullAddress"
          defaultValue={editedRestaurant.location?.fullAddress}
        />
        <Select
          isRequired
          isMulti
          isCreatable
          label="Restaurant Cuisine"
          name="cuisines"
          list={cuisinesList}
          value={cuisines}
          onChange={addNewItemToCuisines}
          validationError={validationErrors.cuisines}
        />
        <Select
          isRequired
          label="Restaurant Area"
          name="areaName"
          list={Object.values(AREA_TYPES)}
          value={areaName}
          onChange={(value: any) => setAreaName(value)}
          validationError={validationErrors.area}
        />
        <TextInput
          label="Average Price"
          name="avgPrice"
          inputType={InputTypes.NUMBER}
          defaultValue={editedRestaurant.avgPrice}
        />

        <Section text="Manager/Owner Details" />
        <PhoneNumbers phoneNumbers={phoneNumbers} onChange={setPhoneNumbers} />
        <Checkbox
          label="Is managed by owner?"
          name="isManagedByOwner"
          defaultValue={editedRestaurant.isManagedByOwner}
        />

        <Section text="Timings and Facilities" />
        {/* Dine In */}
        <Checkbox
          label="Dine In"
          name="dineIn"
          value={dineIn.toString()}
          onChange={(value) => setDineIn(value)}
        />
        <Timings
          time={restaurantTimings}
          onChange={setRestaurantTimings}
          name="restaurantTimings"
          title="Restaurant Timings"
          shouldShow={dineIn}
        />

        {/* Delivery */}
        <Checkbox
          label="Delivery"
          name="delivery"
          value={delivery.toString()}
          onChange={(value) => setDelivery(value)}
        />
        <Timings
          time={deliveryTimings}
          onChange={setDeliveryTimings}
          name="deliveryTimings"
          title="Delivery Timings"
          shouldShow={delivery}
        />
        {delivery ? (
          <>
            <TextInput
              label="Free Delivery Distance"
              name="freeDeliveryDistance"
              placeholder="Distance in kms"
              inputType={InputTypes.NUMBER}
              defaultValue={
                editedRestaurant.deliveryDetails?.freeDeliveryDistance
              }
            />
            <TextInput
              label="Delivery Fee Post Free Distance"
              name="deliveryFee"
              inputType={InputTypes.NUMBER}
              defaultValue={editedRestaurant.deliveryFee || 0}
            />
          </>
        ) : (
          <></>
        )}

        {/* Take Away */}
        <Checkbox
          label="Takeway"
          name="takeaway"
          value={takeaway.toString()}
          onChange={(value) => setTakeaway(value)}
        />
        <Timings
          time={takeawayTimings}
          onChange={setTakeawayTimings}
          name="takeawayTimings"
          title="Takeaway Timings"
          shouldShow={takeaway}
        />

        <Button type="submit">
          {loading ? <Loader isSmall /> : <>Submit</>}
        </Button>
      </form>
    </AddRestaurantWrapper>
  );
};

export default AddRestaurant;
