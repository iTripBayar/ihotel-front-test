declare namespace roomData {
  interface room {
    bedNumber: number;
    bedType: {
      bedCount: number;
      createdAt: string;
      id: number;
      name: string;
      nameEn: string;
      updatedAt: string;
    };
    bedTypeId: number;
    byPerson: boolean;
    createdAt: string;
    days: string | null;
    defaultPrice: number;
    description: string | null;
    discountPercent: string | null;
    endDate: string | null;
    extraBeds: number;
    floorSize: string | null;
    groupCode: string;
    hasExtraBed: boolean;
    hasTime: boolean;
    hotelId: number;
    id: number;
    images: string[];
    introductionEn: string | null;
    isOnline: boolean;
    isResRequest: boolean;
    name: string;
    nameEn: string | null;
    number: number;
    occupancy: number;
    occupancyChildren: number;
    peopleNumber: number;
    photos: string;
    priceDayUse: number;
    priceOp: number | null;
    priceTime: number;
    priceTimeCount: number;
    saleQuantity: null;
    sales: {
      createdAt: string;
      enddate: string;
      id: number;
      percent: number;
      price: number;
      priceOp: number | null;
      roomId: number;
      startdate: string;
      updatedAt: string;
    }[];
    shortName: string;
    size: number;
    startDate: string | null;
    syncId: string | null;
    totalPeople: number;
    translate: string | null;
    updatedAt: string;
    window: number;
  }
}
