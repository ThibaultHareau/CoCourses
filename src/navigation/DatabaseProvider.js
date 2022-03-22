import React, { createContext, useState } from 'react';
import database , {firebase} from '@react-native-firebase/database';

export const DatabaseContext = createContext({});

import { uid } from 'uid';

export const DatabaseProvider = ({ children }) => {
    
  const [userData, setUser] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  
  return (

    <DatabaseContext.Provider
      value={{
        userData,
        itemList,
        departmentList,
        getUser : (useruid) => {
          database()
          .ref('/users/'+useruid)
          .on('value', snapshot => {
            setUser(null)
            let data = snapshot.val();
            if (data !== null) {
              setUser(data)
            }
          });
        },
        addItem : (name,price,deptUid) => {
          const uuid = uid()
          const uuid2 = uid()
          database()
            .ref('/items/'+uuid)
            .set({
              uuid,
              name,
              creationDate : Date.now(),
              updateDate : Date.now(),
              text : "Description",
              price : price
            });
          database()
            .ref('/department-items/'+uuid2)
            .set({
              uuid : uuid2,
              deptId : deptUid,
              itemId : uuid
            });
        },
        getItems : (deptUid) => {
          let targets = [];
          database()
          .ref('/department-items/')
          .on('value', snapshot => {
            let data = snapshot.val();
            if (data !== null) {
              Object.values(data).map((list) => {
                if (deptUid === list.deptId){
                  targets = [...targets, list.itemId]
                } 
              })
            }
          });
          database()
          .ref('/items/')
          .on('value', snapshot => {
            setItemList([]);
            let data = snapshot.val();
            if (data !== null) {
              Object.values(data).map((list) => {
                if (targets.includes(list.uuid)){
                  setItemList(oldArray => [...oldArray,list])
                } 
              })
            }
          });
        },
        addDepartment : (name, shopId) => {
          const uuid = uid()
          database()
            .ref('/department/'+uuid)
            .set({
              uuid,
              name,
              creationDate : Date.now(),
              updateDate : Date.now(),
              shopId : shopId
            });
        },
        getDepartments : (shopId) => {
          database()
          .ref('/department/')
          .on('value', snapshot => {
            setDepartmentList([]);
            let data = snapshot.val();
            if (data !== null) {
              Object.values(data).map((list) => {
                if (list["shopId"] === shopId){
                  setDepartmentList(oldArray => [...oldArray, list])
                } 
              })
            }
          });
        }
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};