function Box({ value, setValue, where = "from", currency }) {
  return (
    <div className="flex flex-col justify-between m-10 p-10  mb-0 mt-0 max-w-md mx-auto bg-blue-900 text-white rounded-lg shadow-lg">
      <div className="flex justify-between">
        <div className="text-lg font-semibold">{where}</div>
        <div className="text-lg font-semibold">Currency type</div>
      </div>
      <div className="flex justify-between mt-6">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="number"
          readOnly={where === "to"}
          min="0"
          className="border border-blue-700 bg-blue-800 text-white w-full py-2 px-4 rounded-md"
        />
        <select className=" bg-blue-800 text-white border border-blue-700 py-2 px-4 rounded-md ml-20 w-[40%]">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </div>
  );
}
 export default Box