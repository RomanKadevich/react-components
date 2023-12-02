import { useEffect, useState } from "react";
import { IData } from "../comonents/Form";
import { useAppSelector } from "../store";

const MainPage = () => {
  const valueOfUncontrolForm: IData = useAppSelector(
    (state) => state.unControlFormData.value,
  );
  const valueOfControlForm: IData = useAppSelector(
    (state) => state.ControlFormData.value,
  );
  const [controlFormList, setControlFormList] = useState<IData[] | []>([]);
  const [uncontrolFormList, setUncontrolFormList] = useState<IData[] | []>([]);

  useEffect(() => {
    setControlFormList((prev) => [...prev, valueOfControlForm]);
  }, [valueOfControlForm]);

  useEffect(() => {
    setUncontrolFormList((prev) => [...prev, valueOfUncontrolForm]);
  }, [valueOfUncontrolForm]);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      <div>
        <h2>Control form data</h2>
        {controlFormList.map((item, index, array) => (
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
        {uncontrolFormList.map((item, index, array) => (
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
    </div>
  );
};

export default MainPage;
