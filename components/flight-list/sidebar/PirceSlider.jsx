
'use client'

import { flightAvailResult } from "@/features/hero/flightSlice";
import { updateFlightAvailRQ } from "@/features/hero/searchCriteriaSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";

const PirceSlider = (props) => {
  const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
  const { flightList } = useSelector((state) => state.flight);
  const [price, setPrice] = useState({
    value: { min: props.filterParam?.priceMinMax[0], max: props.filterParam?.priceMinMax[1] },
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOnChange = (value) => {
    setPrice({ value });
    if(props.type === "return")
    {
      dispatch(
        updateFlightAvailRQ({
            ...flightAvailRQ,
            filterParam: {
              ...flightAvailRQ.filterParam,
              returnPriceMinMax: [value.min, value.max],
              returnPageNumber: 0,
            },
        })
      );
      
      dispatch(flightAvailResult({ flightAvailRQ : {
        ...flightAvailRQ,
        filterParam: {
          ...flightAvailRQ.filterParam,
          returnPriceMinMax: [value.min, value.max],
          returnPageNumber: 0,
        },
    }, router, undefined }));
  }
    else
    {
        dispatch(
          updateFlightAvailRQ({
              ...flightAvailRQ,
              filterParam: {
                ...flightAvailRQ.filterParam,
                priceMinMax: [value.min, value.max],
                pageNumber: 0,
              },
          })
        );
        
        dispatch(flightAvailResult({ flightAvailRQ : {
          ...flightAvailRQ,
          filterParam: {
            ...flightAvailRQ.filterParam,
            priceMinMax: [value.min, value.max],
            pageNumber: 0,
          },
      }, router, undefined }));
    }
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
        <InputRange
          formatLabel={(value) => ``}
          minValue={props.filterParam?.priceMinMax[0]}
          maxValue={props.filterParam?.priceMinMax[1]}
          value={price.value}
          onChange={(value) => handleOnChange(value)}
        />
      </div>
    </div>
  );
};

export default PirceSlider;
