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
  const [listMembers, setListMembers] = useState([]);
  const [userToShare, setUserToShare] = useState([]);

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

  const addMemberInList = (listId,userId,userEmail) => {
    database()
      .ref('/lists/'+listId+'/members/'+userId)
      .set({
        userId,
        email : userEmail,
        joinDate : Date.now()
      });
  }

  const getMembersInList = (listId) => {
    database()
      .ref('/lists/'+listId+'/members/')
      .on('value', snapshot => {
        setListMembers([]);
        let data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((member) => {
              setListMembers(oldArray => [...oldArray, member])
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
        listMembers,
        setUserToShare,
        userToShare,
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
        addList : (name,userId,shopId,userEmail) => {
          const uuid = uid()
          database()
          .ref('/lists/'+uuid)
          .set({
            uuid,
            name,
            owner : userId,
            creationDate : Date.now(),
            updateDate : Date.now(),
            shopId,
            itemsList : {
              '-1' : {
                inCart : false,
                quantity : -1,
                itemId : '-1'
              }
            }
          });
          addMemberInList (uuid,userId,userEmail)
        },
        addListMember : (listId,userId,userEmail) => {
          addMemberInList(listId,userId,userEmail)
        },
        getListMembers : (listId) => {
          getMembersInList(listId)
        },
        getLists : (userId) => {
          database()
          .ref('/lists/')
          .on('value', snapshot => {
            setListsList([]);
            let data = snapshot.val();
            if (data !== null) {
              Object.values(data).map((list) => {
                if (list.members !== null && list.members !== undefined) {
                  Object.values(list.members).map((member) => {
                    if (member.userId === userId) {
                      setListsList(oldArray => [...oldArray, list])
                    }
                  })
                }
              })
            }
          });
        },
        updateListName : async (name,listId) => {
          await database()
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
        },
        getItemsList : (itemsList) => {
          database()
          .ref("/items/")
          .on('value', snapshot => {
            setItemList([]);
            let data = snapshot.val();
            if (data !== null) {
              Object.values(data).map((list) => {
                if (Object.keys(itemsList).includes(list.uuid)){
                  setItemList(oldArray => [...oldArray, Object.assign(list,itemsList[list.uuid])])
                } 
              })
            }
          });
        },
        updateInCart : async (value,listId,itemId) => {
          await database()
          .ref('/lists/'+listId+"/itemsList/"+itemId)
          .update({
            inCart : value
          })
        },
        addItemToList : (listId,itemId,quantity) => {
          database()
            .ref('/lists/'+listId+'/itemsList/'+itemId)
            .set({
                inCart : false,
                quantity,
                itemId
            });
        },
        deleteItemInList : async (listId,itemId) => {
          await database().ref('/lists/'+listId+'/itemsList/'+itemId).remove();
        },
        getUserByEmail : (email) => {
          getElement('/users/',email,'email',setUserToShare);
        }
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};