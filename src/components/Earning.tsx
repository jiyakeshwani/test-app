
const EarningsSummary = () => {
  return (
    <div className="w-full  mx-auto grid gap-4">
      {/* Top Card */}
      <div className="border border-gray-200 rounded-2xl p-4 shadow-sm">
        <h3 className="text-gray-600 font-medium">Total Earnings</h3>
        <p className="text-[#8134af] text-3xl font-bold mt-2">$1,25,000</p>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200  rounded-2xl p-4 shadow-sm">
          <h3 className="text-gray-600 font-medium">Payment Awaited</h3>
          <p className="text-[#8134af] text-2xl font-bold mt-2">$25,000</p>
        </div>
        <div className="border border-gray-200  rounded-2xl p-4 shadow-sm">
          <h3 className="text-gray-600 font-medium">Payment Overdue</h3>
          <p className="text-red-500 text-2xl font-bold mt-2">$25,000</p>
        </div>
      </div>
    </div>
  );
};

export default EarningsSummary;
