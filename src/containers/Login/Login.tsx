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

const Login = () => {
  const auth = getAuth(firebase);
  const navigate = useNavigate();
  const location = useLocation();

  const setLoggedInUser = useUserActions().setLoggedInUser;

  const [userAuthObject, setUserAuthObject] = useState<any>(null);
  const [readyToRedirect, setReadyToRedirect] = useState(false);

  const [phone, setPhone] = useState({
    value: "",
    isValid: false,
  });
  const [name, setName] = useState({
    value: "",
    isValid: false,
  });
  const [newUser, setNewUser] = useState(false);
  const [enableOTP, setEnableOTP] = useState(false);
  const [otp, setOtp] = useState({
    value: "",
    isValid: false,
  });

  const confirmationResultRef = useRef<any>();
  const getOtpButtonRef = useRef<any>();

  const signIn = async (recaptchaVerifier: any) => {
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${phone.value}`,
        recaptchaVerifier
      );
      confirmationResultRef.current = confirmationResult;
      setEnableOTP(true);
    } catch (error) {
      alert("Pls refresh the page and try again");
    }
  };

  const sendOTP = async () => {
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
  };

  const redirectUser = useCallback(() => {
    setTimeout(() => {
      navigate("/restaurants", {
        replace: true,
      });
    });
  }, [navigate]);

  const onSubmitOtp = async () => {
    try {
      const result = await confirmationResultRef.current.confirm(otp.value);

      setUserAuthObject({
        ...result.user.reloadUserInfo,
        uid: result.user.uid,
      });

      const userResponse = await verifyUser({
        phoneNumber: result.user.phoneNumber,
      });
      if (userResponse?.isNewUser) {
        setNewUser(true);
      } else {
        setLoggedInUser(userResponse);
        setReadyToRedirect(true);
      }
    } catch (error) {
      alert("Try again");
    }
  };

  const signUpUser = async () => {
    // BE API to add user and navigate to next page
    const response = await createUser({
      name: name.value,
      ...userAuthObject,
    });
    setLoggedInUser(response);
    setReadyToRedirect(true);
  };

  useEffect(() => {
    if (readyToRedirect) redirectUser();
  }, [readyToRedirect, redirectUser]);

  return (
    <LoginWrapper>
      <LoginContent>
        <TextInput
          label="Phone number"
          name="phone"
          defaultValue={phone.value}
          inputType={InputTypes.MOBILE}
          onChange={(value, isValid) => setPhone({ value, isValid: !!isValid })}
        />
        <Button
          ref={getOtpButtonRef}
          isDisabled={!phone.isValid}
          onClick={sendOTP}
        >
          Send OTP
        </Button>
        {/* Below UI is enabled when the OTP is sent */}
        {enableOTP && (
          <>
            <TextInput
              label="Enter OTP"
              name="otp"
              defaultValue={otp.value}
              inputType={InputTypes.OTP}
              onChange={(value, isValid) =>
                setOtp({ value, isValid: !!isValid })
              }
            />
            <Button
              onClick={onSubmitOtp}
              isDisabled={!(phone.isValid && otp.isValid)}
            >
              Submit
            </Button>
          </>
        )}
        {/* The below UI will be enabled for Sign Up flow */}
        {newUser && (
          <>
            <TextInput
              label="Enter your name"
              name="userName"
              defaultValue={name.value}
              onChange={(value, isValid) =>
                setName({ value, isValid: !!isValid })
              }
            />
            <Button
              onClick={signUpUser}
              isDisabled={!(phone.isValid && otp.isValid && name.isValid)}
            >
              Submit
            </Button>
          </>
        )}
      </LoginContent>
    </LoginWrapper>
  );
};

export default Login;
