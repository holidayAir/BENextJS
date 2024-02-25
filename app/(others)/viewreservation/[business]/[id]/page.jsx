
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
import { getBooking } from "@/features/hero/bookingSlice";
import Skeleton from "@/components/common/skeletons/Skeleton";

const index = ({params}) => {
  
  const { loading } = useSelector((state) => ({...state.booking}));
  
  const dispatch = useDispatch();
  const router = useRouter();
  const bookingid = params.id;
  useEffect(() => {
   dispatch(getBooking({ bookingid, router, undefined }));
  }, []);
  const { getbookingRS } = useSelector((state) => state.booking);
  
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
              {loading && !getbookingRS ? <Skeleton /> :
                params.business == "hotel" ? <HotelViewReservation params={getbookingRS}/> : <MainFilterSearchBox params={getbookingRS}/>
              }
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
