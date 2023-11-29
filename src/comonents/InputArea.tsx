import {
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

export type Register = UseFormRegister<FieldValues>;

interface IInputArea {
  name: string;
  register: Register;
  registerData: string;
}

const InputArea = ({ name, register, registerData }: IInputArea) => {
  return (
    <label>
      {name}
      <input {...register(registerData)} />
    </label>
  );
};

export default InputArea;
