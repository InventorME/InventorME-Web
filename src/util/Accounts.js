import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "./UserPool";

const AccountContext = createContext();

const Account = props => {
    
  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser()
      if(user.getSignInUserSession()){
        console.log("USER FOUND");
      }
      else if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject()
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err)
                } else {
                  const results = {}

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute
                    results[Name] = Value
                  }

                  resolve(results)
                }
              })
            })

            const token = session.getIdToken().getJwtToken()

            resolve({
              user,
              headers: {
                'x-api-key': attributes['custom:apikey'],
                Authorization: token,
              },
              ...session,
              ...attributes,
            })
          }
        })
      } else {
        reject()
      }
    })

  const setSession = async () =>
    await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject();
          } 
          if (session) {
            console.log("Imma here3");
            user.setSignInUserSession(session);
            
          }
        });
      } else {
        reject();
      }
  })

  const authenticate = async (Username, Password) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: data => {
         console.log("onSuccess:", data);
        //   console.log("new stuff");
          resolve(data);
          setSession();
        },

        onFailure: err => {
          console.error("onFailure:", err);
          reject(err);
        },

        newPasswordRequired: data => {
          console.log("newPasswordRequired:", data);
          resolve(data);
        }
      });
    });

  const logout = () => {
  
    const user = Pool.getCurrentUser();
    if (user) {
      console.log("User Signed Out");
      user.signOut();
      
    }
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };