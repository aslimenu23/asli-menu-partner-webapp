import React from "react";
import { AddRestaurantWrapper } from "./AddRestaurant.styles";
import TextInput from "../../components/TextInput/TextInput";
import Checkbox from "../../components/Checkbox/Checkbox";
import { InputTypes } from "../../components/TextInput/TextInput.types";
import Button from "../../components/Button/Button";
import { AREA_TYPES } from "./AddRestaurant.constants";
import Section from "../../components/Section/Section";
import Select from "../../components/Select/Select";
import Loader from "../../components/Loader/Loader";
import PhoneNumbers from "./renderers/PhoneNumbers";
import Timings from "./renderers/Timings";
import useAddRestaurantStates from "./hooks/addRestaurent.hook";

const AddRestaurant = () => {
  const {
    states: addRestaurantStates,
    actions: {
      setName,
      setGmapLink,
      setAvgPriceForOne,
      setPhoneNumbers,
      setIsManagedByOwner,
      setDineInDetails,
      setTakeawayDetails,
      setDeliveryDetails,
      setFullAddress,
      setAreaName,
      setFreeDeliveryDistance,
      onSubmit,
      addNewItemToCuisines,
    },
  } = useAddRestaurantStates();

  const {
    name,
    gmapLink,
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
    fullAddress,
    areaName,
    freeDeliveryDistance,
  } = addRestaurantStates;

  return (
    <AddRestaurantWrapper>
      <form onSubmit={onSubmit} noValidate>
        <Section text="Basic Restaurant Details" removeMarginTop />
        <TextInput
          isRequired
          label="Restaurant Name"
          name="name"
          value={name.value}
          error={name.error}
          onChange={(value: any, error) => setName({ value, error })}
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
        <TextInput
          isRequired
          label="Restaurant Location"
          name="gmapLink"
          placeholder="Paste map link here"
          value={gmapLink.value}
          error={gmapLink.error}
          onChange={(value: any, error) => setGmapLink({ value, error })}
        />
        <TextInput
          isRequired
          label="Restaurant Full Address"
          name="fullAddress"
          value={fullAddress.value}
          error={fullAddress.error}
          onChange={(value: any, error) => setFullAddress({ value, error })}
        />
        <Select
          isRequired
          label="Restaurant Area"
          name="areaName"
          list={Object.values(AREA_TYPES)}
          value={areaName}
          onChange={(value: any) => setAreaName(value.value)}
          validationError={validationErrors.area}
        />
        <TextInput
          isRequired
          label="Average Price For One"
          name="avgPrice"
          inputType={InputTypes.NUMBER}
          value={avgPriceForOne.value}
          error={avgPriceForOne.error}
          onChange={(value: any, error) => setAvgPriceForOne({ value, error })}
        />

        <Section text="Manager/Owner Details" />

        <PhoneNumbers phoneNumbers={phoneNumbers} onChange={setPhoneNumbers} />
        <Checkbox
          label="Is managed by owner?"
          name="isManagedByOwner"
          value={isManagedByOwner}
          onChange={(value: any) => setIsManagedByOwner(value)}
        />

        <Section text="Timings and Facilities" />

        {/* Dine In */}
        <Checkbox
          label={`Dine In ${
            dineInDetails.enabled ? "(Select timings below)" : ""
          }`}
          name="dineIn"
          value={dineInDetails.enabled}
          onChange={(value) =>
            setDineInDetails({
              ...dineInDetails,
              enabled: value,
            })
          }
        />
        <Timings
          time={dineInDetails.timings}
          onChange={(value: any) => {
            setDineInDetails({ ...dineInDetails, timings: value });
            // setting the same time in delivery if delivery is not enabled yet
            if (!deliveryDetails.enabled) {
              setDeliveryDetails({
                ...deliveryDetails,
                timings: value,
              });
            }
            if (!takeawayDetails.enabled) {
              setTakeawayDetails({
                ...takeawayDetails,
                timings: value,
              });
            }
          }}
          name="restaurantTimings"
          title=""
          shouldShow={dineInDetails.enabled}
        />

        {/* Delivery */}
        <Checkbox
          label={`Delivery ${
            deliveryDetails.enabled ? "(Select timings below)" : ""
          }`}
          name="delivery"
          value={deliveryDetails.enabled}
          onChange={(value) =>
            setDeliveryDetails({
              ...deliveryDetails,
              enabled: value,
            })
          }
        />
        <Timings
          time={deliveryDetails.timings}
          onChange={(value: any) =>
            setDeliveryDetails({ ...deliveryDetails, timings: value })
          }
          name="deliveryTimings"
          title=""
          shouldShow={deliveryDetails.enabled}
        />
        {deliveryDetails.enabled ? (
          <TextInput
            label="Free Delivery Distance (in Kms)"
            name="freeDeliveryDistance"
            placeholder="Distance in kms"
            inputType={InputTypes.NUMBER}
            value={freeDeliveryDistance.value}
            error={freeDeliveryDistance.error}
            onChange={(value: any, error) =>
              setFreeDeliveryDistance({ value, error })
            }
          />
        ) : (
          <></>
        )}

        {/* Take Away */}
        <Checkbox
          label={`TakeAway ${
            takeawayDetails.enabled ? "(Select timings below)" : ""
          }`}
          name="takeaway"
          value={takeawayDetails.enabled}
          onChange={(value) =>
            setTakeawayDetails({
              ...takeawayDetails,
              enabled: value,
            })
          }
        />
        <Timings
          time={takeawayDetails.timings}
          onChange={(value: any) =>
            setTakeawayDetails({ ...takeawayDetails, timings: value })
          }
          name="takeawayTimings"
          title=""
          shouldShow={takeawayDetails.enabled}
        />

        <Button type="submit">
          {loading ? <Loader isSmall /> : <>Submit</>}
        </Button>
      </form>
    </AddRestaurantWrapper>
  );
};

export default AddRestaurant;
