import React from "react";
import ContactUs from "./ContactUs";
import { SubmitResult, TValues } from "../Form";
import { wait } from "../products/products-data";

const ContactUsPage = () => {
  const handleSubmit = async (values: TValues): Promise<SubmitResult> => {
    await wait(1000); // simulate asynchronous web API call
    return {
      success: true
    };
  };

  return (
    <div className="page-container">
      <h1>Contact Us</h1>
      <p>If you enter your details we'll get back to you as soon as we can.</p>
      <ContactUs onSubmit={handleSubmit}/>
    </div>
  )
};
export default ContactUsPage
