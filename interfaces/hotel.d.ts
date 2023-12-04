declare namespace HotelData {
  interface full {
    activities: [];
    average: number;
    comfort: number;
    diff: number;
    employees: number;
    enddate: string;
    fresh: number;
    hasPage: number;
    hotel: hotel;
    isClosed: number;
    location: number;
    offerHotels: hotel[];
    orderCount: number;
    path: string;
    phoneNumber: string;
    price: number;
    rate: string;
    reviews: [];
    rooms: roomData.room[];
    services: { activities: [] };
    specialServices: [];
    startdate: string;
    things: number;
  }
  interface Hotel {
    address: string;
    addressEn: string | null;
    ageChild: number;
    cancellationPolicies: string;
    checkInTime: string;
    checkOutTime: string;
    commonLocationIds: string;
    companyName: string;
    contact: string;
    contactEn: string | null;
    coverPhoto: string;
    createdAt: string;
    defaultLocale: string | null;
    description: string | null;
    districtId: number;
    email: string;
    emailBook: string | null;
    hasChatbot: boolean;
    hasGoal: number;
    hasIhotel: boolean;
    hasOnlineBook: boolean;
    hasTime: boolean;
    hasXroom: boolean;
    hotelTypeId: number;
    id: number;
    image: string;
    images: string[] | null;
    includedPrice: string;
    introduction: string | null;
    introductionEn: string | null;
    isActive: boolean;
    isAutoArrange: boolean;
    isCheap: number;
    isCitypayer: boolean;
    isClosed: number;
    isInternet: number;
    isNew: boolean;
    isNewXroom: boolean;
    isOffline: number;
    isOnline: number;
    isPopularItrip: number;
    isRecommended: number;
    isShowBooking: number;
    isShowPayment: boolean;
    isShowRules: boolean;
    isTest: boolean;
    isTop: number;
    isVatpayer: boolean;
    lat: string | null;
    lng: string | null;
    location: string[];
    maxTime: number;
    name: string;
    nameEn: string | null;
    otherInfo: string | null;
    otherInfoEn: string | null;
    otherPhotos: string[];
    otherService: string[] | null;
    otherServiceEn: string[] | null;
    phone: string;
    phoneBook: string | null;
    priority: number;
    provinceId: number;
    published: number;
    rating: number;
    registerNo: string | null;
    registeredAtXroom: string;
    resEmail: string;
    resPhone: string;
    reservations: [];
    roomNumber: number;
    roomTypes: any[];
    rooms: any[];
    services: any[];
    shortAddress: string | null;
    slug: string;
    starRating: number;
    step: number;
    syncId: string | null;
    totalPeople: number;
    updatedAt: string;
    userId: number;
    website: string | null;
    workingDate: string;
    wubookLcode: string | null;
    zipCode: string | null;
  }
}
