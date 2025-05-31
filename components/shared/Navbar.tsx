import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from '../ui/separator'
import { navbatItems } from '@/constants'

const Navbar = () => {
    return (
        <nav className="w-full p-10 bg-accent">
            <div className="hidden lg:flex w-full items-center justify-between">
                <div className="flex items-center ">
                    <Image src="/assets/images/logo.png" alt="logo" width={80} height={80} />
                    <h1 className="text-[45px] font-extrabold text-primary-500">utel</h1>
                </div>

                <div className="hidden lg:block">
                    {navbatItems.map((navbarItem) => (
                        <Button variant="link" key={navbarItem.title}>{navbarItem.title}</Button>
                    ))}
                </div>

                <div>
                    <Button variant="outline">Sign in</Button>
                </div>
            </div >

            <div className="block lg:hidden w-full flex flex-row items-center justify-between">
                <div className="flex items-center ">
                    <Image src="/assets/images/logo.png" alt="logo" width={80} height={80} />
                    <h1 className="text-[45px] font-extrabold text-primary-500">utel</h1>
                </div>
                <Sheet>
                    <SheetTrigger className="align-middle">
                        <Image
                            src="/assets/icons/menu.svg"
                            alt="menu"
                            width={24}
                            height={24}
                            className="cursor-pointer"
                        />
                    </SheetTrigger>
                    <SheetContent className="flex flex-col gap-6 bg-white lg:hidden">
                        <div>
                            <Button variant="outline">Sign in</Button>
                        </div>
                        <Separator className="border border-gray-50" />
                        <div className="flex flex-col">
                            {navbatItems.map((navbarItem) => (
                                <Button variant="ghost" key={navbarItem.title}>{navbarItem.title}</Button>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>

            </div >
        </nav>
    )
}

export default Navbar