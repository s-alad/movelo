import {useEffect, useMemo, useState} from "react";
import {Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, View} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Connex } from "@vechain/connex";

export default function Campaign() {
    async function getValueFor(key: string) {
        let result = await SecureStore.getItemAsync(key);
        return result;
      }

    const contractAddress = "0x8161ffc13309613f9De0a3bc56e2586c92a4D6dE";
    /* const contract = connex.thor.account(contractAddress).method(abi); */
    const connex = new Connex({
        node: 'https://node-testnet.vechaindev.energy',
        network: 'test'
    })
    let abi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "badgeId",
              "type": "uint256"
            }
          ],
          "name": "BadgeEarned",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "activator",
              "type": "address"
            }
          ],
          "name": "EmergencyStopActivated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "activator",
              "type": "address"
            }
          ],
          "name": "EmergencyStopDeactivated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "sponsorshipId",
              "type": "uint256"
            }
          ],
          "name": "Payout",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "sponsorshipId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "sponsor",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "budget",
              "type": "uint256"
            }
          ],
          "name": "SponsorshipCreated",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "imageURI",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "sponsor",
              "type": "address"
            }
          ],
          "name": "awardBadge",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "campaignId",
              "type": "uint256"
            }
          ],
          "name": "campaignRunning",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "campaigns",
          "outputs": [
            {
              "internalType": "address",
              "name": "sponsor",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imageURL",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "budget",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ratePerMile",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalMiles",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalTrips",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imgeURL",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "duration",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ratePerMile",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "allowedAddresses",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "locationLatitudes",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "locationLongitudes",
              "type": "uint256[]"
            }
          ],
          "name": "createSponsorship",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "milesTraveled",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "nftContract",
          "outputs": [
            {
              "internalType": "contract BadgeCreator",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "miles",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "sponsorshipId",
              "type": "uint256"
            }
          ],
          "name": "payout",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "userBadges",
          "outputs": [
            {
              "internalType": "string",
              "name": "imageURI",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "dateEarned",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sponsor",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "userCampaigns",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "campaignId",
              "type": "uint256"
            }
          ],
          "name": "withdrawUnspentFunds",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    console.log(abi)
    let [localAddr, setLocalAddr] = useState<string | null>(null);
    useEffect(() => {
        const fetchUserAddress = async () => {
            const ua = await getValueFor("address");
            setLocalAddr(ua);
            return ua;
        };
        let addr = fetchUserAddress();
    }, []);

/*     useEffect(() => {
        if (!localAddr) return;

        const contract = connex.thor.account(localAddr).method(abi);
        console.log("START>>>>>>>>>>>>")
        console.log(contract)

        contract.call('getAllCampaigns', 0)
            .then(response => {
                console.log('Campaign data:', response.decoded);
            })
            .catch(error => {
                console.error('Error calling campaigns getter:', error);
            });
    }, [localAddr]); */


    // Campaign input fields
    const [company, setCompany] = useState('Harvard');
    const [description, setDescription] = useState('Learn something probably');
    const [latitude, setLatitude] = useState('42.374368');
    const [longitude, setLongitude] = useState('-71.116684');
    const [rate, setRate] = useState('0.1');
    const [image, setImage] = useState('https://1000logos.net/wp-content/uploads/2017/02/Harvard-symbol.jpg');

    function createCampaign() {

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.inputContainer}>
                <Text>Company</Text>
                <Text>{connex.thor.genesis.id}</Text>
                <TextInput
                    style={styles.input}
                    value={company}
                    onChangeText={setCompany}
                    placeholder="Company"
                />
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Description"
                />
                <TextInput
                    style={styles.input}
                    value={latitude}
                    onChangeText={setLatitude}
                    placeholder="Latitude"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    value={longitude}
                    onChangeText={setLongitude}
                    placeholder="Longitude"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    value={rate}
                    onChangeText={setRate}
                    placeholder="Rate"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    value={image}
                    onChangeText={setImage}
                    placeholder="Image"
                />
                <TouchableOpacity style={styles.button} onPress={async () => {
                    createCampaign()
                }}>
                    <Text style={styles.buttonText}>Create Campaign</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    button: {
        backgroundColor: '#3498db', // Change this to your primary color
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    testButton: {
        backgroundColor: '#e74c3c', // Change this to your secondary or warning color
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
});