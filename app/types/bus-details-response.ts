export type busDetailsResponse = {
    status: boolean,
    route: string,
    availableSeats: number,
    totalSeats: number,
    timeToDestination: number,
    numberOfStops: number,
    distanceToDestinationInKm: number
}