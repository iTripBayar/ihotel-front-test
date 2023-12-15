declare namespace HomeData {
  interface Home {
    camps: HotelData.Hotel[];
    cheapHotels: HotelData.Hotel[];
    cities: SearchData.Cities[];
    destCategories: DestCategories[];
    dollarRate: string;
    events: [];
    hotels: HotelData.Hotel[];
    phoneNumber: string;
    places: SearchData.Places[];
    posts: Posts[];
    propertyTypes: PropertyTypes[];
    recommendedPlaces: RecommendedPlaces[];
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
  interface RecommendedPlaces {
    coverPhoto: string;
    createdAt: string;
    description: string;
    district: {
      code: number | null;
      countryId: number | null;
      createdAt: string;
      id: number;
      image: string | null;
      international: string;
      isActive: boolean;
      isRecommended: number;
      location: { lat: number; lng: number };
      name: string;
      orderNo: number;
      provinceId: number;
      updatedAt: string;
    };
    districtId: number;
    id: number;
    image: string;
    isRecommended: number;
    isSearch: number;
    longitudeLatitude: null;
    name: string;
    nameEn: string;
    placeKey: number;
    provinceId: number;
    slug: string;
    thumbnail: string;
    updatedAt: string;
  }
}
