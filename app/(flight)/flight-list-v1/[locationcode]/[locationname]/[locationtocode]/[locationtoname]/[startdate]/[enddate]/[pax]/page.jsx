
'use client'
import { flightAvailResult } from "@/features/hero/flightSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-3";
import DefaultFooter from "@/components/footer/default";
import MainFilterSearchBox from "@/components/flight-list/flight-list-v1/MainFilterSearchBox";
import TopHeaderFilter from "@/components/flight-list/flight-list-v1/TopHeaderFilter";
import FlightProperties from "@/components/flight-list/flight-list-v1/FlightProperties";
import Pagination from "@/components/flight-list/common/Pagination";
import Sidebar from "@/components/flight-list/flight-list-v1/Sidebar";
import FlightReturnProperties from "@/components/flight-list/flight-list-v1/FlightReturnProperties";
import { DateObject } from "react-multi-date-picker";
import DropdownFlightFilters from "@/components/hotel-list/common/DropdownFlightFilters";
import { updateFlightAvailRQ } from "@/features/hero/searchCriteriaSlice";

// export const metadata = {
//   title: "Flight List v1 || BE - Argentina - Travel & Tour React NextJS Template",
//   description: "BE - Argentina - Travel & Tour React NextJS Template",
// };

const index = ({ params }) => {
  
  const dispatch = useDispatch();
  const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
  const { flightList, returnFlightList, filterParam, returnFilterParam,loading, totalFlights, totalReturnFlights, totalPages, totalRetutrnPages } = useSelector((state) => state.flight);
  const router = useRouter();
  console.log(params);
  const { destinationLocationCode,
  destinationLocationName,
  originLocationCode,
  originLocationName } = flightAvailRQ.searchParam;
  //const hotel = hotelsData.find((item) => item.id == id) || hotelsData[0];
  useEffect(() => {
    console.log(params);
    if(destinationLocationCode && destinationLocationName && originLocationCode && originLocationName){
    // Dispatch the action
    dispatch(flightAvailResult({ flightAvailRQ, router, undefined }));
    }
    else{
    dispatch(
      updateFlightAvailRQ({
          ...flightAvailRQ,
          searchParam: {
            ...flightAvailRQ.searchParam,
            originLocationCode: params.locationcode || "",
            originLocationName: decodeURIComponent(params.locationname) || "",
            destinationLocationCode: params.locationtocode || "",
            destinationLocationName: decodeURIComponent(params.locationtoname) || "",
            startDate: new Date(decodeURIComponent(params.startdate)).toISOString() ||  new Date(new DateObject()).toISOString(),
            endDate: new Date(decodeURIComponent(params.enddate)).toISOString() ||  new Date(new DateObject()).toISOString(),
            adult: params.adult|| 1,
            child:params.child || 0,
            infant: params.infant|| 0,
          },
      })
    );
    
    dispatch(flightAvailResult({ flightAvailRQ :{
      ...flightAvailRQ,
      searchParam: {
        ...flightAvailRQ.searchParam,
        originLocationCode: params.locationcode || "",
        originLocationName: decodeURIComponent(params.locationname) || "",
        destinationLocationCode: params.locationtocode || "",
        destinationLocationName: decodeURIComponent(params.locationtoname) || "",
        startDate: new Date(decodeURIComponent(params.startdate)).toISOString() ||  new Date(new DateObject()).toISOString(),
        endDate: new Date(decodeURIComponent(params.enddate)).toISOString() ||  new Date(new DateObject()).toISOString(),
        adult: params.adult|| 1,
        child:params.child || 0,
        infant: params.infant|| 0,
      },
  }, router, undefined }));
    }
  }, [dispatch]);
  console.log(flightList);
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />
      {/* End Header 1 */}

      <section className="pt-40 pb-40">
        <div className="container">
          <MainFilterSearchBox />
        </div>
      </section>
      {/* Top SearchBanner */}
{flightAvailRQ.searchParam.tripType === "ONE_WAY" ? (
      <section className="layout-pt-md layout-pb-md bg-light-2">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar py-20 px-20 xl:d-none bg-white">
                <div className="row y-gap-40">
                  <Sidebar />
                </div>
              </aside>
              {/* End sidebar for desktop */}

              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter Tours
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                {/* End offcanvas header */}

                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40  xl:d-block">
                    <Sidebar />
                  </aside>
                </div>
                {/* End offcanvas body */}
              </div>
              {/* End mobile menu sidebar */}
            </div>
            {/* End col */}

            <div className="col-xl-9 ">
                <TopHeaderFilter flightList={flightList} loading={loading} totalFlights={totalFlights} />

              <div className="row">
                <FlightProperties />
              </div>
              {/* End .row */}
                {totalPages > 1 ?? <Pagination totalPages={totalPages} filterParam={flightAvailRQ.filterParam} />}
            </div>
            {/* End .col for right content */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>) : (
      <section className="layout-pt-md layout-pb-md bg-light-2">
        <div className="container">
          <div className="row y-gap-20 justify-between items-center">
            <div className="col-auto">
              {/* End .row */}
            </div>
            {/* End col-auto */}

            {/* <div className="col-auto">
              <button className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1">
                <i className="icon-up-down text-14 mr-10"></i>
                Top picks for your search
              </button>
            </div> */}
            {/* End col-auto */}

            {/* <div className="border-top-light mt-30 mb-30"></div> */}
            {/* End border-top */}

            <div className="row y-gap-30">
              
              <div className="col-xl-6 ">
                <TopHeaderFilter flightList={flightList} loading={loading} totalFlights={totalFlights} />
              <div className="row x-gap-20 mt-20 y-gap-10 items-center">
                <div className="col-auto">
                  <div className="text-18 fw-500">Filter</div>
                </div>
                {/* End .col-auto */}

                <div className="col-auto">
                  <div className="row x-gap-15 y-gap-15">
                    <DropdownFlightFilters type="outbound" filterParam={filterParam} />
                  </div>
                </div>
                {/* End .col-auto */}
              </div>

                <div className="row">
                  <FlightProperties />
                </div>
                {/* End .row */}
                {totalPages > 1 ?? <Pagination totalPages={totalPages} filterParam={flightAvailRQ.filterParam} />}
              </div>
              <div className="col-xl-6 ">
                <TopHeaderFilter flightList={returnFlightList} loading={loading} totalFlights={totalReturnFlights}  />
              <div className="row x-gap-20 mt-20 y-gap-10 items-center">
                <div className="col-auto">
                  <div className="text-18 fw-500">Filter</div>
                </div>
                {/* End .col-auto */}

                <div className="col-auto">
                  <div className="row x-gap-15 y-gap-15">
                    <DropdownFlightFilters type="return" filterParam={returnFilterParam} />
                  </div>
                </div>
                {/* End .col-auto */}
              </div>

                <div className="row">
                  <FlightReturnProperties loading={loading} returnFlightList={returnFlightList} />
                </div>
                {/* End .row */}
                {totalRetutrnPages > 1 && <Pagination totalPages={totalRetutrnPages} filterParam={flightAvailRQ.filterParam} />}
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>)}
      {/* End layout for listing sidebar and content */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default index;
