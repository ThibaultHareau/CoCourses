import React, { createContext, useState } from 'react';
import database , {firebase} from '@react-native-firebase/database';

export const DatabaseContext = createContext({});

import { uid } from 'uid';

export const DatabaseProvider = ({ children }) => {
    
  const [deletion, setDeletion] = useState(false); // Si une suppression est en cours
  const [departmentData, setDepartmentData] = useState(null); // Infos sur l'utilisateur actif
  const [departmentList, setDepartmentList] = useState([]); // La liste des rayons d'un magasin
  const [item, setItem] = useState(null); // Infos sur le produit actuel (page détail produit)
  const [itemList, setItemList] = useState([]); // La liste des produits d'une liste
  const [listDetails, setListDetails] = useState([]); // Regroupe toutes les infos d'une liste 
  const [listMembers, setListMembers] = useState([]); // Regroupe tous les membres de la liste active
  const [listsList, setListsList] = useState([]); // La liste des listes de courses auquel un utilisateur peut accéder
  const [shop, setShop] = useState(null); // Infos sur le magasin actif
  const [shopsList, setShopsList] = useState([]); // La liste des magasins existants (plus tard les 10 'meilleurs')
  const [userData, setUser] = useState(null); // Infos sur l'utilisateur actif
  const [userToShare, setUserToShare] = useState([]); // Contient les donnés de l'utilisateur avec qui on souhaite partager une liste

  //Méthode générale pour récupérer un élément dans la BDD
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

  // Méthode pour ajouter un utilisateur à une liste
  const addMemberInList = (listId,userId,userEmail) => {
    database()
      .ref('/lists/'+listId+'/members/'+userId)
      .set({
        userId,
        email : userEmail,
        joinDate : Date.now()
      });
  }

  // Méthode pour avoir les utilisateur ayant accès à une liste
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
        deletion,
        departmentList,
        itemList,
        item,
        listDetails,
        listsList,
        listMembers,
        setDeletion,
        setShop,
        setUserToShare,
        shop,
        shopsList,
        userData,
        userToShare,
        /*
          adders
        */
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
        addItemToList : (listId,itemId,quantity) => {
          database()
            .ref('/lists/'+listId+'/itemsList/'+itemId)
            .set({
                inCart : false,
                quantity,
                itemId
            });
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
        /*
          deleters
        */
        deleteItem : async (itemId) => {
          await database().ref('/items/'+itemId).remove();
        },
        deleteItemInList : async (listId,itemId) => {
          await database().ref('/lists/'+listId+'/itemsList/'+itemId).remove();
          await setDeletion(true);
        },
        deleteList : async (listId) => {
          await database().ref('/lists/'+listId).remove();
        },
        /*
        getters
        */
        getDepartment : (deptId) => {
          setDepartmentData(null)
          database()
          .ref('/departments/'+deptId)
          .on('value', snapshot => {
            let data = snapshot.val();
            if (data !== null) {
              setDepartmentData(data)
            }
          });
        },
        getDepartments : (shopId) => {
          getElement('/department/',shopId,"shopId",setDepartmentList)
        },
        getItem : (itemId) => {
          getElement('/items/',itemId,'uuid',setItem)
        },
        getItems : (deptUid) => {
          getElement('/items/',deptUid,"deptUid",setItemList)
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
        getListDetails : (listId) => {
          getElement('/lists/',listId,'uuid',setListDetails)
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
        getShop : (shopId) => {
          setShop(null)
          database()
            .ref('/shop/'+shopId)
            .on('value', snapshot => {
              let data = snapshot.val();
              if (data !== null) {
                setShop(data)
              }
            });
        },
        getShopsList : () => {
          database()
          .ref('/shop/')
          .on('value', snapshot => {
            setShopsList([])
            let data = snapshot.val();
            if (data !== null) {
              Object.values(data).map((shop) => {
                setShopsList(oldArray => [...oldArray,shop])
              })
            }
          });
        },
        getUser : (userId) => {
          database()
          .ref('/users/'+userId)
          .on('value', snapshot => {
            setUser(null)
            let data = snapshot.val();
            if (data !== null) {
              setUser(data)
            }
          });
        },
        getUserByEmail : (email) => {
          getElement('/users/',email,'email',setUserToShare);
        },
        /*
          updaters
        */
        updateInCart : async (value,listId,itemId) => {
          await database()
          .ref('/lists/'+listId+"/itemsList/"+itemId)
          .update({
            inCart : value
          })
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
        updateListName : async (name,listId) => {
          await database()
          .ref('/lists/'+listId)
          .update({
            name: name,
            updateDate : Date.now()
          })
        }
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};