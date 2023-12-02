import React, { useState } from "react";
import {
  AddRestaurantWrapper,
  PhoneNumbersWrapper,
  TimingsWrapper,
} from "./AddRestaurant.styles";
import TextInput from "../../components/TextInput/TextInput";
import { FIELD_NAMES_FOR_CUSTOM_VALIDATION } from "./AddRestaurant.constants";
import Checkbox from "../../components/Checkbox/Checkbox";
import { InputTypes } from "../../components/TextInput/TextInput.types";
import Button from "../../components/Button/Button";
import AddDeleteIcon from "../../components/AddDeleteIcon/AddDeleteIcon";
import {
  MAX_RESTAURANT_PHONE_COUNT,
  MAX_RESTAURANT_PHOTO_COUNT,
  MAX_RESTAURANT_TIMINGS_COUNT,
  ROUTES,
} from "../../common/constants";
import ImageInput from "../../components/ImageInput/ImageInput";
import { useLocation, useNavigate } from "react-router-dom";
import TimePicker from "../../components/TimePicker/TimePicker";
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

  const renderPhoneNumbers = () => {
    const addPhoneNumber = () => {
      setPhoneNumbers([...phoneNumbers, ""]);
    };

    const removePhoneNumber = (index: number) => {
      phoneNumbers.splice(index, 1);
      setPhoneNumbers([...phoneNumbers]);
    };

    const onPhoneNumberChange = (value: string, index: number) => {
      setPhoneNumbers((prevPhoneNumbers) => {
        prevPhoneNumbers[index] = value;
        return [...prevPhoneNumbers];
      });
    };

    const currentPhoneNumbers = phoneNumbers.map((phoneNumber, index) => {
      return (
        <PhoneNumbersWrapper key={index}>
          <TextInput
            noMargin
            isRequired={index < MAX_RESTAURANT_PHONE_COUNT / 2}
            label={`Phone Number ${index + 1}`}
            name={`phone_${index + 1}`}
            defaultValue={phoneNumber}
            inputType={InputTypes.MOBILE}
            onChange={(value) => onPhoneNumberChange(value, index)}
          />
          <AddDeleteIcon
            index={index}
            list={phoneNumbers}
            listMaxOut={MAX_RESTAURANT_PHONE_COUNT}
            addCb={addPhoneNumber}
            deleteCb={removePhoneNumber}
          />
        </PhoneNumbersWrapper>
      );
    });

    return currentPhoneNumbers;
  };

  const renderPhotoUploadInputs = () => {
    const addImage = () => {
      setImages([...images, {}]);
    };

    const removeImage = (index: number) => {
      images.splice(index, 1);
      setImages([...images]);
    };

    const onImageUpload = (file: any, index: number) => {
      setImages((prevImages: any) => {
        prevImages[index] = file;
        return [...prevImages];
      });
    };

    const currentImages = images.map((image: any, index: number) => {
      return (
        <PhoneNumbersWrapper key={index}>
          <ImageInput
            noMargin
            isRequired={index < MAX_RESTAURANT_PHOTO_COUNT / 2}
            name={`image_${index + 1}`}
            label={`Upload restaurant photo ${index + 1}`}
            onChange={(file) => onImageUpload(file, index)}
          />
          <AddDeleteIcon
            index={index}
            list={images}
            listMaxOut={MAX_RESTAURANT_PHOTO_COUNT}
            addCb={addImage}
            deleteCb={removeImage}
          />
        </PhoneNumbersWrapper>
      );
    });

    return currentImages;
  };

  const renderTimings = ({
    stateKey,
    updateStateFunction,
    nameKey,
    title,
  }: {
    stateKey: Timing[];
    updateStateFunction: SetTiming;
    nameKey: string;
    title: string;
  }) => {
    const addTime = () => {
      updateStateFunction([
        ...stateKey,
        {
          startTime: moment(),
          endTime: moment(),
        },
      ]);
    };

    const removeTime = (index: number) => {
      restaurantTimings.splice(index, 1);
      updateStateFunction([...stateKey]);
    };

    const onTimeChange = (value: any, index: number, key: string) => {
      updateStateFunction((prevTimings) => {
        // @ts-ignore
        prevTimings[index][key] = moment(value).format("HH:mm");
        return [...prevTimings];
      });
    };

    const currentTimings = stateKey.map((time: any, index: number) => {
      return (
        <TimingsWrapper key={index}>
          <label>{title}</label>
          <div>
            <TimePicker
              label="Start Time"
              name={`${nameKey}_from_${index + 1}`}
              value={moment(stateKey[index].startTime, "HH:mm")}
              onChange={(value) => onTimeChange(value, index, "startTime")}
            />
            <TimePicker
              label="End Time"
              name={`${nameKey}_to_${index + 1}`}
              value={moment(stateKey[index].endTime, "HH:mm")}
              onChange={(value) => onTimeChange(value, index, "endTime")}
            />
            <AddDeleteIcon
              index={index}
              list={stateKey}
              listMaxOut={MAX_RESTAURANT_TIMINGS_COUNT}
              addCb={addTime}
              deleteCb={removeTime}
            />
          </div>
        </TimingsWrapper>
      );
    });

    return currentTimings;
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
        {/* {renderPhotoUploadInputs()} */}

        <Section text="Manager/Owner Details" />
        {renderPhoneNumbers()}
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
        {dineIn ? (
          renderTimings({
            stateKey: restaurantTimings,
            updateStateFunction: setRestaurantTimings,
            nameKey: "restaurantTimings",
            title: "Restaurant Timings",
          })
        ) : (
          <></>
        )}

        {/* Delivery */}
        <Checkbox
          label="Delivery"
          name="delivery"
          value={delivery.toString()}
          onChange={(value) => setDelivery(value)}
        />
        {delivery ? (
          <>
            {renderTimings({
              stateKey: deliveryTimings,
              updateStateFunction: setDeliveryTimings,
              nameKey: "deliveryTimings",
              title: "Delivery Timings",
            })}
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
        {takeaway ? (
          renderTimings({
            stateKey: takeawayTimings,
            updateStateFunction: setTakeawayTimings,
            nameKey: "takeawayTimings",
            title: "Takeaway Timings",
          })
        ) : (
          <></>
        )}

        <Button type="submit">
          {loading ? <Loader isSmall /> : <>Submit</>}
        </Button>
      </form>
    </AddRestaurantWrapper>
  );
};

export default AddRestaurant;
