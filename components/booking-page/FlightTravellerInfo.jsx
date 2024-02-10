import Link from "next/link";
import BookingDetails from "./sidebar/BookingDetails";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import BirthDate from "../common/BirthDate";
import DateSearch from "../common/BirthDate";
import { DateObject } from "react-multi-date-picker";
import BookingDetailsFlight from "./sidebar/BookingDetailsFlight";
const initialStatePassenger = {
  passengerType:"",
  gender : "",
  firstname : "",
  lastname : "",
  birthdate: "",
  nationality: "", // Added confirmPassword field
  nationalIdNumber : "",
  passportNumber:"",
};

const intialStateContact = {  
  ContactFirstname:"",
  ContactLastname:"",
  ContactCountry:"",
  ContactPhone:"",
  ContactEmail:"",
  isSendPhoneMsgPNR:false,
  isSendEmailMsgPNR:false,
}
  const FlightTravellerInfo = () => {
    const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
    const { flightList,filterParam } = useSelector((state) => state.flight);
    const [passengerData, setPassengerData] = useState(Array(flightAvailRQ.searchParam.adult).fill(initialStatePassenger));
    const [contactData, setContactData] = useState(intialStateContact);
    const [validation, setValidation] = useState(Array(flightAvailRQ.searchParam.adult).fill({
      gender : true,
      firstname : true,
      lastname : true,
      birthdate: true,
      nationality: true, // Added confirmPassword field
      nationalIdNumber : true,
      passportNumber: true, 
    }));
    const [validationContact, setValidationContact] = useState({
      ContactFirstname: true,
      ContactLastname: true,
      ContactCountry: true,
      ContactPhone: true,
      ContactEmail: true,
    });
    const [dates, setDates] = useState(      new DateObject(),//.add((cutOfDays), "day"),
    );
    const { loading, error } = useSelector((state) => state.user);
    const { firstname, lastname, email, gender, birthdate, phonenumber, socialsecuritynumber } = passengerData;
    const dispatch = useDispatch();
    const router = useRouter();
    
    useEffect(() => {
      error && toast.error(error);
    }, [error]);
  
    const validationRules = {
      gender : true,
      firstname : true,
      lastname : true,
      birthdate: true,
      nationality: true, // Added confirmPassword field
      nationalIdNumber : true,
      passportNumber: true,
      ContactFirstname: true,
      ContactLastname: true,
      ContactCountry: true,
      ContactPhone: true,
      ContactEmail: true,
    };
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
     };
    const validateContactInput = () => {
      const newValidation = {
        ContactFirstname: !validationRules.ContactFirstname || !!contactData.ContactFirstname,
        ContactLastname: !validationRules.ContactLastname || !!contactData.ContactLastname,
        ContactEmail: !validationRules.ContactEmail || validateEmail(contactData.ContactEmail),
        ContactPhone: !validationRules.ContactPhone || !!contactData.ContactPhone,
        ContactCountry: !validationRules.ContactCountry || !!contactData.ContactCountry,
      };
  
      setValidationContact(newValidation);
  
      return Object.values(newValidation).every((isValid) => isValid);
    };
  
    // const handleSubmit = async (e) => {
    //   if (validateInput()) {
    //     try {
    //         await dispatch(registerUser({ passengerData,router,toast }));        
    //       } catch (error) {
    //         console.error('Login error:', error);
    //       }
    //     }
    // };
    const validateInput = () => {
      const newValidation = passengerData.map((passenger) => ({
        gender: !validationRules.gender || !!passenger.gender,
        firstname: !validationRules.firstname || !!passenger.firstname,
        lastname: !validationRules.lastname || !!passenger.lastname,
        nationality: !validationRules.gender || !!passenger.nationality,
        birthdate: !validationRules.birthdate || !!passenger.birthdate,
        nationalIdNumber: !validationRules.phonenumber || !!passenger.nationalIdNumber,
        passportNumber: !validationRules.passportNumber || !!passenger.passportNumber,
      }));
    
      setValidation(newValidation);
    
      return newValidation.every((passengerValidation) =>
        Object.values(passengerValidation).every((isValid) => isValid)
      );
    };
    
    const handleSubmit = async (e) => {
      if (validateInput() && validateContactInput()) {
        try {
          await Promise.all(passengerData.map((passenger) =>
            dispatch(registerUser({ passengerData: passenger, router, toast })
          )));
        } catch (error) {
          console.error('Login error:', error);
        }
      }
    };
    
  const onInputChange = (e, passengerIndex) => {
    const { name, value } = e.target;
    const updatedPassengerData = [...passengerData];
    updatedPassengerData[passengerIndex] = {
      ...updatedPassengerData[passengerIndex],
      [name]: value,
    };
    setPassengerData(updatedPassengerData);

    const updatedValidation = [...validation];
    updatedValidation[passengerIndex] = {
      ...updatedValidation[passengerIndex],
      [name]: !!value,
    };
    setValidation(updatedValidation);
  };
  
  const onContactInputChange = (e) => {
      
    let { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
    if(value) {
      setValidationContact({...validationContact, [name]:true});
    }
    else{
      setValidationContact({...validationContact, [name]:false});
    }
  };
  
    const customDatePickerProps = {
      // Customize your datePickerProps here
      // For example:
      // multiple: true,
      // range: true,
      // format: "YYYY/MM/DD",
      // ... other props
    };
    return (
      <>
      
      <div className="col-xl-12 col-lg-12 mt-30">
      <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05">
            Sign in to book with your saved details or{" "}
            <Link href="/signup" className="text-blue-1 fw-500">
              register
            </Link>{" "}
            to manage your bookings on the go!
          </div>
          </div>
        <div className="col-xl-8 col-lg-8 mt-30">
          {/* End register notify */}
{/*   
          <h2 className="text-22 fw-500 mt-40 md:mt-24">
            Let us know who you are
          </h2> */}
  {passengerData.map((passenger, index) => (
        <div key={index} className="row x-gap-20 y-gap-20">
          {index !== 0 ? <hr /> : <></>}
        {/* End .col */}
  
        <div className={`col-12`}>
        <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05 border-bottom">
            Passenger {`${index + 1}`}
          </div>
          </div>
        <div className={`col-2`}>
          <div className={`form-input h-full ${validationRules.gender && !validation[index].gender ? 'error' : ''}`}>            
            <select className="form-select rounded-4 border-light justify-between pt-3 text-16 fw-500 px-20 h-full w-140 sm:w-full text-14" id={`gender-${index}`} name={`gender`} onChange={(e) => onInputChange(e, index)} >
              <option >select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            {/* <input type="text" required/> */}
            <label className="lh-1 text-14 text-light-1" style={{top:"15px"}}>Gender</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-5`}>
          <div className={`form-input ${validationRules.firstname && !validation[index].firstname ? 'error' : ''}`}>
            <input type="text" required id={`firstname-${index}`} name={`firstname`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">First Name</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-5`}>
          <div className={`form-input ${validationRules.lastname && !validation[index].lastname ? 'error' : ''}`}>
            <input type="text" required id={`lastname-${index}`} name={`lastname`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">Last Name</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.birthdate && !validation[index].birthdate ? 'error' : ''}`}>
            {/* <input type="text" required id="birthdate" name="birthdate" onChange={(e) => onInputChange(e, index)} /> */}
            <DateSearch
        name={`birthdate`}
        dates={dates}
        isSingle={true}
        onChange={(e) => onInputChange(e, index)}
        {...customDatePickerProps}
      />
            <label className="lh-1 text-14 text-light-1">Birthdate</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.nationality && !validation[index].nationality ? 'error' : ''}`}>
            <input type="email" required id={`nationality-${index}`} name={`nationality`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">Nationality</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.nationalIdNumber && !validation[index].nationalIdNumber ? 'error' : ''}`}>
            <input type="text" required id={`nationalIdNumber-${index}`} name={`nationalIdNumber`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">National Id Number</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.passportNumber && !validation[index].passportNumber ? 'error' : ''}`}>
            <input type="text" required id={`passportNumber-${index}`} name={`passportNumber`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">Passport Number</label>
          </div>
        </div>
        {/* End .col */}
{/*   
        <div className="col-6">
          <div className="d-flex ">
            <div className="form-checkbox mt-5">
              <input type="checkbox" name="name" />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
            </div>
            <div className="text-15 lh-15 text-light-1 ml-10">
              Email me exclusive Agoda promotions. I can opt out later as stated
              in the Privacy Policy.
            </div>
          </div>
        </div> */}
        {/* End .col */} 
        
        </div>       
      ))}
      
      <div className="row x-gap-20 y-gap-20 pt-20">
  
      <div className={`col-12`}>
        <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05 border-bottom">
            Contact Information
          </div>
          </div>
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.ContactFirstname && !validationContact.ContactFirstname ? 'error' : ''}`}>
            <input type="text" required id={`ContactFirstname`} name={`ContactFirstname`} onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">First Name</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.ContactLastname && !validationContact.ContactLastname ? 'error' : ''}`}>
            <input type="text" required id={`ContactLastname`} name={`ContactLastname`} onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">Last Name</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.ContactEmail && !validationContact.ContactEmail ? 'error' : ''}`}>
            <input type="text" required id={`ContactEmail`} name={`ContactEmail`} onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">Email</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.ContactPhone && !validationContact.ContactPhone ? 'error' : ''}`}>
            <input type="text" required id="ContactPhone" name="ContactPhone" onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">Phone</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.ContactCountry && !validationContact.ContactCountry ? 'error' : ''}`}>
            <input type="email" required id={`ContactCountry`} name={`ContactCountry`} onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">Country</label>
          </div>
        </div>
        {/* End .col */}
        <div className="col-6"></div>
        {/* End .col */}
  
        <div className="col-6">
          <div className="d-flex ">
            <div className="form-checkbox mt-5">
              <input type="checkbox" name={`isSendPhoneMsgPNR`} id={`isSendPhoneMsgPNR`} onChange={(e) => onContactInputChangege(e)} />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
            </div>
            <div className="text-15 lh-15 text-light-1 ml-10">
              Yes send phone msg PNR
            </div>
          </div>
        </div>
        {/* End .col */}
        {/* End .col */}
  
        <div className="col-6">
          <div className="d-flex ">
            <div className="form-checkbox mt-5">
              <input type="checkbox" name={`isSendEmailMsgPNR`} id={`isSendEmailMsgPNR`} onChange={(e) => onContactInputChangege(e)} />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
            </div>
            <div className="text-15 lh-15 text-light-1 ml-10">
              Yes send email msg PNR
            </div>
          </div>
        </div>
        {/* End .col */} 
        
        </div>       
        {/* End .row */}
      </div>
      {/* End .col-xl-7 */}

      <div className="col-xl-4 col-lg-4 mt-30">
        <div className="booking-sidebarw">
          <BookingDetailsFlight />
        </div>
      </div>
      {/*  */}
      

      <div className="row x-gap-20 y-gap-20 pt-20">
        <div className="col-auto">
          <button
            className="FTI button h-60 px-24 -blue-1 bg-light-2"
            // disabled={currentStep === 0}
            //onClick={previousStep}
          >
            Previous
          </button>
        </div>
        {/* End prvious btn */}

        <div className="col-auto">
          <button
            className="button h-60 px-24 -dark-1 bg-blue-1 text-white"
            //disabled={currentStep === steps.length - 1}
            onClick={handleSubmit}
          >
            Next <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
        {/* End next btn */}
      </div>
      {/* End stepper button */}
    </>
    );
  };
  

export default FlightTravellerInfo;
