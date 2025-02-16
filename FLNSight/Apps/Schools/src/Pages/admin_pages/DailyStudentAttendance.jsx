import { IoMdDownload } from "react-icons/io";
import AttendanceList from "@/components/admin/studentAttendance/AttendanceList";




function DailyStudentAttendance() {
         

  const selectFields = [
    {
      label: "Class",
      value: "Class 1",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/97e0a307df83ecde36e2a36eb9c1e5dd5171467098ca7378079b19a45437bdd3?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
    },
    {
      label: "Section",
      value: "Section A",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/97e0a307df83ecde36e2a36eb9c1e5dd5171467098ca7378079b19a45437bdd3?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
    },
    {
      label: "Date",
      value: "1/1/2023",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/97e0a307df83ecde36e2a36eb9c1e5dd5171467098ca7378079b19a45437bdd3?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
    },
  ];

  const statistics = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b16e9dc762a82199df0cb90d9855aeed0816cc2bd5e7e8ea9b105c653f0486d?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
      label: "Total Strength",
      value: "32",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7bc5ccf5f2b22bb4aa7c7e775615bd1b4a10e0478076895c7403f36c04d28d09?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
      label: "Present",
      value: "30",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/70aa70c95a8ddbe5b66ee111faad9211985db3153f23b6f1767c0da54d275ea9?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
      label: "Absent",
      value: "2",
    },
  ];

  return (

    

    <div>





    

      
      <div className="flex overflow-hidden flex-wrap gap-6 items-end px-4 py-7">
        {selectFields.map((field, index) => (
          <div
            key={index}
            className="flex relative items-start  whitespace-nowrap w-[164px]"
          >
            <div className="flex z-0 gap-5 justify-between rounded items-start px-3.5 pt-6 pb-3 text-sm leading-none bg-white border border-gray-300 border-solid text-neutral-800 w-[164px]">
              <div className="overflow-hidden pr-11 mt-1">{field.value}</div>
              <img
                loading="lazy"
                src={field.icon}
                alt=""
                className="object-contain shrink-0 w-3 aspect-square"
              />
            </div>
            <div className="overflow-hidden absolute pt-3 pr-24 pb-3.5 pl-3 text-base bottom-[15px] left-[-3px] right-[17px] text-neutral-700 top-[-7px] max-md:pr-5">
              {field.label}
            </div>
          </div>
        ))}
        <button
          // onClick={handleGenerateReport}
          className=" py-2.5 px-3 text-sm font-[500]  text-black whitespace-nowrap bg-[#C8EE44] rounded  hover:bg-lime-500"
        >
          Generate Report
        </button>




        <div className="flex gap-2.5 items-center">
          <label className="self-stretch my-auto text-sm font-medium text-gray-800">
            Individual
          </label>

          <div className="flex flex-col self-stretch my-auto rounded-[100px] w-[68px]">
            <div className=" flex flex-col justify-center items-end px-2 py-1.5 bg-lime-300 rounded-[100px]"
           
            >
              <div className="flex shrink-0 w-6 h-6 bg-white border border-solid border-neutral-300 rounded-[100px]" />
            </div>
          </div>

          <label className="self-stretch my-auto text-sm font-medium text-gray-800">
            Class
          </label>

        </div>
      </div>




      <div className="flex flex-wrap gap-12 justify-center border-t border-gray-100">
        {statistics.map((stat, index) => (
          <div
            key={index}
            className="flex gap-3 mt-5 items-center px-3.5 py-4 rounded-lg bg-stone-50 cursor-pointer"
          >
            <img
              loading="lazy"
              src={stat.icon}
              alt=""
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[30px]"
            />
            <div className="flex flex-col justify-center self-stretch my-auto w-[115px]">
              <div className="text-xs text-gray-400 cursor-pointer">
                {stat.label}
              </div>
              <div className="mt-2 text-lg font-bold text-gray-800 cursor-pointer">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-5 ml-3 border-t border-neutral-100">
        <div className="text-blue-900 text-xl mt-6 font-semibold">
          Attendance Sheet
        </div>
        <div className="mt-6 mr-20 text-gray-500">
          <IoMdDownload size={25} />
        </div>
      </div>

      <div className="w-full mt-4 ml-3">
        <div className="flex py-4 text-gray-400 text-sm font-medium">
          <div className="w-1/3">STUDENT NAME</div>
          <div className="w-2/3">ROLL NO</div>
          <div className="w-2/3">ATTENDANCE</div>
          <div className="w-1/5">ACTION</div>
        </div>

        <AttendanceList />
      </div>
    </div>
  );
}

export default DailyStudentAttendance;