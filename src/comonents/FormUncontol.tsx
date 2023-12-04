import styles from "../styles/Form.module.scss";
import { ValidationError } from "yup";
import ErrorInfo from "./ErrorInfo";
import InputArea from "./InputArea";
import { FormEvent, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { schema } from "../services/validation";
import { updateValueOfUncontr } from "../store/slices/unControlFormSlice";

const FormNonContol = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [anotherPasswordError, setAnotherPasswordError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [radioError, setRadioError] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const anotherPasswordRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const nameValue = nameRef.current!.value;
    const ageValue = ageRef.current!.value;
    const emailValue = emailRef.current!.value;
    const passwordValue = passwordRef.current!.value;
    const anotherPasswordValue = anotherPasswordRef.current!.value;
    const checkboxValue = checkboxRef.current!.checked;
    const maleValue = maleRef.current!.value;
    const femaleValue = femaleRef.current!.value;

    const resetError = () => {
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setAgeError("");
      setAnotherPasswordError("");
      setCheckboxError("");
      setRadioError("");
    };

    try {
      const selectedGender = maleRef.current!.checked
        ? maleValue
        : femaleRef.current!.checked
          ? femaleValue
          : "";
      const values = await schema.validate(
        {
          Name: nameValue,
          Age: ageValue,
          Email: emailValue,
          Password: passwordValue,
          AnotherPassword: anotherPasswordValue,
          Gender: selectedGender,
          checkbox: checkboxValue,
        },
        { abortEarly: false },
      );

      dispatch(updateValueOfUncontr(values));
      resetError();
      navigate("/");
    } catch (errors) {
      resetError();

      if (errors instanceof ValidationError && errors.inner) {
        errors.inner.forEach((error: ValidationError) => {
          switch (error.path) {
            case "Name":
              setNameError(error.message);
              console.log(error.message);
              break;
            case "Age":
              setAgeError(error.message);
              break;
            case "Email":
              setEmailError(error.message);
              break;
            case "Password":
              setPasswordError(error.message);
              break;
            case "AnotherPassword":
              setAnotherPasswordError(error.message);
              break;
            case "checkbox":
              setCheckboxError(error.message);
              break;
            case "Gender":
              setRadioError(error.message);
              break;
            default:
              break;
          }
        });
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <InputArea
        name={"Name"}
        labelName="Name"
        placeholder={"Name"}
        inputRef={nameRef}
      />
      <ErrorInfo errorMessage={nameError} />
      <InputArea
        name={"Age"}
        labelName="Age"
        placeholder={"Age"}
        inputRef={ageRef}
      />
      <ErrorInfo errorMessage={ageError} />
      <InputArea
        name={"Email"}
        labelName="Email"
        placeholder={"Email"}
        inputRef={emailRef}
      />
      <ErrorInfo errorMessage={emailError} />
      <InputArea
        type="password"
        name={"Password"}
        labelName="Password"
        placeholder={"Password"}
        inputRef={passwordRef}
      />
      <ErrorInfo errorMessage={passwordError} />
      <InputArea
        type="password"
        name={"AnotherPassword"}
        labelName="Enter the password a second time"
        placeholder={"Password"}
        inputRef={anotherPasswordRef}
      />
      <ErrorInfo errorMessage={anotherPasswordError} />
      <label>
        Choose one of genders:
        <div className={styles.radio}>
          <input name="gender" type="radio" value="male" ref={maleRef} />
          Male
          <input name="gender" type="radio" value="female" ref={femaleRef} />
          Female
          <ErrorInfo errorMessage={radioError} />
        </div>
      </label>
      <label className={styles.checkbox}>
        <span>Accept T&C:</span>
        <input name="checkbox" type="checkbox" ref={checkboxRef} />
        <ErrorInfo errorMessage={checkboxError} />
      </label>
      <input type="submit" value={"Submit"} />
    </form>
  );
};

export default FormNonContol;
