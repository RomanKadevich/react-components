import { useAppSelector } from "../store/hooks";
import { IData } from "../types/constants";

const MainPage = () => {
  const valueOfUncontrolForm: IData[] = useAppSelector(
    (state) => state.unControlFormData.value,
  );
  const valueOfControlForm: IData[] = useAppSelector(
    (state) => state.ControlFormData.value,
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      <div>
        <h2>Control form data</h2>
        {valueOfControlForm.map((item, index, array) => (
          <ul
            className={array.length - 1 === index ? "higlight" : ""}
            key={index + Date.now()}
          >
            <li>Name: {item.Name}</li>
            <li>Age: {item.Age}</li>
            <li>Email: {item.Email}</li>
            <li>Password: {item.Password}</li>
            <li>Radio: {item.Gender}</li>
            <li>Accept T&C: {item.checkbox.toString()}</li>
          </ul>
        ))}
      </div>
      <div>
        <h2>Uncontrol form data</h2>
        {valueOfUncontrolForm.map((item, index, array) => (
          <ul
            className={array.length - 1 === index ? "higlight2" : ""}
            key={index + Date.now()}
          >
            <li>Name: {item.Name}</li>
            <li>Age: {item.Age}</li>
            <li>Email: {item.Email}</li>
            <li>Password: {item.Password}</li>
            <li>Radio: {item.Gender}</li>
            <li>Accept T&C: {item.checkbox.toString()}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
