declare namespace CheckHotels {
  interface Data {
    data: HotelData.Hotel[];
    hotelServices: [];
    mapCenter: {
      lat: number;
      lng: number;
    };
    result: number;
    success: boolean;
    places: SearchData.Places[];
    cities: SearchData.Cities[];
    categories: SearchData.Categories[];
    dollarRate: string;
  }
}
