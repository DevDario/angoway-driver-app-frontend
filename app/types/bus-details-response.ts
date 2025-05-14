export type busDetailsResponse = {
  status: string | undefined;
  capacity: number | undefined;
  currentLoad: number | undefined;
  route: {
    origin: string | undefined;
    destination: string | undefined;
    estimatedTime: string | undefined;
    stops: {}[] | undefined;
  };
};
