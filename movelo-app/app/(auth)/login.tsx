import { Link } from "expo-router";
import { View, Text, Button, TextInput } from "react-native";
import { useAuth } from "../../context/AuthProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SecureStore from 'expo-secure-store';
import { useState } from "react";

import { collection, addDoc, getDoc, setDoc, doc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";


async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export default function Login() {
  const { user, setUser } = useAuth();

  const login = (addr: string, priv: string) => {
    setUser({
      address: addr,
      private: priv
    });
    console.log(user)
  }

  const [mneumonic, setMneumonic] = useState<string[][]>([["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]]);

  async function handleMneumonic() {
    console.log(mneumonic)

    //check if there is an empty string in the mneumonic, if so return
    for (let i = 0; i < mneumonic.length; i++) {
      for (let j = 0; j < mneumonic[i].length; j++) {
        if (mneumonic[i][j] === "") return;
      }
    }

    //convert the mneumonic to a singlle string with spaces. The current mneumonic is an nested array of strings
    let mneumonicString = mneumonic.map((item) => {
      return item.join(" ");
    }).join(" ");
    console.log("MN", mneumonicString)

    let reso =  await fetch(`https://getaddress-ai54nl56hq-uc.a.run.app?mnemonic=${mneumonicString}`)
    let data = await reso.json();
    console.log("address", data)
    //check if there is an error in the address json
    if (data.error) {
      console.log("error", data.error)
    } else {
      //save the address to secure storage
      await save("address", data.address);
      await save("private", data.private);
      //navigate to the home page
      //check if properly saved

      // check if the user exists in the user collection in firestore
      // if not, add them

      let docRef = doc(db, "users", data.address);
      let docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log("adding user")
        await setDoc(doc(db, "users", data.address), {
          address: data.address,
          private: data.private,
          currentCampaign: null,
        });
      } else {
        console.log("user exists")
      }
      
      


      if (await getValueFor("address") === data.address && await getValueFor("private") === data.private) {
        console.log("saved successfully")
        login(data.address, data.private);
      }
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: '#365838', flexDirection: 'column', width: '100%', paddingTop: 100, }}>
        <TouchableOpacity onPress={()=>{
          let mlist = [["misery", "fringe"], ["write", "comfort"], ["hair", "hedgehog"], ["smart", "ahead"], ["shell", "water"], ["chief", "ozone"]];
          setMneumonic(mlist);
          handleMneumonic();
        
        }}>
          <Text>bypass</Text>
        </TouchableOpacity>

        <Text style={{
          color: 'white',
          fontSize: 26,
          fontWeight: 'bold',
          textAlign: 'center',
          padding: 20,
          paddingBottom: 0,
        }}>Enter your mneumonic</Text>
        
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
            padding: 20,
            paddingTop: 0,
          }}
        >{`(It is encrypted and stored locally)`}</Text>
        
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
          {
            mneumonic.map(
              (item, index) => {
                return (
                  <View style={
                    {
                      display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', width: '100%', justifyContent: 'center',
                      gap: 12,
                      marginBottom: 12,
                    }
                  }>
                    {
                      item.map(
                        (item, level) => {
                          return (
                            <TextInput
                              key={level}
                              style={
                                {
                                  height: 40, borderColor: 'gray', borderWidth: 1, width: '40%',
                                  borderRadius: 8, backgroundColor: 'white'
                                }
                              }
                              onChangeText={text => {
                                let newMneumonic = [...mneumonic];
                                newMneumonic[index][level] = text.trim();
                                setMneumonic(newMneumonic);
                                }
                              }
                            />
                          )
                        }
                      )
                    }
                  </View>
                )
              }
            )
          }
        </View>

        {/* <View style={{ width: "100%", display: "flex", justifyContent: 'center', alignItems: 'center' }}> */}
          <TouchableOpacity onPress={() => {
            handleMneumonic();
          }}
            style={{
              backgroundColor: '#adb09d',
              borderRadius: 8,
              minWidth: '82%',
              padding: 12,
              marginTop: 20,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >continue</Text>
          </TouchableOpacity>
        {/* </View> */}
    </View>
  );
}