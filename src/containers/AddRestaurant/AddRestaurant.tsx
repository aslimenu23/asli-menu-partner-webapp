import React, { useState } from "react";
import {
  AddRestaurantWrapper,
  PhoneNumbersWrapper,
  TimingsWrapper,
} from "./AddRestaurant.styles";
import TextInput from "../../components/TextInput/TextInput";
import Select from "../../components/Select/Select";
import { AREA_TYPES_LIST } from "./AddRestaurant.constants";
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
import { SetTiming, Timing } from "./AddRestaurant.types";
import { restaurantDetails } from "../../actions/actions";

const AddRestaurant = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editedRestaurant = location.state?.restaurant || {};

  // Basic details
  const [phoneNumbers, setPhoneNumbers] = useState<any[]>(
    editedRestaurant.phoneNumbers || [""]
  );
  const [images, setImages] = useState(editedRestaurant.images || [{}]);

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
    editedRestaurant.dineInDetails?.timings || [{ startTime: "", endTime: "" }]
  );
  const [takeawayTimings, setTakeawayTimings] = useState<Timing[]>(
    editedRestaurant.takeawayDetails?.timings || [
      { startTime: "", endTime: "" },
    ]
  );
  const [deliveryTimings, setDeliveryTimings] = useState<Timing[]>(
    editedRestaurant.deliveryDetails?.timings || [
      { startTime: "", endTime: "" },
    ]
  );

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());

    const {
      name,
      location,
      fullAddress,
      cuisine,
      area,
      freeDeliveryDistance,
      avgPrice,
    } = formDataObject;
    const payload = {
      name,
      images,
      phoneNumbers,
      avgPrice,
      cuisines: (cuisine as string).split(",").map((cuisine) => cuisine.trim()),
      location: {
        gmapLink: location,
        areaName: area,
        fullAddress,
      },
      dineInDetails: {
        enabled: dineIn,
        timings: restaurantTimings,
        freeDeliveryDistance,
      },
      takeAwayDetails: {
        enabled: takeaway,
        timings: takeawayTimings,
      },
      deliveryDetails: {
        enabled: delivery,
        timings: deliveryTimings,
      },
    };

    /**
     * Add restaurant -> Add menu
     */

    const response = await restaurantDetails(payload);

    // Edit flow
    if (editedRestaurant) {
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
            label={`Phone number ${index + 1}`}
            name={`phone_${index + 1}`}
            defaultValue={phoneNumber[index]}
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
      updateStateFunction([...stateKey, { startTime: "", endTime: "" }]);
    };

    const removeTime = (index: number) => {
      restaurantTimings.splice(index, 1);
      updateStateFunction([...stateKey]);
    };

    const onTimeChange = (value: any, index: number, key: string) => {
      updateStateFunction((prevTimings) => {
        // @ts-ignore
        prevTimings[index][key] = value;
        return [...prevTimings];
      });
    };

    const currentTimings = images.map((time: any, index: number) => {
      return (
        <TimingsWrapper key={index}>
          <label>{title}</label>
          <div>
            <TimePicker
              label="Start Time"
              name={`${nameKey}_from_${index + 1}`}
              value={stateKey[index].startTime}
              onChange={(value) => onTimeChange(value, index, "startTime")}
            />
            <TimePicker
              label="End Time"
              name={`${nameKey}_to_${index + 1}`}
              value={stateKey[index].endTime}
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
        <TextInput
          isRequired
          label="Restaurant Cuisine"
          name="cuisine"
          defaultValue={editedRestaurant.cuisines?.join(", ")}
        />
        <Select
          isRequired
          label="Restaurant Area"
          name="area"
          list={AREA_TYPES_LIST}
          defaultValue={editedRestaurant.location?.areaName}
        />
        <TextInput
          label="Free delivery distance"
          name="freeDeliveryDistance"
          placeholder="Distance in kms"
          inputType={InputTypes.NUMBER}
          defaultValue={editedRestaurant.deliveryDetails?.freeDeliveryDistance}
        />
        <TextInput
          label="Avg. Price"
          name="avgPrice"
          inputType={InputTypes.NUMBER}
          defaultValue={editedRestaurant.avgPrice}
        />
        {renderPhoneNumbers()}
        {renderPhotoUploadInputs()}
        {renderTimings({
          stateKey: restaurantTimings,
          updateStateFunction: setRestaurantTimings,
          nameKey: "restaurantTimings",
          title: "Restaurant Timings",
        })}

        <Checkbox
          label="Is managed by owner?"
          name="isManagedByOwner"
          defaultValue={editedRestaurant.isManagedByOwner}
        />

        <Checkbox
          label="Dine in"
          name="dineIn"
          value={dineIn.toString()}
          onChange={(value) => setDineIn(value)}
        />

        <Checkbox
          label="Takeaway"
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

        <Checkbox
          label="Delivery"
          name="delivery"
          value={delivery.toString()}
          onChange={(value) => setDelivery(value)}
        />
        {delivery ? (
          renderTimings({
            stateKey: deliveryTimings,
            updateStateFunction: setDeliveryTimings,
            nameKey: "deliveryTimings",
            title: "Delivery Timings",
          })
        ) : (
          <></>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </AddRestaurantWrapper>
  );
};

export default AddRestaurant;
