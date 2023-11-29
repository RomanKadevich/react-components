import styles from "./Form.module.scss";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number} from "yup";
import ErrorInfo from "./ErrorInfo";
import InputArea, { Register } from "./InputArea";

interface IData {
  Name: string;
  Age: number;
}

const schema = object({
  Name: string().required("User name required"),
  Age: number().required("Age name required"),
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
        name={"Name"}
        registerData={"Name"}
      />
      <ErrorInfo errors={errors.Name} />
      <InputArea
        register={register as unknown as Register}
        name={"Age"}
        registerData={"Age"}
      />
      <ErrorInfo errors={errors.Age} />
      <input type="submit" value={"Submit"} disabled={!isValid} />
    </form>
  );
};

export default Form;
