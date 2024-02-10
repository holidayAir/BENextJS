import { useDispatch, useSelector } from "react-redux";


const PricingSummary = () => {
  const { selectedHotel,selectedRoomTypeCode } = useSelector((state) => ({ ...state.hotel }));
  const { checkavailbookingrulesRS } = useSelector((state) => state.hotel);
  let hotelinfo = selectedHotel?.selectedHotel?.hotelOptions?.hotelOption.find(x=>x.ratePlanCode == selectedRoomTypeCode);
  
  if(checkavailbookingrulesRS?.warningCode && checkavailbookingrulesRS?.warningCode === "warnPriceChanged"){
    hotelinfo = checkavailbookingrulesRS?.hotelOptions?.hotelOption;
  }
  return (
    <div className="px-30 py-30 border-light rounded-4 mt-30">
      <div className="text-20 fw-500 mb-20">Your price summary</div>
      <div className="row y-gap-5 justify-between">
        <div className="col-auto">
          <div className="text-15">{hotelinfo?.hotelRooms?.hotelRoomList[0].name}</div>
        </div>
        {/* End col */}
        <div className="col-auto">
          <div className="text-15">{selectedHotel?.selectedHotel?.currency} {hotelinfo?.prices?.price?.totalFixAmounts.service.amount}</div>
        </div>
        {/* End col */}
      </div>
      {/* End .row */}

      <div className="row y-gap-5 justify-between pt-5">
        <div className="col-auto">
          <div className="text-15">Taxes and fees</div>
        </div>
        <div className="col-auto">
          <div className="text-15">{selectedHotel?.selectedHotel?.currency} {hotelinfo?.prices?.price?.totalFixAmounts.service.serviceTaxAmount}</div>
        </div>
      </div>
      {/* End .row */}

      {/* <div className="row y-gap-5 justify-between pt-5">
        <div className="col-auto">
          <div className="text-15">Booking fees</div>
        </div>
        <div className="col-auto">
          <div className="text-15">FREE</div>
        </div>
      </div> */}
      {/* End .row */}

      <div className="px-20 py-20 bg-blue-2 rounded-4 mt-20">
        <div className="row y-gap-5 justify-between">
          <div className="col-auto">
            <div className="text-18 lh-13 fw-500">Price</div>
          </div>
          <div className="col-auto">
            <div className="text-18 lh-13 fw-500">{selectedHotel?.selectedHotel?.currency} {hotelinfo?.prices?.price?.totalFixAmounts.nett}</div>
          </div>
        </div>
      </div>
      {/* End .row */}
    </div>
    // End px-30
  );
};

export default PricingSummary;
