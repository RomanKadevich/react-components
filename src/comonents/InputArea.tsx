import { MutableRefObject } from "react";
import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import style from "./InputArea.module.scss";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

export type Register = UseFormRegister<FieldValues>;

interface IInputArea {
  labelName: string;
  type?: string;
  register?: Register;
  registerData?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
}

const InputArea = ({
  labelName,
  type,
  register,
  registerData,
  name,
  placeholder,
  value,
  inputRef,
}: IInputArea) => {
  const [PasswordType, setPasswordType] = useState("password");
  const togglePasswordType = () => {
    setPasswordType("text");
    if (PasswordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <label className={style.inputArea}>
      {labelName}
      {register && registerData && (
        <input
          {...register(registerData)}
          type={type === "password" ? PasswordType : type}
          placeholder={placeholder}
          value={value}
          // ref={inputRef}
        />
      )}
      {name && inputRef && !register && (
        <input
          name={name}
          type={type === "password" ? PasswordType : type}
          placeholder={placeholder}
          value={value}
          ref={inputRef}
        />
      )}
      {type === "password" &&
        (PasswordType === "password" ? (
          <BiHide
            className={style.inputArea__icon}
            onClick={togglePasswordType}
          ></BiHide>
        ) : (
          <BiShow
            className={style.inputArea__icon}
            onClick={togglePasswordType}
          ></BiShow>
        ))}
    </label>
  );
};

export default InputArea;
