import React from "react";
import Image from "next/image";
import { footerMenu, socialMedia } from "@/constants";

interface FooterProps{
    name: string;
    subtitle: [
        {
            title: string;
        }
    ];
}

const Footer = () => {
  return (
  <section className="flex flex-col-reverse lg:flex-row lg:items-start w-full bg-gray-600 p-10 mt-10 text-white">
    <div className="flex-center flex-col h-full mt-20 lg:mt-10">
        <div className="flex flex-col">
            <div className="flex-center">
            <Image src="/assets/images/logo.png" alt="logo" width={64} height={64} />
            <h5 className='h4-medium'>utel</h5>
            </div>

            <div className="flex-center gap-2">
                {socialMedia.map((media) => (
                    <div className=" p-2 rounded-full cursor-pointer" key={media.name}>
                        <Image src={media.icon} alt="media.name" width={18} height={18} />
                    </div>
                ))}
            </div>
        </div>

        <div>
            <p className="p-regular-16">Eutel@2025. All rights reserved</p>
        </div>
    </div>

    <div className="flex-1 flex items-start justify-around flex-wrap gap-4">
        {footerMenu.map((footer) => (
            <div key={footer.name} className="flex flex-col gap-2">
                <h5 className="p-medium-24">{footer.name}</h5>
                <div className="flex flex-col gap-2">
                    {footer.subtitle?.map((sub) => (
                        <p key={sub.title} className="p-medium-12 cursor-pointer">{sub.title}</p>
                    ))}
                </div>    
            </div>
        ))}
    </div>
  </section>
  );
};

export default Footer;
