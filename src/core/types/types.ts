// types.ts
export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
  }
  
  export interface ApiResponse<Data> {
    data: Data | null;
    isLoading: boolean;
    error: boolean;
    isValidating: boolean;
  }
  

  export interface Option {
    name:string;
  }