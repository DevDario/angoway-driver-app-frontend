export type busDetailsResponse = {
  status: string | undefined;
  capacity: number | undefined;
  currentLoad: number | undefined;
  route: {
    origin: string | undefined;
    originLat: number | null;
    originLng: number | null;
    destination: string | undefined;
    destinationLat: number | null;
    destinationLng: number | null;
    estimatedTime: string | undefined;
    stops: {}[] | undefined;
  };
};
