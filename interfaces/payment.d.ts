declare namespace Payment {
  interface SocialPay {
    order: {
      amount: number;
      amountPaid: number;
      arrivalTime: string | null;
      balance: number;
      beneficiaryAccountNumber: string | null;
      beneficiaryName: string | null;
      cancellationPolicyCloneId: string | null;
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
      flightdata: string;
      groupId: number;
      hotelId: number;
      hotelName: string;
      id: number;
      isTime: boolean;
      notes: string | null;
      number: string;
      numberOfChildren: number;
      numberOfGuests: number;
      partnerCloneId: number | null;
      paymentMethod: number | null;
      postedDate: string;
      priceDollar: string | null;
      ratePlanCloneId: numebr | null;
      resReqId: numebr | null;
      reviewId: numebr | null;
      roomCloneId: numebr | null;
      roomTypeCloneId: number;
      rooms: string;
      socialpayDeeplink: string;
      sourceCloneId: number;
      status: string;
      statusAt: string | null;
      stayNights: number;
      stayType: string;
      syncId: number | null;
      token: string;
      updatedAt: string;
      userCloneId: number;
      userId: number;
      userdata: string;
      xroomReservationId: number | null;
    };
    orderId: number;
    orderTtl: number;
    qpay: string;
  }
  interface SocialPayInquiry {
    success: boolean;
    response: {
      amount: string;
      bank: string;
      bankCode: string;
      cardHolder: string;
      cardNumber: string;
      checksum: string;
      errorCode: string | null;
      errorDesc: string;
      status: string;
      transactionId: string;
    };
  }
  interface Pass {
    order: {
      id: number;
      syncId: number | null;
      resReqId: number | null;
      number: string;
      stayType: string | null;
      checkIn: string;
      checkOut: string;
      isTime: boolean;
      numberOfGuests: number;
      numberOfChildren: number;
      amount: number;
      amountPaid: number;
      discountType: string;
      discount: number;
      arrivalTime: string | null;
      exitTime: string;
      notes: string | null;
      checkedInAt: string | null;
      checkedOutAt: string | null;
      status: string;
      postedDate: string;
      statusAt: string | null;
      hotelId: number;
      userCloneId: number;
      sourceCloneId: number;
      partnerCloneId: number | null;
      ratePlanCloneId: number | null;
      roomTypeCloneId: number;
      roomCloneId: number | null;
      groupId: number;
      externalId: number | null;
      cancellationPolicyCloneId: number | null;
      createdAt: string;
      updatedAt: string;
      xroomReservationId: number | null;
      reviewId: number | null;
      token: string;
      paymentMethod: string | null;
      day: number;
      beneficiaryName: string | null;
      beneficiaryAccountNumber: string | null;
      socialpayDeeplink: string | null;
      flightdata: string;
      priceDollar: string | null;
      dollarRate: string | null;
      hotelName: string;
      confirmedAt: string | null;
      userId: number;
      userdata: string;
      rooms: string;
      balance: number;
      stayNights: number;
    };
    orderId: string;
    orderTtl: number;
  }
  interface PassInquiry {
    response: {
      ret: {
        amount: string;
        customerData: [];
        dbRefNo: string;
        expireDatetime: string;
        extraData: { respCode: string; respMsg: string };
        loyaltyData: [];
        respCode: string;
        respMsg: string;
        status: string;
        statusText: string;
      };
    };
    success: boolean;
  }
  interface PassNotify {
    response: {
      msg: [];
      ret: {
        data: [
          {
            messageId: string;
            success: boolean;
          },
        ];
        respCode: string;
        respMsg: string;
        success: number;
      };
      statusCode: string;
    };
    success: boolean;
  }
  interface QPay {
    success: boolean;
    message: string;
    createdAt: string;
    response: {
      invoiceId: string;
      qrText: string;
      qrImage: string;
      qPayShortUrl: string;
      urls: [
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
        {
          name: string;
          description: string;
          logo: string;
          link: string;
        },
      ];
    };
  }
  interface QPayInquiry {
    success: boolean;
    message: string;
    response: {
      count: number;
      paidAmount: number;
      rows: [
        {
          paymentId: string;
          paymentStatus: string;
          paymentAmount: string;
          trxFee: string;
          paymentCurrency: string;
          paymentWallet: string;
          paymentType: string;
          nextPaymentDate: string | null;
          nextPaymentDatetime: string | null;
          cardTransactions: [];
          p2pTransactions: [
            {
              id: string;
              transactionBankCode: string;
              accountBankCode: string;
              accountBankName: string;
              accountNumber: string;
              status: string;
              amount: string;
              currency: string;
              settlementStatus: string;
            },
          ];
        },
      ];
    };
  }
  interface Card {

  }
  interface CardInquiry {

  }
}
