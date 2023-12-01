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
  value?:string;
}

const InputArea = ({
  labelName,
  type,
  register,
  registerData,
  name,
  placeholder,
  value
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
        />
      )}
      {name && !register && (
        <input
          name={name}
          type={type === "password" ? PasswordType : type}
          placeholder={placeholder}
          value={value}
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
