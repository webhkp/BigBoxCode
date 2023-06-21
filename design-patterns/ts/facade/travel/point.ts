// point.ts

class Point {
    private lat: number;
    private lng: number;
    
    constructor(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }

    getLat(): number {
        return this.lat;
    }

    getLng(): number {
        return this.lng;
    }
}

export default Point;