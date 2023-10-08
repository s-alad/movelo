import {Image, Text, View} from 'react-native';

export interface Marker {
    title: string,
    description: string,
    latlng: {
        latitude: number,
        longitude: number
    },
    icon: string
}

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
