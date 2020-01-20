import React from "react";
import { email, Field, Form, minLength, required } from "../Form";

const ContactUs = () => {
  return (
    <Form defaultValues={{ name: "", email: "", reason: "Support", notes: "" }}
          validationRules={{
            email: [{ validator: required }, { validator: email }],
            name: [{ validator: required }, { validator: minLength, arg: 3 }]
          }}>
      <Field label="Your name" name="name"/>
      <Field label="Your email address" name="email" type="Email"/>
      <Field label="Reason you need to contact us" name="reason" type="Select"
             options={["Marketing", "Support", "Feedback", "Jobs", "Other"]}/>
      <Field label="Additional notes" name="notes" type="TextArea"/>
    </Form>
  )
};
export default ContactUs
