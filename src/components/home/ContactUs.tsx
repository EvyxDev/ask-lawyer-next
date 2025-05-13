import Image from "next/image";
import { contactus } from "../../../public/assets";
import ContactUsForm from "./ContactUsForm";

const ContactUs = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center w-full">
      <div className="flex lg:flex-row flex-col gap-8 justify-between items-center w-full mx-auto container">
        <div className="w-full lg:justify-start justify-center items-center flex">
          <Image
            width={500}
            src={contactus}
            className="bg-cover"
            alt="contact us background"
          />
        </div>
        <ContactUsForm />
      </div>
    </section>
  );
};

export default ContactUs;
