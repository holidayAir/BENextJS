
'use client'

import { hotelAvailResult, updateHotelAvailRQ } from "@/features/hero/hotelSlice";
import { useRouter } from "next/navigation";
import Slider from "rc-slider";
import { useState } from "react";
// import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import 'rc-slider/assets/index.css';

const PirceSlider = () => {
  const { hotelList,hotelAvailRQ, filterParam,loading } = useSelector((state) => state.hotel);
  
  const [price, setPrice] = useState({
    value: { min: filterParam.priceMinMax[0], max: filterParam.priceMinMax[1] },
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const handleOnChange = (value) => {
    setPrice({ value });
    dispatch(
      updateHotelAvailRQ({
          ...hotelAvailRQ,
          filterParam: {
            ...hotelAvailRQ.filterParam,
            priceMinMax: [value.min, value.max],
            pageNumber: 0,
          },
      })
    );
    
    dispatch(hotelAvailResult({ hotelAvailRQ : {
      ...hotelAvailRQ,
      filterParam: {
        ...hotelAvailRQ.filterParam,
        priceMinMax: [value.min, value.max],
        pageNumber: 0,
      },
  }, router, undefined }));
  };

  return (
    <div className="js-price-rangeSlider">
      <div className="text-14 fw-500"></div>

      <div className="d-flex justify-between mb-20">
        <div className="text-15 text-dark-1">
          <span className="js-lower mx-1">${price.value.min}</span>-
          <span className="js-upper mx-1">${price.value.max}</span>
        </div>
      </div>

      <div className="px-5">
        {/* <InputRange
          formatLabel={(value) => ``}
          minValue={0}
          maxValue={filterParam.priceMinMax[1]}
          value={price.value}
          onChange={(value) => handleOnChange(value)}
        /> */}
        <Slider
          min={0}
          max={2000}
          range
          value={price.value}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default PirceSlider;
