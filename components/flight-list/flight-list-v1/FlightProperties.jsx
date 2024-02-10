import { useDispatch, useSelector } from "react-redux";
import flightsData from "../../../data/flights";
import Skeleton from "@/components/common/skeletons/Skeleton";
// import { useRouter } from "next/router";
import { flightExtraCharges, updateFlightCart, updateSelectedFlight } from "@/features/hero/flightSlice";
import { useRouter } from "next/navigation";

const FlightProperties = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
  const { flightList,filterParam,loading } = useSelector((state) => state.flight);
  // {loading ? <Skeleton /> : ""}
  console.log(JSON.stringify(flightList));
  const updateCart = (rqCreateBooking, fareItemindex, index)=>{

//# Select the single flight object
const selectedFlight = flightList[index];

//# Modify the passengerFareInfoList for the selected flight
const modifiedPassengerFareInfo = selectedFlight.passengerFareInfoList[fareItemindex];
const modifiedFlight = {
    ...selectedFlight,
    passengerFareInfoList: [modifiedPassengerFareInfo]
};

dispatch(updateSelectedFlight(modifiedFlight));
    
    dispatch(flightExtraCharges({ flightExtraChargesRQ : {
      requestXML: rqCreateBooking,
      tripType: "ONE_WAY",
  }, router, undefined }));
  }
  return (
    <>
      {flightList?.map((item,index) => (
        <div className="js-accordion" key={item.flightSegmentID}>
          <div className="py-30 px-30 bg-white rounded-4 base-tr mt-30">
            <div className="row y-gap-30 justify-between items-center">
              <div className="col">
                <div className="row y-gap-10 items-center">
                  <div className="col-sm-auto">
                    <img
                      className="size-40"
                      src="/img/flights/HolidayAir.svg"
                      alt="image"
                    />
                  </div>
                  <div className="col">
                    <div className="row x-gap-20 items-end">
                      <div className="col-auto">
                        <div className="lh-15 fw-500">{new Date(item.departureDateTimeUTC).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }).split(' ')}</div>
                        <div className="text-15 lh-15 text-light-1">{item.departureAirport.locationCode}</div>
                      </div>
                      <div className="col text-center">
{flightAvailRQ.searchParam.tripType !== "ONE_WAY" ? (
                      <div className="text-15 lh-15 text-light-1 mb-10">
                        {item.journeyDuration}
                      </div>):(<></>)}
                        <div className="flightLine">
                          <div />
                          <div />
                        </div>
                        <div className="text-15 lh-15 text-light-1 mt-10">
                          {`${item.stopQuantity === "0" ? "Nonstop" : item.stopQuantity + " Stops"} `}
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="lh-15 fw-500">{new Date(item.arrivalDateTimeUTC).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }).split(' ')}</div>
                        <div className="text-15 lh-15 text-light-1">{item.arrivalAirport.locationCode}</div>
                      </div>
                    </div>
                  </div>
                  
{flightAvailRQ.searchParam.tripType === "ONE_WAY" ? (<div className="col-md-auto">
                    <div className="text-15 text-light-1 px-20 md:px-0">
                      {item.journeyDuration}
                    </div>
                  </div>):(<></>)}
                </div>
                <div className="row y-gap-10 items-center pt-30" style={{display:"none"}}>
                  <div className="col-sm-auto">
                    <img
                      className="size-40"
                      src="/img/flightIcons/2.png"
                      alt="image"
                    />
                  </div>
                  <div className="col">
                    <div className="row x-gap-20 items-end">
                      <div className="col-auto">
                        <div className="lh-15 fw-500">14:00</div>
                        <div className="text-15 lh-15 text-light-1">SAW</div>
                      </div>
                      <div className="col text-center">
                        <div className="flightLine">
                          <div />
                          <div />
                        </div>
                        <div className="text-15 lh-15 text-light-1 mt-10">
                          Nonstop
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="lh-15 fw-500">22:00</div>
                        <div className="text-15 lh-15 text-light-1">STN</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-auto">
                    <div className="text-15 text-light-1 px-20 md:px-0">
                      4h 05m
                    </div>
                  </div>
                </div>
              </div>
              {/* End .col */}

              <div className="col-md-auto">
                <div className="d-flex items-center h-full">
                  <div className="pl-30 border-left-light h-full md:d-none" />
                  <div>
                    <div className="text-right md:text-left mb-10">
                      <div className="text-18 lh-16 fw-500">{`USD ${item.indicativePrice}`}</div>
                      <div className="text-15 lh-16 text-light-1">{`${item.passengerFareInfoList.length} deals`}</div>
                    </div>
                    <div className="accordion__button">
                      <button
                        className="button -dark-1 px-30 h-50 bg-blue-1 text-white"
                        data-bs-toggle="collapse"
                        data-bs-target={`#div${item.flightSegmentID}`}
                      >
                        View Deal s
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* End  .col-md-auto */}
            </div>
            {/* End .row  */}

            <div className=" collapse" id={`div${item.flightSegmentID}`}>
              <div className="border-light rounded-4 mt-30">
                <div className="py-20 px-30">
                  <div className="row justify-between items-center">
                    <div className="col-auto">
                      <div className="fw-500 text-dark-1">
                        Depart • {new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric'
}).format(new Date(item.departureDateTimeUTC))}
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="text-14 text-light-1">{item.airlineCode + item.flightNumber}</div>
                    </div>
                  </div>
                </div>
                {item.passengerFareInfoList.map((fareItem, fareItemindex)=>(
                <div className="py-30 px-30 border-top-light">
                  <div className="row y-gap-10 justify-between">
                    <div className="col-auto">
                      <div className="d-flex items-center mb-15">
                        <div className="w-28 d-flex justify-center mr-15">
                          <img src="/img/flights/HolidayAir.svg" alt="image" />
                        </div>
                        <div className="text-14 text-light-1">
                          {`${item.airlineName}(${item.airlineCode}) - ${item.flightNumber}`}
                        </div>
                      </div>
                      <div className="relative z-0">
                        <div className="border-line-2" />
                        <div className="d-flex items-center">
                          <div className="w-28 d-flex justify-center mr-15">
                            <div className="size-10 border-light rounded-full bg-white" />
                          </div>
                          <div className="row d-flex justify-center items-center ">
                            <div className="col-auto">
                              <div className="lh-14 fw-500 text-center">{new Date(item.departureDateTimeUTC).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric',})}<br />{new Date(item.departureDateTimeUTC).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }).split(' ')}</div>
                            </div>
                            <div className="col-auto">
                              <div className="lh-14 fw-500">
                          {`${item.departureAirport.locationName} ${item.departureAirport.country.locationName} - (${item.departureAirport.locationCode})`}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex items-center mt-15">
                          <div className="w-28 d-flex justify-center mr-15">
                            <img src="/img/flights/plane.svg" alt="image" />
                          </div>
                          <div className="text-14 text-light-1">{item.journeyDuration}</div>
                        </div>
                        <div className="d-flex items-center mt-15">
                          <div className="w-28 d-flex justify-center mr-15">
                            <div className="size-10 border-light rounded-full bg-border" />
                          </div>
                          <div className="row d-flex justify-center items-center">
                            <div className="col-auto">
                              <div className="lh-14 fw-500 text-center">{new Date(item.arrivalDateTimeUTC).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric',})}<br />{new Date(item.arrivalDateTimeUTC).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }).split(' ')}</div>
                            </div>
                            <div className="col-auto">
                              <div className="lh-14 fw-500">
                          {`${item.arrivalAirport.locationName} ${item.arrivalAirport.country.locationName} - (${item.arrivalAirport.locationCode})`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {flightAvailRQ.searchParam.tripType === "ONE_WAY" ? (
                    <div className="col-auto text-right md:text-left">
                      <div className="text-14 text-light-1">{`${fareItem.cabin} - ${fareItem.cabinClassCode}`}</div>
                      <div className="text-14 mt-15 md:mt-5">
                        {`Fare Baggage: ${fareItem.fareBaggageMaxAllowedPieces} ${fareItem.fareBaggageAllowanceType}(${fareItem.fareBaggageWeight} ${fareItem.fareBaggageUnitOfMeasureCode})`}
                        <br />
                        {`${fareItem.fareGroupName} - ${fareItem.fareReferenceName} (${fareItem.fareReferenceCode})`}
                        <br />
                        {`Seat Availability : ${0}`}
                      </div>
                      <button
                        className="button -dark-1 px-30 h-40 bg-blue-1 text-white float-end"
                      >
                        {fareItem.pricingInfo.totalFare.currencyCode + " " + fareItem.pricingInfo.totalFare.amount} <div className="icon-arrow-top-right ml-15" />
                      </button>
                    </div>):(<>
                  <div className="col-auto text-left md:text-left">
                    <div className="text-14 mt-15 md:mt-5">
                      {`Fare Baggage: ${fareItem.fareBaggageMaxAllowedPieces} ${fareItem.fareBaggageAllowanceType}(${fareItem.fareBaggageWeight} ${fareItem.fareBaggageUnitOfMeasureCode})`}
                      <br />
                      {`${fareItem.fareGroupName} - ${fareItem.fareReferenceName} (${fareItem.fareReferenceCode})`}
                      <br />
                      {`Seat Availability : ${0}`}
                    </div>
                  </div>
                  <div className="col-auto text-right md:text-left">
                    <div className="text-14 mt-15 md:mt-5 text-light-1">{`${fareItem.cabin} - ${fareItem.cabinClassCode}`}</div>
                    <button
                      className="button -dark-1 px-30 h-40 bg-blue-1 text-white float-end"
                      onClick={()=> updateCart(fareItem.rqCreateBooking, fareItemindex, index)}
                    >
                      {fareItem.pricingInfo.totalFare.currencyCode + " " + fareItem.pricingInfo.totalFare.amount} <div className="icon-arrow-top-right ml-15" />
                    </button>
                  </div></>)}
                  </div>
                </div>
                ))}
              </div>
              <div className="border-light rounded-4 mt-20" style={{display:"none"}}>
                <div className="py-20 px-30">
                  <div className="row justify-between items-center">
                    <div className="col-auto">
                      <div className="fw-500 text-dark-1">
                        Depart • Sat, Mar 26
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="text-14 text-light-1">4h 05m</div>
                    </div>
                  </div>
                </div>
                <div className="py-30 px-30 border-top-light">
                  <div className="row y-gap-10 justify-between">
                    <div className="col-auto">
                      <div className="d-flex items-center mb-15">
                        <div className="w-28 d-flex justify-center mr-15">
                          <img src="/img/flights/HolidayAir.svg" alt="image" />
                        </div>
                        <div className="text-14 text-light-1">
                          Pegasus Airlines 1169
                        </div>
                      </div>
                      <div className="relative z-0">
                        <div className="border-line-2" />
                        <div className="d-flex items-center">
                          <div className="w-28 d-flex justify-center mr-15">
                            <div className="size-10 border-light rounded-full bg-white" />
                          </div>
                          <div className="row">
                            <div className="col-auto">
                              <div className="lh-14 fw-500">8:25 am</div>
                            </div>
                            <div className="col-auto">
                              <div className="lh-14 fw-500">
                                Istanbul Sabiha Gokcen (SAW)
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex items-center mt-15">
                          <div className="w-28 d-flex justify-center mr-15">
                            <img src="/img/flights/plane.svg" alt="image" />
                          </div>
                          <div className="text-14 text-light-1">4h 05m</div>
                        </div>
                        <div className="d-flex items-center mt-15">
                          <div className="w-28 d-flex justify-center mr-15">
                            <div className="size-10 border-light rounded-full bg-border" />
                          </div>
                          <div className="row">
                            <div className="col-auto">
                              <div className="lh-14 fw-500">9:30 am</div>
                            </div>
                            <div className="col-auto">
                              <div className="lh-14 fw-500">
                                London Stansted (STN)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto text-right md:text-left">
                      <div className="text-14 text-light-1">Economy</div>
                      <div className="text-14 mt-15 md:mt-5">
                        Airbus A320neo (Narrow-body jet)
                        <br />
                        Wi-Fi available
                        <br />
                        USB outlet
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End collapase content */}
          </div>
          {/* End bg-white */}
        </div>
      ))}
    </>
  );
};

export default FlightProperties;
