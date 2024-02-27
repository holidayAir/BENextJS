import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const OrderSubmittedInfoHotel = () => {
  const { selectedHotel,selectedRoomTypeCode,bookingRS } = useSelector((state) => ({ ...state.hotel }));
  const Router = useRouter();
  let GoToDetails = (itemcode)=>{
    Router.push(`/viewreservation/hotel/${itemcode}`);
  };
  console.log(bookingRS);
  return (
    <>
      <div className="col-xl-12 col-lg-12">
        <div className="order-completed-wrapper">
          <div className="d-flex flex-column items-center mt-40 lg:md-40 sm:mt-24">
            <div className="size-80 flex-center rounded-full bg-dark-3">
              <i className="icon-check text-30 text-white" />
            </div>
            <div className="text-30 lh-1 fw-600 mt-20">
              Hotel is Booked successfully!
            </div>
            <div className="text-15 text-light-1 mt-10">
              Booking details has been sent to your mail
            </div>
          </div>
          {/* End header */}

          <div className="border-type-1 rounded-8 px-50 py-35 mt-40">
            <div className="row">
              {/* <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Hotel</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  {bookingRS?.BookingRS?.Reservations?.Reservation?.Items?.HotelItem?.HotelInfo.Name}
                </div>
              </div> */}
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Boking Ref Number</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  {bookingRS?.BookingRS?.Reservations?.Reservation["@Locator"]}
                </div>
              </div>
              {/* End .col */}
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Booking Date</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                {bookingRS?.BookingRS["@TimeStamp"] ? new Intl.DateTimeFormat('en-US', {
                                          weekday: 'short',
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric',
                                        }).format(new Date(bookingRS?.BookingRS["@TimeStamp"])) : ""}
                </div>
              </div>
              {/* End .col */}
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Total</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  {bookingRS?.BookingRS?.Reservations?.Reservation?.Items?.HotelItem?.Prices?.Price["@Currency"]} {bookingRS?.BookingRS?.Reservations?.Reservation?.Items?.HotelItem?.Prices?.Price?.TotalFixAmounts["@Nett"]}
                </div>
              </div>
              {/* End .col */}
              <div className="col-lg-3 col-md-6">
                <Link class="button -md h-60 bg-blue-1 text-white"
                  href={`/viewreservation/hotel/${bookingRS?.BookingGuid}`}
                  //onClick={()=> {console.log("Button clicked"+bookingRS?.BookingGuid);GoToDetails(bookingRS?.BookingGuid)}}
                >View Reservation</Link>
              </div>
              {/* End .col */}
            </div>
          </div>
          {/* order price info */}

          {/* <div className="border-light rounded-8 px-50 py-40 mt-40">
            <h4 className="text-20 fw-500 mb-30">Your Information</h4>
            <div className="row y-gap-10">
              <div className="col-12">
                <div className="d-flex justify-between ">
                  <div className="text-15 lh-16">First name</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">System</div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Last name</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">Admin</div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Email</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                    admin@bookingcore.test
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Phone</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                    112 666 888
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Address line 1</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1" />
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Address line 2</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1" />
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">City</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                    New York
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">State/Province/Region</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1" />
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">ZIP code/Postal code</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1" />
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Country</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                    United States
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Special Requirements</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1" />
                </div>
              </div>
            </div>
          </div> */}
          {/* End order information */}
        </div>
      </div>
    </>
  );
};

export default OrderSubmittedInfoHotel;
