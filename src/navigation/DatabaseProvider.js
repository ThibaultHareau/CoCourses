import React, { createContext, useState } from 'react';
import database , {firebase} from '@react-native-firebase/database';

export const DatabaseContext = createContext({});

import { uid } from 'uid';

export const DatabaseProvider = ({ children }) => {
    
  const [userData, setUser] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [listsList, setListsList] = useState([]);
  const [listDetails, setListDetails] = useState([]);
  const [item, setItem] = useState(null);

  const getElement = (path,elementId,elementName,setState) => {
    database()
      .ref(path)
      .on('value', snapshot => {
        setState([]);
        let data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((list) => {
            if (elementId === list[elementName]){
              setState(oldArray => [...oldArray, list])
            } 
          })
        }
      });
  }
  
  return (
    <DatabaseContext.Provider
      value={{
        userData,
        itemList,
        departmentList,
        listsList,
        listDetails,
        item,
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
              price : price,
              deptUid
            });
        },
        getItems : (deptUid) => {
          getElement('/items/',deptUid,"deptUid",setItemList)
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
          getElement('/department/',shopId,"shopId",setDepartmentList)
        },
        addList : (name,userId,shopId) => {
          const uuid = uid()
          database()
          .ref('/lists/'+uuid)
          .set({
            uuid,
            name,
            owner : userId,
            creationDate : Date.now(),
            updateDate : Date.now(),
            shopId
          });
        },
        getLists : (userId) => {
          getElement('/lists/',userId,"owner",setListsList)
        },
        updateListName : (name,listId) => {
          database()
          .ref('/lists/'+listId)
          .update({
            name: name,
            updateDate : Date.now()
          })
        },
        deleteList : async (listId) => {
          await database().ref('/lists/'+listId).remove();
        },
        getListDetails : (listId) => {
          getElement('/lists/',listId,'uuid',setListDetails)
        },
        getItem : (itemId) => {
          getElement('/items/',itemId,'uuid',setItem)
        },
        deleteItem : async (itemId) => {
          await database().ref('/items/'+itemId).remove();
        },
        updateItem : (productId,name,text) => {
          database()
          .ref('/items/'+productId)
          .update({
            name : name,
            text: text,
            updateDate : Date.now()
        })
        }
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};