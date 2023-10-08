export interface MyLatLng {
    longitude: number;
    latitude: number;
}

/**
 * Returns the distance between two locations in miles.
 */
export function haversineDistance(location1: MyLatLng, location2: MyLatLng): number {
    const toRadian = (degree: number): number => {
        return degree * Math.PI / 180;
    };

    const dLat = toRadian(location2.latitude - location1.latitude);
    const dLon = toRadian(location2.longitude - location1.longitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadian(location1.latitude)) * Math.cos(toRadian(location2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const R = 3958.8; // Earth radius in miles
    return R * c;
}

/**
 * Returns the bearing between two locations in degrees.
 */
export function calculateBearing(origin: MyLatLng, destination: MyLatLng) {
    const rad = Math.PI / 180;
    const dLon = (destination.longitude - origin.longitude) * rad;
    const lat1 = origin.latitude * rad;
    const lat2 = destination.latitude * rad;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    let bearing = Math.atan2(y, x) * (180 / Math.PI);
    bearing = (bearing + 360) % 360; // Normalize to 0-360
    return bearing;
}