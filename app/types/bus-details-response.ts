export type busDetailsResponse = {
    status: boolean,
    routeStart: string,
    routeEnd: string,
    availableSeats: number,
    totalSeats: number,
    timeToDestination: number,
    numberOfStops: number,
    distanceToDestinationInKm: number,
    destination:{
        lat:number, 
        lng: number
    }
}