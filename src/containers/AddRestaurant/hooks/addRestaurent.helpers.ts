export const getPayload = (states: any) => {
  const {
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
  } = states;

  const requiredStringFields = [name, gmapLink, fullAddress, avgPriceForOne];
  const isAnyRequiredStringFieldEmpty = requiredStringFields.some(
    (field) => !field.value || field.error
  );
  const requiredSelectFields = [areaName, cuisines];
  const isAnyRequiredSelectFieldEmpty = requiredSelectFields.some((field) => {
    if (!field) return true;
    if (Array.isArray(field)) {
      return field.length === 0;
    }
    return false;
  });
  if (isAnyRequiredStringFieldEmpty || isAnyRequiredSelectFieldEmpty) {
    return {
      error: "Please fill all the required fields",
      payload: {},
    };
  }

  const anyPhoneNumbersHaveError =
    phoneNumbers.length === 0 || phoneNumbers.find((p: any) => p.error);
  if (anyPhoneNumbersHaveError) {
    return {
      error: "Please enter valid phone numbers",
      payload: {},
    };
  }

  const isAnyFacilityEnabled =
    deliveryDetails.enabled || dineInDetails.enabled || takeawayDetails.enabled;
  if (!isAnyFacilityEnabled) {
    return {
      error:
        "Please select atleast one of the Facilities - Dine In, Delivery or TakeAway",
      payload: {},
    };
  }

  let facilityError = "";
  [dineInDetails, deliveryDetails, takeawayDetails].forEach((facility) => {
    if (facility.enabled && facility.timings.length > 0) {
      facility.timings.forEach((timing: any) => {
        if (!timing?.startTime || !timing?.endTime) {
          facilityError = "Please add start and end time for the facility";
        }
      });
    }
  });
  if (facilityError) {
    return {
      error: facilityError,
      payload: {},
    };
  }

  return {
    error: "",
    payload: {
      cuisines: cuisines.map((c: any) => c.value),
      metadata: {
        isManagedByOwner,
      },
      name: name.value,
      dineInDetails: dineInDetails.enabled ? dineInDetails : null,
      deliveryDetails: deliveryDetails.enabled ? deliveryDetails : null,
      takeawayDetails: takeawayDetails.enabled ? takeawayDetails : null,
      location: {
        areaName,
        gmapLink: gmapLink.value,
        fullAddress: fullAddress.value,
      },
      avgPrice: avgPriceForOne.value,
      phoneNumbers: phoneNumbers.map((p: any) => p.value),
    },
  };
};
