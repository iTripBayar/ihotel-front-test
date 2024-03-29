declare namespace SearchData {
  interface Data {
    categories: Categories[];
    category: number | null;
    checkin: string;
    checkout: string;
    ci: number | null;
    cities: Cities[];
    city: number | null;
    h: number | null;
    hotel: number | null;
    hotelServices: HotelServices[];
    isClosed: number | null;
    mapCenter: { lat: number; lng: number };
    maxprice: number;
    minprice: number;
    onlyfor: string | null;
    p: number | null;
    place: number | null;
    places: Places[];
    rate: string;
    roomServices: [];
  }
  interface Categories {
    createdAt: string;
    id: number;
    image: string | null;
    name: string;
    nameEn: string;
    updatedAt: string;
  }
  interface Cities {
    code: number | null;
    countryId: number;
    createdAt: string;
    id: number;
    image: string | null;
    international: string;
    isActive: boolean;
    isRecommended: numebr;
    isSearch: number;
    location: { lat: number | null; lng: number | null };
    name: string;
    nameEn: string;
    orderNo: number;
    updatedAt: string;
  }
  interface Places {
    coverPhoto: string | null;
    createdAt: string;
    description: string;
    districtId: number;
    id: numebr;
    image: string | null;
    isRecommended: number;
    isSearch: number;
    longitudeLatitude: null;
    name: string;
    nameEn: string;
    placeKey: number;
    provinceId: number | null;
    slug: string;
    thumbnail: string;
    updatedAt: string;
  }
  interface HotelServices {
    createdAt: string | null;
    facilityCategoryId: number;
    icon: string | null;
    id: number;
    image: string | null;
    isDefault: number;
    isFilter: number;
    isMost: number;
    mobileIcon: string | null;
    name: string;
    nameEn: string | null;
    syncId: number;
    updatedAt: string | null;
  }
}
declare namespace SearchQuery{
  interface Result {
    hotels: Items[];
    query: string
  }
  interface Items {
    id: number;
    includedServiceMessage: string;
    isNew: boolean;
    isNewXroom: boolean;
    name: string;
    nameEn: string;
    slug: string;
    type: string;
  }
}
