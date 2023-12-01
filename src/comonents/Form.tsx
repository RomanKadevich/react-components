import styles from "./Form.module.scss";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, ref, boolean } from "yup";
import ErrorInfo from "./ErrorInfo";
import InputArea, { Register } from "./InputArea";

interface IData {
  Name: string;
  Age: number;
  Email: string;
  Password:string;
  radio:string;
  acceptTC:boolean;
}

const schema = object({
  Name: string().required("User name required").test('The first letter should be uppercase','The first letter should be uppercase',
    (value) => /^[A-ZА-ЯЁ]/.test(value)),
  Age: number().required("Age name required").moreThan(1, "number should be more than 1"),
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
    radio: string().required('Choose one of genders'),
    acceptTC:boolean().oneOf([true],'Message').required()
});
const Form = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IData) => {
    console.log(data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputArea
        register={register as unknown as Register}
        registerData={"Name"}
        labelName="Name"
        placeholder={"Name"}
      />
      <ErrorInfo errors={errors.Name} />
      <InputArea
        register={register as unknown as Register}
        registerData={"Age"}
        labelName="Age"
        placeholder={"Age"}
      />
      <ErrorInfo errors={errors.Age} />
      <InputArea
        register={register as unknown as Register}
        registerData={"Email"}
        labelName="Email"
        placeholder={"Email"}
      />
      <ErrorInfo errors={errors.Email} />
      <InputArea
        type="password"
        register={register as unknown as Register}
        registerData={"Password"}
        labelName="Password"
        placeholder={"Password"}
      />
      <ErrorInfo errors={errors.Password} />
      <InputArea
        type="password"
        register={register as unknown as Register}
        registerData={"AnotherPassword"}
        labelName="Enter the password a second time"
        placeholder={"Password"}
      />
      <ErrorInfo errors={errors.AnotherPassword} />
      <ErrorInfo errors={errors.Password} />
      <label >
      Choose one of genders:<div className={styles.radio}>
      <input {...register("radio")} type="radio" value="A" />
      <input {...register("radio")} type="radio" value="B" />
      <ErrorInfo errors={errors.AnotherPassword} /></div>
      </label>
      <label className={styles.checkbox}>
      <span >Accept T&C:</span>
      <input {...register("acceptTC")} type="checkbox" value="" />
           <ErrorInfo errors={errors.AnotherPassword} />
      </label>
      <input type="submit" value={"Submit"} disabled={!isValid} />
    </form>
  );
};

export default Form;
