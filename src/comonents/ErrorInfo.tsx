import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from "react-hook-form";
import styles from "./Error.module.scss";

interface IErrorInfo<TFieldValues extends FieldValues = FieldValues> {
  errors?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<TFieldValues>>
    | undefined;
  errorMessage?: string;
}

const ErrorInfo = ({ errors, errorMessage }: IErrorInfo) => {
  return (
    <div className={styles.form__error}>
      {errors && <p>{errors.message?.toString() || "Error"}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ErrorInfo;
