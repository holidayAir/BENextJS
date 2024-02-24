
'use client'
import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-3";
import { hotelsData } from "@/data/hotels";
import DefaultFooter from "@/components/footer/default";
import MainFilterSearchBox from "@/components/hotel-list/hotel-list/MainFilterSearchBox";
import TopHeaderFilter from "@/components/hotel-list/hotel-list/TopHeaderFilter";
import HotelProperties from "@/components/hotel-list/hotel-list/HotelProperties";
import Pagination from "@/components/hotel-list/common/Pagination";
import Sidebar from "@/components/hotel-list/hotel-list/Sidebar";
import { hotelAvailResult } from "@/features/hero/hotelSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { updateHotelCriteria } from "@/features/hero/searchCriteriaSlice";
import HotelViewReservation from "@/app/(others)/hotel-viewreservation";


const index = ({params}) => {
  
  const dispatch = useDispatch();
  const { hotelCriteria } = useSelector((state) => state.searchCriteria) || {};
  const { hotelList,hotelAvailRQ,loading,filterParam } = useSelector((state) => state.hotel);
  const router = useRouter();
  
   return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />
      {/* End Header 1 */}

      <section className="pt-40 pb-40 bg-light-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1 className="text-30 fw-600">{`Reservation Details`}</h1>
              </div>
              {/* End text-center */}
              {params.business == "hotel" ? <HotelViewReservation params={params}/> : <MainFilterSearchBox params={params}/>}
            </div>
            {/* End col-12 */}
          </div>
        </div>
      </section>
      {/* Top SearchBanner */}
      
      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default index;
