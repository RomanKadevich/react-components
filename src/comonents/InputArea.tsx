import { FieldValues, UseFormRegister } from "react-hook-form";

export type Register = UseFormRegister<FieldValues>;

interface IInputArea {
  labelName: string;
  type?: string;
  register?: Register;
  registerData: 'required' extends keyof this['register'] ? string : never;
  name:string;
  placeholder?:string;
}

const InputArea = ({ labelName, type, register, registerData, name, placeholder }: IInputArea) => {
  return (
    <label>
      {labelName}
     {register&& <input {...register(registerData)} type ={type}placeholder={placeholder}/>}
     {register&& <input name={name} type ={type}placeholder={placeholder}/>}
    </label>
  );
};

export default InputArea;
