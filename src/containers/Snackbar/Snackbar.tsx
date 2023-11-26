import React, { useEffect } from "react";
import { useCommonActions, useCommonStates } from "../../store/commonStore";
import { SnackbarContainer } from "./Snackbar.styles";

const Snackbar = () => {
  const { snackbarMessage } = useCommonStates();
  const { setSnackbarMessage } = useCommonActions();

  useEffect(() => {
    if (snackbarMessage) {
      setTimeout(() => {
        setSnackbarMessage("");
      }, 3000);
    }
    // should only run when snackbarMessage changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackbarMessage]);

  return snackbarMessage ? (
    <SnackbarContainer show={snackbarMessage.length > 0}>
      {snackbarMessage}
    </SnackbarContainer>
  ) : (
    <></>
  );
};

export default Snackbar;
