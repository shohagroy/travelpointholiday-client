import BreadcrumbBanar from "@/components/ui/BreadcrumbBanar";
import React from "react";

import ContactMessageUi from "@/components/ui/ContactMessageUi";

export const metadata = {
  title: "Contact Us | Travel Point",
};

const ContactUs = () => {
  const breadItems = [{ title: "Contact us" }];

  return (
    <>
      <main>
        <BreadcrumbBanar
          breadItems={breadItems}
          name={"Contact Us"}
          tittle={"Get In Touch"}
        />

        <ContactMessageUi />
      </main>
    </>
  );
};

export default ContactUs;
