import Link from "next/link";
import BookingDetails from "./sidebar/BookingDetails";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import BirthDate from "../common/BirthDate";
import DateSearch from "../common/BirthDate";
import { DateObject } from "react-multi-date-picker";
import BookingDetailsFlight from "./sidebar/BookingDetailsFlight";
import { createCart } from "@/features/hero/flightSlice";
const initialStatePassenger = {
  passengerTypeCode:"ADLT",
  gender : "M",
  givenName : "Praful",
  surname : "Chauhan",
  birthDate: "2020-02-09T14:03:18.654Z",
  hasStretcher: false,
  nationality: "IND", // Added confirmPassword field
  nationalIdNumber : "91",
  passportNumber:"87946518",
  passportExpiryDate: "2026-02-09T14:03:18.654Z"
};

const intialStateContact = {  
  givenName:"Naitik",
  surname:"Shah",
  phoneNumberAreaCode: "845",
  phoneNumberCountryCode:"+91",
  phoneNumberSubscriberNumber:"978418515",
  email:"cprafulm@gmail.com",
  socialSecurityNumber: "895184515",
  phoneNumberMarkedForSendingRezInfo:true,
  emailMarkedForSendingRezInfo:true,
}
  const FlightTravellerInfo = () => {
    const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
    debugger;
    const { flightList,filterParam, selectedFlight, selectedReturnFlight } = useSelector((state) => state.flight);
    const [adultData, setAdultData] = useState(Array(flightAvailRQ.searchParam.adult).fill(initialStatePassenger));
    const [childData, setChildData] = useState(Array(flightAvailRQ.searchParam.child).fill(initialStatePassenger));
    const [infantData, setInfantData] = useState(Array(flightAvailRQ.searchParam.infant).fill(initialStatePassenger));
    const [contactData, setContactData] = useState(intialStateContact);
    const [validation, setValidation] = useState(Array(flightAvailRQ.searchParam.adult).fill({
      gender : true,
      givenName : true,
      surname : true,
      birthDate: true,
      nationality: true, // Added confirmPassword field
      nationalIdNumber : true,
      passportNumber: true, 
    }));
    const [validationContact, setValidationContact] = useState({
      givenName: true,
      surname: true,
      phoneNumberCountryCode: true,
      phoneNumberSubscriberNumber: true,
      email: true,
    });
    const [dates, setDates] = useState();//new DateObject("2026-02-09T14:03:18.654Z"));//      new DateObject());//.add((cutOfDays), "day"),
    const { loading, error } = useSelector((state) => state.user);
    const { givenName, surname, email, gender, birthDate, phonenumber, socialsecuritynumber } = adultData;
    const dispatch = useDispatch();
    const router = useRouter();
  // 
    
    useEffect(() => {
      error && toast.error(error);
    }, [error]);
  
    const validationRules = {
      gender : true,
      givenName : true,
      surname : true,
      birthDate: true,
      nationality: true, // Added confirmPassword field
      nationalIdNumber : true,
      passportNumber: true,
      passportExpiryDate:true,
      phoneNumberCountryCode: true,
      phoneNumberSubscriberNumber: true,
      email: true,
    };
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
     };
    const validateContactInput = () => {
      const newValidation = {
        givenName: !validationRules.givenName || !!contactData.givenName,
        surname: !validationRules.surname || !!contactData.surname,
        email: !validationRules.email || validateEmail(contactData.email),
        phoneNumberSubscriberNumber: !validationRules.phoneNumberSubscriberNumber || !!contactData.phoneNumberSubscriberNumber,
        phoneNumberCountryCode: !validationRules.phoneNumberCountryCode || !!contactData.phoneNumberCountryCode,
      };
  
      setValidationContact(newValidation);
  
      return Object.values(newValidation).every((isValid) => isValid);
    };
  
    // const handleSubmit = async (e) => {
    //   if (validateInput()) {
    //     try {
    //         await dispatch(registerUser({ adultData,router,toast }));        
    //       } catch (error) {
    //         console.error('Login error:', error);
    //       }
    //     }
    // };
    const validateInput = () => {
      const newValidation = adultData.map((passenger) => ({
        gender: !validationRules.gender || !!passenger.gender,
        givenName: !validationRules.givenName || !!passenger.givenName,
        surname: !validationRules.surname || !!passenger.surname,
        nationality: !validationRules.gender || !!passenger.nationality,
        birthDate: !validationRules.birthDate || !!passenger.birthDate,
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
          await Promise.all(adultData.map((passenger) =>            
                            dispatch(createCart({ createCartRQ : {
                              requestXML: selectedFlight,
                              returnFlightRequestXML: selectedReturnFlight,
                              airTravelerDtoList: [...adultData, ...childData, infantData],
                              contactInformationDto: contactData
                          }, router, undefined }))
                        ));
        } catch (error) {
          console.error('Login error:', error);
        }
      }
    };
    
  const onInputChange = (e, passengerIndex) => {
    const { name, value } = e.target;
    const updatedPassengerData = [...adultData];
    updatedPassengerData[passengerIndex] = {
      ...updatedPassengerData[passengerIndex],
      [name]: value,
    };
    setAdultData(updatedPassengerData);

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
  {adultData.map((passenger, index) => (
        <div key={index} className="row x-gap-20 y-gap-20">
          {index !== 0 ? <hr className="mt-20 p-0" /> : <></>}
        {/* End .col */}
  
        <div className={`col-12`}>
        <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05 border-bottom">
            Passenger {`${index + 1}`}
          </div>
          </div>
        <div className={`col-2`}>
          <div className={`form-input h-full ${validationRules.gender && !validation[index].gender ? 'error' : ''}`}>            
            <select value={passenger.gender} className="form-select rounded-4 border-light select-float justify-between pt-3 text-16 fw-500 pt-25 px-15 h-full w-140 sm:w-full text-14" id={`gender-${index}`} name={`gender`} onChange={(e) => onInputChange(e, index)} >
              <option >select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            {/* <input type="text" required/> */}
            <label className="lh-1 text-14 text-light-1 label-float">Gender</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-5`}>
          <div className={`form-input ${validationRules.givenName && !validation[index].givenName ? 'error' : ''}`}>
            <input type="text" value={passenger.givenName} required id={`givenName-${index}`} name={`givenName`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">First Name</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-5`}>
          <div className={`form-input ${validationRules.surname && !validation[index].surname ? 'error' : ''}`}>
            <input type="text" value={passenger.surname} required id={`surname-${index}`} name={`surname`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">Last Name</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.birthDate && !validation[index].birthDate ? 'error' : ''}`}>
            {/* <input type="text" required id="birthDate" name="birthDate" onChange={(e) => onInputChange(e, index)} /> */}
            <DateSearch
        name={`birthDate`}
        placeholder={"Sdfsdfs "}
        dates={new DateObject("2026-02-09T14:03:18.654Z")}
        isSingle={true}
        onChange={(e) => onInputChange(e, index)}
        {...customDatePickerProps}
      />
            <label className="lh-1 text-14 text-light-1 label-float">Birthdate</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.nationality && !validation[index].nationality ? 'error' : ''}`}>
            <input type="email" value={passenger.nationality} required id={`nationality-${index}`} name={`nationality`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">Nationality</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-4`}>
          <div className={`form-input ${validationRules.nationalIdNumber && !validation[index].nationalIdNumber ? 'error' : ''}`}>
            <input type="text" value={passenger.nationalIdNumber} required id={`nationalIdNumber-${index}`} name={`nationalIdNumber`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">National Id Number</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-4`}>
          <div className={`form-input ${validationRules.passportNumber && !validation[index].passportNumber ? 'error' : ''}`}>
            <input type="text" value={passenger.passportNumber} required id={`passportNumber-${index}`} name={`passportNumber`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">Passport Number</label>
          </div>
        </div>
            <div className={`col-4`}>
              <div className={`form-input ${validationRules.passportExpiryDate && !validation[index].passportExpiryDate ? 'error' : ''}`}>
                {/* <input type="text" required id="birthDate" name="birthDate" onChange={(e) => onInputChange(e, index)} /> */}
                <DateSearch
            name={`passportExpiryDate`}
            dates={new DateObject("2028-02-09T14:03:18.654Z")}
            isSingle={true}
            onChange={(e) => onInputChange(e, index)}
            {...customDatePickerProps}
          />
                <label className="lh-1 text-14 text-light-1 label-float">Passport Expiry Date</label>
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
      
  {childData.map((passenger, index) => (
        <div key={index} className="row x-gap-20 y-gap-20">
          <hr className="mt-20 p-0" />
        {/* End .col */}
  
        <div className={`col-12`}>
        <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05 border-bottom">
            Child {`${index + 1}`}
          </div>
          </div>
        <div className={`col-2`}>
          <div className={`form-input h-full ${validationRules.gender && !validation[index].gender ? 'error' : ''}`}>            
            <select className="form-select rounded-4 border-light select-float justify-between pt-3 text-16 fw-500 px-15 h-full w-140 sm:w-full text-14" id={`gender-${index}`} name={`gender`} onChange={(e) => onInputChange(e, index)} >
              <option >select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            {/* <input type="text" required/> */}
            <label className="lh-1 text-14 text-light-1  label-float">Gender</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-5`}>
          <div className={`form-input ${validationRules.givenName && !validation[index].givenName ? 'error' : ''}`}>
            <input type="text" required id={`givenName-${index}`} name={`givenName`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">First Name</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-5`}>
          <div className={`form-input ${validationRules.surname && !validation[index].surname ? 'error' : ''}`}>
            <input type="text" required id={`surname-${index}`} name={`surname`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">Last Name</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.birthDate && !validation[index].birthDate ? 'error' : ''}`}>
            {/* <input type="text" required id="birthDate" name="birthDate" onChange={(e) => onInputChange(e, index)} /> */}
            <DateSearch
        name={`birthDate`}
        dates={dates}
        isSingle={true}
        onChange={(e) => onInputChange(e, index)}
        {...customDatePickerProps}
      />
            <label className="lh-1 text-14 text-light-1 label-float">Birthdate</label>
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
  
        <div className={`col-4`}>
          <div className={`form-input ${validationRules.nationalIdNumber && !validation[index].nationalIdNumber ? 'error' : ''}`}>
            <input type="text" required id={`nationalIdNumber-${index}`} name={`nationalIdNumber`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">National Id Number</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-4`}>
          <div className={`form-input ${validationRules.passportNumber && !validation[index].passportNumber ? 'error' : ''}`}>
            <input type="text" required id={`passportNumber-${index}`} name={`passportNumber`} onChange={(e) => onInputChange(e, index)} />
            <label className="lh-1 text-14 text-light-1">Passport Number</label>
          </div>
        </div>
        {/* End .col */}
        
        <div className={`col-4`}>
              <div className={`form-input ${validationRules.passportExpiryDate && !validation[index].passportExpiryDate ? 'error' : ''}`}>
                {/* <input type="text" required id="birthDate" name="birthDate" onChange={(e) => onInputChange(e, index)} /> */}
                <DateSearch
            name={`passportExpiryDate`}
            dates={dates}
            isSingle={true}
            onChange={(e) => onInputChange(e, index)}
            {...customDatePickerProps}
          />
                <label className="lh-1 text-14 text-light-1 label-float">Passport Expiry Date</label>
              </div>
            </div>
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
      
      {infantData.map((passenger, index) => (
            <div key={index} className="row x-gap-20 y-gap-20">
              <hr className="mt-20 p-0" />
            {/* End .col */}
      
            <div className={`col-12`}>
            <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05 border-bottom">
                Infant {`${index + 1}`}
              </div>
              </div>
            <div className={`col-2`}>
              <div className={`form-input h-full ${validationRules.gender && !validation[index].gender ? 'error' : ''}`}>            
                <select className="form-select rounded-4 select-float border-light justify-between pt-3 text-16 fw-500 px-15 h-full w-140 sm:w-full text-14" id={`gender-${index}`} name={`gender`} onChange={(e) => onInputChange(e, index)} >
                  <option >select</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
                {/* <input type="text" required/> */}
                <label className="lh-1 text-14 text-light-1 label-float">Gender</label>
              </div>
            </div>
            {/* End .col */}
      
            <div className={`col-5`}>
              <div className={`form-input ${validationRules.givenName && !validation[index].givenName ? 'error' : ''}`}>
                <input type="text" required id={`givenName-${index}`} name={`givenName`} onChange={(e) => onInputChange(e, index)} />
                <label className="lh-1 text-14 text-light-1">First Name</label>
              </div>
            </div>
            {/* End .col */}
      
            <div className={`col-5`}>
              <div className={`form-input ${validationRules.surname && !validation[index].surname ? 'error' : ''}`}>
                <input type="text" required id={`surname-${index}`} name={`surname`} onChange={(e) => onInputChange(e, index)} />
                <label className="lh-1 text-14 text-light-1">Last Name</label>
              </div>
            </div>
            {/* End .col */}
      
            <div className={`col-4`}>
              <div className={`form-input ${validationRules.birthDate && !validation[index].birthDate ? 'error' : ''}`}>
                {/* <input type="text" required id="birthDate" name="birthDate" onChange={(e) => onInputChange(e, index)} /> */}
                <DateSearch
            name={`birthDate`}
            dates={dates}
            isSingle={true}
            onChange={(e) => onInputChange(e, index)}
            {...customDatePickerProps}
          />
                <label className="lh-1 text-14 text-light-1 label-float">Birthdate</label>
              </div>
            </div>
            {/* End .col */}
      
            <div className={`col-4`}>
              <div className={`form-input ${validationRules.nationality && !validation[index].nationality ? 'error' : ''}`}>
                <input type="email" required id={`nationality-${index}`} name={`nationality`} onChange={(e) => onInputChange(e, index)} />
                <label className="lh-1 text-14 text-light-1">Nationality</label>
              </div>
            </div>
            {/* End .col */}
      
            <div className={`col-4`}>
              <div className={`form-input ${validationRules.nationalIdNumber && !validation[index].nationalIdNumber ? 'error' : ''}`}>
                <input type="text" required id={`nationalIdNumber-${index}`} name={`nationalIdNumber`} onChange={(e) => onInputChange(e, index)} />
                <label className="lh-1 text-14 text-light-1">National Id Number</label>
              </div>
            </div>
            {/* End .col */}
            </div>       
          ))}
      
      <hr className="mt-20 p-0" />
      <div className="row x-gap-20 y-gap-20 pt-20">
  
      <div className={`col-12`}>
        <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05 border-bottom">
            Contact Information
          </div>
          </div>
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.givenName && !validationContact.givenName ? 'error' : ''}`}>
            <input type="text" required id={`givenName`} name={`givenName`} onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">First Name</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.surname && !validationContact.surname ? 'error' : ''}`}>
            <input type="text" required id={`surname`} name={`surname`} onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">Last Name</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.email && !validationContact.email ? 'error' : ''}`}>
            <input type="text" required id={`email`} name={`email`} onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">Email</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.phoneNumberSubscriberNumber && !validationContact.phoneNumberSubscriberNumber ? 'error' : ''}`}>
            <input type="text" required id="phoneNumberSubscriberNumber" name="phoneNumberSubscriberNumber" onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">Phone</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className="col-6">
          <div className="d-flex ">
            <div className="form-checkbox mt-5">
              <input type="checkbox" name={`phoneNumberMarkedForSendingRezInfo`} id={`phoneNumberMarkedForSendingRezInfo`} onChange={(e) => onContactInputChangege(e)} />
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
              <input type="checkbox" name={`emailMarkedForSendingRezInfo`} id={`emailMarkedForSendingRezInfo`} onChange={(e) => onContactInputChangege(e)} />
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
