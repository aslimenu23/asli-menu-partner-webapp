import React, { useRef, useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import { InputTypes } from "../../components/TextInput/TextInput.types";
import Button from "../../components/Button/Button";
import { LoginWrapper, LoginContent } from "./Login.styles";
import { useNavigate } from "react-router-dom";
import firebase, {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "../../services/firebase";

const Login = () => {
  const auth = getAuth(firebase);
  const navigate = useNavigate();

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

  const signIn = (recaptchaVerifier: any) => {
    signInWithPhoneNumber(auth, `+91${phone.value}`, recaptchaVerifier)
      .then((confirmationResult) => {
        confirmationResultRef.current = confirmationResult;
        setEnableOTP(true);
      })
      .catch((error) => {
        alert("Pls refresh the page and try again");
      });
  };

  const sendOTP = () => {
    // Setup recaptcha to be triggered from the signInWithPhoneNumber call internally
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      getOtpButtonRef.current,
      {
        size: "invisible",
        callback: () => {
          signIn(recaptchaVerifier);
        },
      }
    );
    signIn(recaptchaVerifier);
  };

  const onSubmitOtp = () => {
    confirmationResultRef.current
      .confirm(otp.value)
      .then((result: any) => {
        if (result._tokenResponse.isNewUser) {
          setNewUser(true);
        } else {
          navigate("/restaurants", {
            replace: true,
          });
        }
      })
      .catch(() => {
        alert("Invalid OTP. Try again");
      });
  };

  const signUpUser = () => {
    // BE API to add user and navigate to next page
    navigate("/restaurants", {
      replace: true,
    });
  };

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
