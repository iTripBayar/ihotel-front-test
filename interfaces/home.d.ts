declare namespace HomeData {
  interface Home {
    camps: HotelData.Hotel[];
    cheapHotels: HotelData.Hotel[];
    cities: [];
    destCategories: DestCategories[];
    dollarRate: string;
    events: [];
    hotels: HotelData.Hotel[];
    phoneNumber: string;
    places: Places[];
    posts: Posts[];
    propertyTypes: PropertyTypes[];
    recommendedPlaces: [];
    searchCity: number | null;
    searchHotel: number | null;
    searchPlace: number | null;
    topDestinations: TopDestinations[];
  }
  interface DestCategories {
    author: string;
    coverPhoto: string;
    id: number;
    name: string;
    subtitle: string;
    urlSrc: string;
  }
  interface Places {
    coverPhoto: string | null;
    createdAt: string;
    description: string;
    districtId: number;
    id: number;
    image: string | null;
    isRecommended: number;
    isSearch: number;
    longitudeLatitude: string | null;
    name: string;
    nameEn: string;
    placeKey: number;
    slug: string;
    thumbnail: string;
    updatedAt: string;
  }
  interface Posts {
    excerpt: string;
    id: number;
    photos: string;
    slug: string;
    title: string;
  }
  interface PropertyTypes {
    createdAt: string;
    id: number;
    image: string | null;
    name: string;
    nameEn: string;
    updatedAt: string;
  }
  interface TopDestinations {
    coverPhoto: string | null;
    createdAt: string;
    description: string;
    districtId: number;
    id: number;
    image: string | null;
    isRecommended: number;
    isSearch: number;
    longitudeLatitude: string | null;
    name: string;
    nameEn: string;
    placeKey: number;
    slug: string;
    thumbnail: string;
    updatedAt: string;
  }
}
