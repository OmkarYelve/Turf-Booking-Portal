import React from 'react';
import Call from "../images/Call.png";
import Round from "../images/Round.png";
import Soccer from "../images/Soccer.png";


function WhyTurf() {
  return (
    
<section id="whyTurfZone" className="content-center w-full">
   <div className="w-4/5 mx-auto">
      <div className="flex flex-wrap -mx-4">
         <div className="w-full px-4">
            <div className="text-center mx-auto mb-12 lg:mb-20 max-w-[510px]">
              
               <h2 className="pt-20 text-2xl font-extrabold text-center"> Why <span className="text-pink-600">Turf Corner</span>
               </h2>
               <p className="text-base pt-10 text-black">
               Turf Corner is a sportsground and outdoor playground booking portal that provides easy 
               booking facility for schools, clubs and other sports organizations across Mumbai.
               Enabling them to easily book a turf playground online - anytime.
               </p>
            </div>
         </div>
      </div>

      <div className="flex flex-wrap ">
         <div className="w-full md:w-1/2 lg:w-1/3 px-6">
               <div className=" w-[70px] h-[70px] flex items-center justify-items-center bg-primary rounded-2xl mb-8">
               <img className=" items-center" src={Call} alt="Call" /> 
               </div>
               <p className=" text-black">
               No more calling around and being on </p><p>hold for long periods of time.
               </p>
         </div>

         <div className="w-full md:w-1/2 lg:w-1/3 px-4">
               <div className= 'w-[70px] h-[70px] flex items-center justify-center bg-primary rounded-2xl mb-8'>
               <img src={Round} alt="Round" />
               </div>
               <p className='text-black'>
               Book a turf in advance.
               </p>
         </div>

         <div className="w-full md:w-1/2 lg:w-1/3 px-4 ">
               <div className='w-[70px] h-[70px] flex  items-center justify-center bg-primary rounded-2xl mb-8'>
               <img src={Soccer} alt="Soccer" />
               </div>
               <p className='text-black'>
               Finding a football pitch is much easier.
               </p>
         </div>
         
         

         
      </div>
   </div>
</section>



  )}


  export default WhyTurf