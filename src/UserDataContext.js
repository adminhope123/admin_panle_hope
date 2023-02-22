import { createContext, useEffect, useState } from "react";

export const UserDataContext = createContext();
export const UserDataProvider = (props) => {
  const [userGetData, setUserGetData] = useState();

  const userGetDataFunction = () => {
    const getData = JSON.parse(sessionStorage.getItem("userData"));
    if(getData){
      const getUserData = Object.assign({}, ...getData);
      setUserGetData(getUserData);
    }
  };
  useEffect(() => {
    userGetDataFunction();
  }, [])
  
    const properties = {
        userGetData,
      };
      return (
        <UserDataContext.Provider value={properties}>
          {props.children}
        </UserDataContext.Provider>
      );
}