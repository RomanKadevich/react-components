import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from "react-hook-form";
import styles from "./Error.module.scss";

interface IErrorInfo<TFieldValues extends FieldValues = FieldValues> {
  errors:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<TFieldValues>>
    | undefined;
}

const ErrorInfo = ({ errors }: IErrorInfo) => {
  return (
    <div className={styles.form__error}>
      {errors && <p>{errors.message?.toString() || "Error"}</p>}
    </div>
  );
};

export default ErrorInfo;
