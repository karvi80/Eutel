import { PropertyDetailProps } from '@/types';
import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface LocationDetailsProps {
    propertyDetail: PropertyDetailProps;
    stripHtmlTags: (html: string) => string;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ propertyDetail, stripHtmlTags }) => {

    
    console.log(propertyDetail)
    return (
        <div className="flex flex-col w-full mt-[20px]">
            <div className="flex flex-col w-full mt-[20px]">
                <h2 className="h2-bold">About Location</h2>
                {propertyDetail?.summary?.location?.whatsAround?.editorial?.content.map((propertyLocation, index) => (
                    <p key={index} className="p-medium-14">
                        {propertyLocation}
                    </p>
                ))}
            </div>

            <div className="flex flex-col w-full mt-10">
                {propertyDetail?.propertyContentSectionGroups?.aboutThisProperty?.sections?.map((section) => (
                    <div key={section?.__typename} className="flex flex-col w-full">
                        <h3 className="h3-bold">{section?.header?.text}</h3>
                        <div>
                            {section?.bodySubSections.map((bodySubSection, bodySubSectionIndex) => (
                                <div key={bodySubSectionIndex}>
                                    {bodySubSection?.elements.map((element, elementIndex) => (
                                        <div key={elementIndex} className="w-full mt-6">
                                            <h4 className="h5-bold">{element?.header?.text}</h4>
                                            <div>
                                                {element?.items?.map((item, itemIndex) => (
                                                    <div key={itemIndex}>
                                                        <p className="p-medium-18">{item?.content?.text}</p>
                                                        <p className="p-medium-18">{item?.content?.primary?.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full mt-6 text-start">
                {propertyDetail?.propertyContentSectionGroups?.policies?.sections?.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        <h3 className="h3-bold">{section?.header?.text}</h3>
                        {section?.bodySubSections?.map((bodySubSection, bodySubSectionIndex) => (
                            <div key={bodySubSectionIndex} className="w-full mt-6">
                                {bodySubSection?.elements?.map((element, elementIndex2) => (
                                    <div key={elementIndex2} className="w-full mt-6">
                                        <h4 className="h5-bold">{element?.header?.text}</h4>
                                        <div className="w-full flex-left flex-wrap text-left">
                                            {element?.items?.map((item, index) => (
                                                <div key={index} className="mt-1">
                                                    {item?.content?.text && (
                                                        <p className="p-medium-18">{stripHtmlTags(item?.content?.text)}</p>
                                                    )}

                                                    {item?.contents?.map((content, contentIndex) => (
                                                        <p key={contentIndex} className="p-medium-18">{content?.primary?.value}</p>
                                                    ))}
                                                    <div className="w-full flex-center">
                                                        {element?.items[0]?.content?.primary?.value && (
                                                                <Button variant="ghost">{item?.content?.primary?.value}</Button>
                                                        )}
                                                    </div>
                                                    

                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div >
    );
};

export default LocationDetails;
