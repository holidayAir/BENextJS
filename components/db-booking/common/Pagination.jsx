
'use client'

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myBookings, updateFilterParam } from "@/features/hero/bookingSlice";
import { useRouter } from "next/navigation";

const Pagination = (props) => {
  const { bookings, filterParam, loading, totalPages, totalBookings } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(
      updateFilterParam({
          ...filterParam,
            pageNumber: (pageNumber),
      })
    );
    
    dispatch(myBookings({ filterParam : {
      ...filterParam,
        pageNumber: (pageNumber),
  }, router, undefined }));
  };

  const renderPage = (pageNumber, isActive = false) => {
    const className = `size-40 flex-center rounded-full cursor-pointer ${
      isActive ? "bg-dark-1 text-white" : ""
    }`;
    return (
      <div key={pageNumber} className="col-auto">
        <div className={className} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </div>
      </div>
    );
  };

  const renderPages = () => {
    //const totalPages = totalPages; // Change this to the actual total number of pages
    const pageNumbers = [];
    for (let i = 1; i <= props.totalPages; i++) {
      pageNumbers.push(i);
    }
    const pages = pageNumbers.map((pageNumber) =>
      renderPage(pageNumber, pageNumber === (props.filterParam.pageNumber))
    );
    return pages;
  };

  return (
    <div className="border-top-light mt-30 pt-30">
      <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
        <div className="col-auto md:order-1">
          <button className="button -blue-1 size-40 rounded-full border-light">
            <i className="icon-chevron-left text-12" />
          </button>
        </div>

        <div className="col-md-auto md:order-3">
          <div className="row x-gap-20 y-gap-20 items-center md:d-none">
            {renderPages()}
            {/* <div className="col-auto">
              <div className="size-40 flex-center rounded-full">...</div>
            </div>
            <div className="col-auto">
              <div className="size-40 flex-center rounded-full">20</div>
            </div> */}
          </div>

          <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
            {renderPages()}
          </div>
        </div>

        <div className="col-auto md:order-2">
          <button className="button -blue-1 size-40 rounded-full border-light">
            <i className="icon-chevron-right text-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
