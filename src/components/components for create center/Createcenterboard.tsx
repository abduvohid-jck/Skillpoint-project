import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function Createcenterboard() {
  let [name, setName] = useState("");
  let [region, setRegion] = useState("");
  let [address, setAddress] = useState("");
  let [image, setImage] = useState();
  let [number, setNumber] = useState("");
  let [major, setMajor] = useState<string[]>([]);
  let token = localStorage.getItem("token");

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

  function handleMajorChange(value: string) {
    if (major.includes(value)) {
      setMajor(major.filter((item) => item !== value));
    } else {
      setMajor([...major, value]);
    }
  }

  function PostCenter() {
    axios
      .post(
        "https://findcourse.net.uz/api/centers",
        {
          name: name,
          regionId: region,
          address: address,
          image: image,
          majorsId: major,
          phone: number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => toast.success("Center created successfully!"))
      .catch((res) =>
        res.response.data.message
          ? toast.error(res.response.data.message)
          : toast.error(res.response.data.msg)
      );
  }

  return (
    <div className="mt-[100px]">
      <div className="flex justify-center h-[calc(100vh-100px)] mobile:h-[calc(100vh-70px)] items-center">
        <div className="flex flex-col border-[1px] border-solid border-black rounded-[10px] py-[20px] px-[40px] shadow-[0px_10px_20px_rgba(0,0,0,0.19),0px_6px_6px_rgba(0,0,0,0.23)]">
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
          >
            <option value="" selected>
              Select region
            </option>
            {regions?.data.data.map((region: any) => {
              return (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              );
            })}
          </select>

          <input
            placeholder="Enter address"
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px] w-[305.2px]"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            onChange={(e: any) => setImage(e.target.files[0]?.name)}
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px] w-[305.2px]"
            type="file"
            accept="image/*"
          />

          <input
            placeholder="Enter your phone number"
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px] w-[305.2px]"
            type="text"
            onChange={(e) => setNumber(e.target.value)}
          />

          {/* Majors checkboxes */}
          <div className="mb-[20px]">
            <p className="font-[600] mb-[10px]">Select majors:</p>
            {majors?.data.data.map((item: any) => (
              <label key={item.id} className="block mb-[5px]">
                <input
                  type="checkbox"
                  value={item.id}
                  checked={major.includes(item.id)}
                  onChange={() => handleMajorChange(item.id)}
                  className="mr-[10px]"
                />
                {item.name}
              </label>
            ))}
          </div>

          <button
            onClick={PostCenter}
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px] bg-[black] text-white font-[600]"
          >
            Create center
          </button>
        </div>
      </div>
    </div>
  );
}

export default Createcenterboard;
