
import TrendingDestinations from '@/components/shared/TrendingDestinations';
import SearchForm from '@/components/shared/SearchForm'
import SubHero from '@/components/shared/SubHero';
import Steps from '@/components/shared/Steps';





export default function Home() {

  return (
    <main className="flex-center flex-col w-full min-h-screen">
      <section className="w-full flex flex-col items-center justify-between bg-coral-500 pt-6 px-10 bg-opacity-40 relative min-h-[400px]">
        <img src="/assets/images/hero.jpg" alt="hero"
        className="absolute inset-0 w-full h-full object-cover -z-10"
         />
        <div className="w-full flex-center flex-col text-white">
          <h2 className="h1-bold">Find your Next Stay</h2>
          <p className="p-regular-18">Search low pries on hotels, homes and much more...</p>
        </div>
        <SearchForm />
      </section>

      <SubHero />
        
        <TrendingDestinations />

        <Steps />
    </main>
  )
}
