import { IData } from "../comonents/Form";
import { useAppSelector } from "../store";




const MainPage = () => {
  const value:IData = useAppSelector((state) => state.unControlFormData.value);
  return <div> 
  <div>
    <h2>Uncontrol form data</h2>
    <ul>
      <li>
        Name: {value.Name}
      </li>
      <li>
        Age: {value.Age}
      </li>
      <li>
        Email: {value.Email}
      </li>
      <li>
        Password: {value.Password}
      </li>
      <li>
        Radio: {value.Gender}
      </li>
      <li>
      Accept T&C: {value.checkbox.toString()}
      </li>
    </ul>
  </div></div>;
};

export default MainPage;
