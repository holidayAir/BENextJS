import React from "react";
import { useSelector } from "react-redux";
import BookingDetailsFlight from "./sidebar/BookingDetailsFlight";
  const FlightFareInfo = (props) => {   
    const { cartItems } = useSelector((state) => state.cart);
    const filteredItems = (cartItems && cartItems.length > 0) ? cartItems[0].items.filter(item => item.cartData.business === "Flight") : {};
    return (
        <div className="booking-sidebarw">
          <BookingDetailsFlight {...props} />
        </div>
    );
  };
  

export default FlightFareInfo;
