import styles from "../styles/Form.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorInfo from "./ErrorInfo";
import InputArea, { Register } from "./InputArea";
import { updateValueOfCont } from "../store/slices/controlFormSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { schema } from "../services/validation";
import { IData } from "../types/constants";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
    dispatch(updateValueOfCont(data));
    reset();
    navigate("/");
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
      <label>
        Choose one of genders:
        <div className={styles.radio}>
          <input {...register("Gender")} type="radio" value="male" />
          Male
          <input {...register("Gender")} type="radio" value="female" />
          Female
          <ErrorInfo errors={errors.Gender} />
        </div>
      </label>
      <label className={styles.checkbox}>
        <span>Accept T&C:</span>
        <input {...register("checkbox")} type="checkbox" />
        <ErrorInfo errors={errors.checkbox} />
      </label>
      <input type="submit" value={"Submit"} disabled={!isValid} />
    </form>
  );
};

export default Form;
