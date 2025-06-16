import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

function Createcenterboard() {
  let [name, setName] = useState("");
  let [region, setRegion] = useState("");
  let [address, setAddress] = useState("");
  let [image, setImage] = useState();
  let [number, setNumber] = useState("");
  let [major, setMajor] = useState("");

  let getRegions = async () => {
    let res = await axios.get("https://findcourse.net.uz/api/regions/search");
    return res;
  };

  let { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });

  let getMajors = async () => {
    let res = await axios.get("https://findcourse.net.uz/api/major");
    return res;
  };

  let { data: majors } = useQuery({
    queryKey: ["majors"],
    queryFn: getMajors,
  });

  return (
    <div className="mt-[100px]">
      <div className="flex justify-center h-[calc(100vh-100px)] mobile:h-[calc(100vh-70px)] items-center">
        <div className="  flex flex-col border-[1px] border-solid border-black rounded-[10px] py-[20px] px-[40px] shadow-[0px_10px_20px_rgba(0,0,0,0.19),0px_6px_6px_rgba(0,0,0,0.23)]">
          <p className="text-center text-[20px] font-[600] pb-[20px]">
            Create Learning Center
          </p>
          <input
            placeholder="Center name"
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px] w-[305.2px]"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <select
            onChange={(e) => setRegion(e.target.value)}
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px]"
            name=""
            id=""
          >
            <option value="" selected>
              Select region
            </option>
            {regions?.data.data.map((region: any) => {
              return <option value={region.id}>{region.name}</option>;
            })}
          </select>
          <input
            placeholder="Enter address"
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px] w-[305.2px]"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            onChange={(e: any) => setImage(e.target.value)}
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px] w-[305.2px]"
            type="file"
          />
          <input
            placeholder="Enter your phone number"
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px] w-[305.2px]"
            type="text"
            onChange={(e) => setNumber(e.target.value)}
          />

          <select
            onChange={(e) => setMajor(e.target.value)}
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px]"
            name=""
            id=""
          >
            <option value="">Select major</option>
            {majors?.data.data.map((majors: any) => {
              return <option value={majors.id}>{majors.name}</option>;
            })}
          </select>

          <button className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px] bg-[black] text-white font-[600]">
            Create center
          </button>
        </div>
      </div>
    </div>
  );
}

export default Createcenterboard;
