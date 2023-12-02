import styles from "./Form.module.scss";


import {
  object,
  string,
  number,
  ref,
  boolean,
  setLocale,
  ValidationError,
} from "yup";
import ErrorInfo from "./ErrorInfo";
import InputArea  from "./InputArea";
import { useRef, useState } from "react";

// interface IData {
//   Name: string;
//   Age: number;
//   Email: string;
//   Password: string;
//   Gender: string;
//   checkbox: boolean;
// }
setLocale({
  mixed: {
    default: "Não é válido",
  },
});
const schema = object().shape({
  Name: string()
    .required("User name required")
    .test(
      "The first letter should be uppercase",
      "The first letter should be uppercase",
      (value) => /^[A-ZА-ЯЁ]/.test(value),
    ),
  Age: number()
    .required("Age name required")
    .moreThan(1, "number should be more than 1"),
  Email: string().email().required(),
  Password: string()
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
  AnotherPassword: string()
    .required("Confirm Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .oneOf([ref("Password")], "Passwords do not match"),
  Gender: string().required("Choose one of genders"),
  checkbox: boolean().oneOf([true], "Message").required(),
});
const FormNonContol = () => {
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [anotherPasswordError, setAnotherPasswordError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [radioError, setRadioError] = useState("");
  // const [isValid, setIsValid] = useState(false);
  // const {
  //   register,
  //   formState: { errors, isValid },
  //   handleSubmit,
  //   reset,
  // } = useForm({
  //   mode: "onChange",
  //   resolver: yupResolver(schema),
  // });
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const anotherPasswordRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);

  // const onSubmit = (data:IData) => {

  //   console.log(data);
  //   // reset();
  // };
  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const nameValue = nameRef.current!.value;
    const ageValue = ageRef.current!.value;
    const emailValue = emailRef.current!.value;
    const passwordValue = passwordRef.current!.value;
    const anotherPasswordValue = anotherPasswordRef.current!.value;
    const checkboxValue = checkboxRef.current!.checked;
    const maleValue = maleRef.current!.value;
    const femaleValue = femaleRef.current!.value;
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
      console.log(values);
      // setIsValid(true)
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setAgeError("");
      setAnotherPasswordError("");
      setCheckboxError("");
      setRadioError("");
    } catch (errors) {
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setAgeError("");
      setAnotherPasswordError("");
      setCheckboxError("");
      setRadioError("");
      // console.log(errors.inner)
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

    //   const data = {nameValue,ageValue,emailValue, passwordValue, anotherPasswordValue, checkboxValue, radioValue}
    // onSubmit(data)
    // console.log(nameError)
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
          <input name="gender" type="radio" value="female" ref={femaleRef} />
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
