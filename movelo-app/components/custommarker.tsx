import {Image, Text, View} from 'react-native';

export const markers = [
    {
        "title": "Trader Joes",
        "description": "Buy food n' stuff",
        "latlng": {
            "latitude": 42.363245,
            "longitude": -71.129785
        },
        "icon": "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/trader_joes.png"
    },
    {
        "title": "BU FitRec",
        "description": "Go to the gym",
        "latlng": {
            "latitude": 42.351117,
            "longitude": -71.114117
        },
        "icon": "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/bu.png"
    }
]

// @ts-ignore
export default function CustomMarker({image, width = 50, height = 50}) {
    const overlay = ''
    return (
        <Text>s</Text>
    )
    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image source={{
                uri: image,
            }} style={{
                width: 50,
                height: 50
            }}/> {/* You can replace the path-to-base-icon with your default base icon path */}
            <Image source={{
                uri: "https://raw.githubusercontent.com/s-alad/movelo/main/movelo-app/dummy_data/overlay.png",
            }} style={{position: 'absolute', width: 25, height: 25}}/>
        </View>
    );
}
