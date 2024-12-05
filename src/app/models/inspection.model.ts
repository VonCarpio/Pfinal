export interface Inspection {
    photo: string;
    location: {
      latitude: number;
      longitude: number;
    };
    timestamp: number;
    comments: string;
  }
  