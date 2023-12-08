import React from "react";
import { AddRestaurantWrapper } from "./AddRestaurant.styles";
import TextInput from "../../components/TextInput/TextInput";
import { FIELD_NAMES_FOR_CUSTOM_VALIDATION } from "./AddRestaurant.constants";
import Checkbox from "../../components/Checkbox/Checkbox";
import { InputTypes } from "../../components/TextInput/TextInput.types";
import Button from "../../components/Button/Button";
import { ROUTES } from "../../common/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { AREA_TYPES } from "./AddRestaurant.types";
import { addRestaurant, saveRestaurantDetails } from "../../actions/actions";
import { useUserStates } from "../../store/userStore";
import Section from "../../components/Section/Section";
import { useCommonActions } from "../../store/commonStore";
import {
  convertToCapitalCase,
  performCustomValidations,
} from "../../common/utils";
import Select from "../../components/Select/Select";
import Loader from "../../components/Loader/Loader";
import PhoneNumbers from "./renderers/PhoneNumbers";
import Timings from "./renderers/Timings";
import useAddRestaurantStates from "./hooks/addRestaurent.hook";

const AddRestaurant = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loggedInUser = useUserStates().loggedInUser;
  const setSnackbarMessage = useCommonActions().setSnackbarMessage;

  const editedRestaurant = location.state?.restaurant?.editValue || {};
  const editedRestaurantId = location.state?.restaurant?.id || "";

  const {
    states: addRestaurantStates,
    actions: {
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
      setFullAddress,
      setAreaName,
      setFreeDeliveryDistance,
      setDeliveryFee,
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
    deliveryFee,
  } = addRestaurantStates;

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

    // TODO: Move the error checking to a generic function

    // Validations for custom select
    const validationsPassed = performCustomValidations(
      fieldsForValidation,
      FIELD_NAMES_FOR_CUSTOM_VALIDATION
    );

    if (!validationsPassed.isValid) {
      setValidationErrors(validationsPassed.errors);
      setLoading(false);
      return;
    }

    // Validation for facilities checkboxes
    if (
      !(
        takeawayDetails.enabled ||
        deliveryDetails.enabled ||
        dineInDetails.enabled
      )
    ) {
      setSnackbarMessage(
        "Please select atleast one of the Facilities - Dine In, Delivery or TakeAway"
      );
      setLoading(false);
      return;
    }

    // Validation for phone numbers
    const anyPhoneNumbersHaveError = phoneNumbers.find((p) => p.error);
    if (anyPhoneNumbersHaveError) {
      setSnackbarMessage("Incorrect phone number");
      setLoading(false);
      return;
    }

    const payload = {
      name,
      cuisines,
      dineInDetails,
      takeawayDetails,
      deliveryDetails,
      user: loggedInUser,
      location: {
        gmapLink,
        fullAddress,
        areaName,
      },
      avgPrice: avgPriceForOne,
      phoneNumbers: phoneNumbers.map((p) => p.value),
      metadata: {
        isManagedByOwner,
      },
    };

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

  return (
    <AddRestaurantWrapper>
      <form onSubmit={onSubmit}>
        <Section text="Basic Restaurant Details" removeMarginTop />
        <TextInput
          isRequired
          label="Restaurant Name"
          name="name"
          value={name.value}
          error={name.error}
          onChange={(value: any, error) => setName({ value, error })}
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
          label="Dine In"
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
          onChange={(value: any) =>
            setDineInDetails({ ...dineInDetails, timings: value })
          }
          name="restaurantTimings"
          title="Restaurant Timings"
          shouldShow={dineInDetails.enabled}
        />

        {/* Delivery */}
        <Checkbox
          label="Delivery"
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
          title="Delivery Timings"
          shouldShow={deliveryDetails.enabled}
        />
        {deliveryDetails.enabled ? (
          <>
            <TextInput
              label="Free Delivery Distance"
              name="freeDeliveryDistance"
              placeholder="Distance in kms"
              inputType={InputTypes.NUMBER}
              value={freeDeliveryDistance.value}
              error={freeDeliveryDistance.error}
              onChange={(value: any, error) =>
                setFreeDeliveryDistance({ value, error })
              }
            />
            <TextInput
              label="Delivery Fee Post Free Distance"
              name="deliveryFee"
              inputType={InputTypes.NUMBER}
              value={deliveryFee.value}
              error={deliveryFee.error}
              onChange={(value: any, error) => setDeliveryFee({ value, error })}
            />
          </>
        ) : (
          <></>
        )}

        {/* Take Away */}
        <Checkbox
          label="Takeway"
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
          title="Takeaway Timings"
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
