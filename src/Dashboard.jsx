import Date from "./components/Date";
import EarningsSummary from "./components/Earning";
import IncomeTrend from "./components/Graph";
import InvoicesSection from "./components/Invoices";

export const Dashboard = () => {
  return (
    <div className="">
      {/* header */}
      <section className=" hidden shadow-lg shadow-[#fceefb] pb-4 px-6 backdrop-blur-2xl md:flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Hey, User!</h1>

        <figure>
          <img src="/Avatar.png" alt="" className="" />
        </figure>
      </section>
      {/* main content */}
      <section className="px-6 bg-white mt-6 md:rounded-none py-6 md:py-0 rounded-[50px] ">

<div className="">
  <div className="">
    {/* Left: Create Invoice + Date */}
    <div className="flex flex-col md:flex-row gap-6 w-full ">
      <div className="flex flex-col-reverse md:flex-row md:w-[70%] w-full justify-between items-center bg-gray-100/80 md:px-12 py-8 shadow-lg shadow-[#fceefb] rounded-2xl gap-6">
        <div className="">
          <h3 className="text-3xl text-center md:text-left font-bold bg-gradient-to-b from-[#CF3097] to-[#444CD3] bg-clip-text text-transparent">
            Create New Invoice
          </h3>
          <p className="text-gray-400 mt-2 text-center md:text-left">
            Start by creating and sending new invoice
          </p>
          <p className="text-purple-600 hidden md:block mt-6">
            Or Upload an existing invoice and set payment reminder
          </p>
        </div>
        <div className="inline-block bg-gradient-to-b from-[#CF3097] to-[#444CD3] bg-clip-text text-transparent">
          <img src="./Vector.png" alt="" />
        </div>
      </div>
        <p className="text-purple-600 md:hidden text-[14px]  text-center block mt-1">
            Or Upload an existing invoice and set payment reminder
          </p>
      <div>
        <Date />
      </div>
    </div>
    {/* Right: Earnings + Graph */}
    <div className="flex flex-col md:flex-row  md:mt-12 mt-6  gap-6 w-full ">
          <div className="md:w-[61%] w-full">
        <IncomeTrend />
      </div>
       <div className="w-full md:w-[36%]">
      <EarningsSummary />
      </div>
  
    </div>
  </div>
  <div className="mt-12">
    <InvoicesSection />
  </div>
</div>

   
      </section>
    </div>
  );
};
