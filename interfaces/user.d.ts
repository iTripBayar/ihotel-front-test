declare namespace User {
  interface Data {
    message: string;
    orders: Order[];
    reviews: Reviews[];
    success: boolean;
    totalOrders: number;
    totalReviews: number;
    user: User;
  }
  interface User {
    activationCode: number | null;
    affiliateId: number | null;
    avatar: string;
    country: string | null;
    createdAt: string;
    email: string;
    emailVerifiedAt: string | null;
    gender: stringnull;
    hotelId: number | null;
    id: number;
    isActivated: number;
    isAffiliate: number;
    isDefault: boolean;
    name: string;
    phoneNumber: string | null;
    position: string | null;
    rememberToken: string | null;
    roleId: number | null;
    surname: string;
    sysRole: string;
    updatedAt: string;
  }
  interface Order {
    amount: number;
    amountPaid: number;
    arrivalTime: string;
    balance: number;
    beneficiaryAccountNumber: number | null;
    beneficiaryName: string | null;
    cancellationPolicyCloneId: number | null;
    checkIn: string;
    checkOut: string;
    checkedInAt: string | null;
    checkedOutAt: string | null;
    confirmedAt: string | null;
    createdAt: string;
    day: number;
    discount: number;
    discountType: string;
    dollarRate: string | null;
    exitTime: string;
    externalId: number | null;
    flightdata: string | null;
    groupId: number;
    hotel: HotelData.Hotel;
    hotelId: number;
    hotelName: string;
    id: number;
    isOrderRequest: number;
    isTime: boolean;
    laravelThroughKey: number;
    notes: null;
    number: string;
    numberOfChildren: number;
    numberOfGuests: number;
    orderType: string;
    partnerCloneId: number | null;
    paymentMethod: string | null;
    postedDate: string;
    priceDollar: string | null;
    qpayInvoiceId: number | null;
    qpayQrcode: string | null;
    qpayQrimage: string | null;
    qpayQrimageBase64: string | null;
    qpayUrl: string | null;
    ratePlanCloneId: number | null;
    resReqId: number | null;
    reviewId: number | null;
    roomCloneId: number;
    roomTypeCloneId: number;
    rooms: string;
    socialpayDeeplink: string | null;
    sourceCloneId: number;
    status: string;
    statusAt: string;
    stayNights: number;
    stayType: string;
    syncId: number | null;
    token: string | null;
    updatedAt: string;
    userCloneId: number;
    userId: number | null;
    userdata: string;
    xroomReservationId: number | null;
  }
  interface Reviews{}

  interface Update {
    success: boolean;
    message: string;
    user: User;
  }
}
