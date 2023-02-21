import Image from "next/image";
export default function Hero() {
  return (
    <>
      <section className="pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]">
        <div className="container">
          <div className="flex flex-col items-center">
            <h1 className=" text-center text-4xl font-bold font-sans text-black dark:text-white sm:text-4xl md:text-5xl xl:text-6xl xl:w-3/4">
              The Best Financial Solution Built For Schools
            </h1>
            <p className="text-center mt-6 font-sans lg:w-2/4 mb-12 text-base font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              euismod, nibh a cursus vestibulum, ligula tortor viverra nulla, id
              dapibus sem metus vitae leo. Ut porttitor molestie ante, ut
              dignissim ex. Cras ultrices vehicula vulputate.
            </p>
            <div className="flex font-sans gap-5">
                <button className="rounded-md bg-primary py-4 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80">Get Started</button>
                <button className="rounded-md bg-black/20 py-4 px-8 text-base font-semibold text-black duration-300 ease-in-out hover:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30">Learn More</button>
            </div>
            <div className="mt-12">
                <Image src='/dashboard.svg' alt='hero-img' width={1920} height={1080}/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
