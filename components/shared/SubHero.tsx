import React from "react";
import Image from "next/image"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { subhero } from "@/constants";
import { cn } from "@/lib/utils";

const SubHero = () => {
    return (
        <div className="flex-center flex-col mt-20 pt-6 text-center">
                <h1 className="h2-bold">We Offer Best Services</h1>
            <div className="w-full grid gap-8 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 mt-5">
                {subhero.map((sub) => (
                    <Card  key={sub.title}
                    className="cursor-pointer hover:shadow-lg hover:scale-110"
                    >
                       <CardContent className="flex-center lg:flex-col">
                        <CardTitle className="flex-center flex-col">
                        <Image src={sub.icon} alt ={sub.title} width={100} height={100}/>
                        <CardHeader className="text-center">{sub.title}</CardHeader>
                        </CardTitle>
                        <CardDescription>{sub.desc}</CardDescription>
                       </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SubHero;
