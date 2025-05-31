import { Metadata } from 'next';
import { ReactNode } from 'react';
import Navbar from '@/components/shared/Navbar';



export const metadata: Metadata = {
    title: 'Eutel',
    description: 'Eutel, your perfect hotel look up and booking.',
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main className="w-full">
            <section className="flex w-full min-h-screen flex-1 flex-col px-auto pt-8 max-md:pb-14 sm:px-14">
                {children}
            </section>
        </main>)
}

export default RootLayout;