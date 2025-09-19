import React from "react";
import DateWidget from "../components/Date";
import EarningsSummary from "../components/Earning";
import IncomeTrend from "../components/Graph";
import InvoicesSection from "../components/Invoices";

const Dashboard: React.FC = () => {
  return (
    <div>
      <section
        className="hidden md:flex justify-between items-center shadow-lg shadow-[#fceefb] pb-4 px-6 backdrop-blur-2xl"
        aria-label="Dashboard header"
      >
        <h1 className="text-2xl font-semibold">Hey, User!</h1>
        <figure className="w-10 h-10">
          <img
            src="/Avatar.png"
            alt="User avatar"
            className="rounded-full w-full h-full object-cover"
            loading="lazy"
          />
        </figure>
      </section>

      <section
        className="px-6 bg-white mt-6 py-6 md:py-0 rounded-[50px] md:rounded-none"
        aria-label="Dashboard content"
      >
        <div>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex flex-col-reverse md:flex-row md:w-[67%] w-full justify-between items-center bg-gray-100/80 md:px-12 py-4 shadow-lg shadow-[#fceefb] rounded-2xl gap-6">
              <div>
                <h2 className="text-3xl text-center md:text-left font-bold bg-gradient-to-b from-[#CF3097] to-[#444CD3] bg-clip-text text-transparent">
                  Create New Invoice
                </h2>
                <p className="text-gray-400 mt-2 text-center md:text-left">
                  Start by creating and sending a new invoice
                </p>
                <p className="text-purple-600 hidden md:block mt-6">
                  Or upload an existing invoice and set a payment reminder
                </p>
              </div>
              <div className="inline-block">
                <img
                  src="./Vector.png"
                  alt="Illustration"
                  className="select-none"
                  loading="lazy"
                />
              </div>
            </div>

            <p className="text-purple-600 md:hidden text-[14px] text-center mt-1">
              Or upload an existing invoice and set a payment reminder
            </p>

            <div className="w-full md:w-[30%]">
              <DateWidget />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:mt-12 mt-6 gap-6 w-full">
            <div className="w-full md:w-[61%]">
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
      </section>
    </div>
  );
};

export default Dashboard;
