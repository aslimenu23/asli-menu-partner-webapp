import React, { useCallback, useEffect, useRef, useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import { InputTypes } from "../../components/TextInput/TextInput.types";
import Button from "../../components/Button/Button";
import { LoginWrapper, LoginContent } from "./Login.styles";
import { useLocation, useNavigate } from "react-router-dom";
import firebase, {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "../../services/firebase";
import { createUser, verifyUser } from "../../actions/actions";
import qs from "query-string";
import { useUserActions } from "../../store/userStore";
import { ROUTES } from "../../common/constants";
import { unstable_batchedUpdates } from "react-dom";
import { useCommonActions } from "../../store/commonStore";

const Login = () => {
  const auth = getAuth(firebase);
  const navigate = useNavigate();
  const location = useLocation();

  const setLoggedInUser = useUserActions().setLoggedInUser;
  const { setSnackbarMessage } = useCommonActions();

  const [userAuthObject, setUserAuthObject] = useState<any>(null);
  const [readyToRedirect, setReadyToRedirect] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const [phone, setPhone] = useState({
    value: "",
    error: "",
  });
  const [name, setName] = useState({
    value: "",
    error: "",
  });
  const [newUser, setNewUser] = useState(false);
  const [enableOTP, setEnableOTP] = useState(false);
  const [otp, setOtp] = useState({
    value: "",
    error: "",
  });

  const confirmationResultRef = useRef<any>();
  const getOtpButtonRef = useRef<any>();

  const redirectUser = useCallback(() => {
    setTimeout(() => {
      if (location.search) {
        const redirectUrl = qs.parse(location.search).redirect;
        navigate((redirectUrl as string).substring(1), {
          replace: true,
        });
      } else {
        navigate(ROUTES.RESTAURANTS, {
          replace: true,
        });
      }
    });
  }, [location.search, navigate]);

  const signIn = async (recaptchaVerifier: any) => {
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${phone.value}`,
        recaptchaVerifier
      );
      confirmationResultRef.current = confirmationResult;
      unstable_batchedUpdates(() => {
        setEnableOTP(true);
        setIsButtonLoading(false);
      });
    } catch (error) {
      setIsButtonLoading(false);
      setSnackbarMessage("Pls refresh the page and try again");
    }
  };

  const sendOTP = async () => {
    try {
      setIsButtonLoading(true);
      // Setup recaptcha to be triggered from the signInWithPhoneNumber call internally
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        getOtpButtonRef.current,
        {
          size: "invisible",
          callback: () => {},
        }
      );
      await signIn(recaptchaVerifier);
    } catch (error) {
      setIsButtonLoading(false);
      setSnackbarMessage("Pls refresh the page and try again");
    }
  };

  const onSubmitOtp = async () => {
    try {
      setIsButtonLoading(true);
      const result = await confirmationResultRef.current.confirm(otp.value);

      setUserAuthObject({
        ...result.user.reloadUserInfo,
        uid: result.user.uid,
      });

      const userResponse = await verifyUser({
        phoneNumber: result.user.phoneNumber,
      });

      unstable_batchedUpdates(() => {
        if (userResponse?.isNewUser) {
          setNewUser(true);
        } else {
          setLoggedInUser(userResponse);
          setReadyToRedirect(true);
        }
      });
      setIsButtonLoading(false);
    } catch (error) {
      setIsButtonLoading(false);
      setSnackbarMessage("Invalid OTP!");
    }
  };

  const signUpUser = async () => {
    try {
      setIsButtonLoading(true);
      // BE API to add user and navigate to next page
      const response = await createUser({
        name: name.value,
        ...userAuthObject,
      });

      unstable_batchedUpdates(() => {
        setLoggedInUser(response);
        setReadyToRedirect(true);
        setIsButtonLoading(false);
      });
    } catch (error) {
      setIsButtonLoading(false);
      setSnackbarMessage("Pls refresh the page and try again");
    }
  };

  useEffect(() => {
    if (readyToRedirect) redirectUser();
  }, [readyToRedirect, redirectUser]);

  const renderBasicFlow = () => {
    return (
      <>
        <TextInput
          label="Phone number"
          name="phone"
          value={phone.value}
          error={phone.error}
          inputType={InputTypes.MOBILE}
          onChange={(value, error) => setPhone({ value, error })}
        />
        {!(enableOTP || newUser) ? (
          <Button
            ref={getOtpButtonRef}
            isDisabled={phone.error.length > 0}
            onClick={sendOTP}
            isLoading={isButtonLoading}
          >
            Send OTP
          </Button>
        ) : (
          <></>
        )}
      </>
    );
  };

  const renderOTPFlow = () => {
    /* Below UI is enabled when the OTP is sent */
    return enableOTP ? (
      <>
        <TextInput
          label="Enter OTP"
          name="otp"
          value={otp.value}
          error={otp.error}
          inputType={InputTypes.OTP}
          onChange={(value, error) => setOtp({ value, error })}
        />
        {!newUser ? (
          <Button
            onClick={onSubmitOtp}
            isDisabled={phone.error.length > 0 || otp.error.length > 0}
            isLoading={isButtonLoading}
          >
            Submit
          </Button>
        ) : (
          <></>
        )}
      </>
    ) : (
      <></>
    );
  };

  const renderNewUserFlow = () => {
    /* The below UI will be enabled for Sign Up flow */
    return newUser ? (
      <>
        <TextInput
          label="Enter your name"
          name="userName"
          value={name.value}
          error={name.error}
          onChange={(value, error) => setName({ value, error })}
        />
        <Button
          onClick={signUpUser}
          isDisabled={
            phone.error.length > 0 ||
            otp.error.length > 0 ||
            name.error.length > 0
          }
          isLoading={isButtonLoading}
        >
          Submit
        </Button>
      </>
    ) : (
      <></>
    );
  };

  return (
    <LoginWrapper>
      <LoginContent>
        {renderBasicFlow()}
        {renderOTPFlow()}
        {renderNewUserFlow()}
      </LoginContent>
    </LoginWrapper>
  );
};

export default Login;
