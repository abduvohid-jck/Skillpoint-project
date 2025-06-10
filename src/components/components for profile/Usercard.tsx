// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const getMydata = async () => {
//   const res = await axios.get("https://findcourse.net.uz/api/users/mydata");
//   console.log(res.data);
//   return res.data.data;
// };

function Usercard() {
//   const { data } = useQuery({
//     queryKey: ["data"],
//     queryFn: getMydata,
//   });
  return (
    <div>
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="p-[10px] w-[500px] border-[1px] border-solid border-black rounded-[10px] shadow-[0px_10px_20px_rgba(0,0,0,0.19),0px_6px_6px_rgba(0,0,0,0.23)]"></div>
      </div>
    </div>
  );
}

export default Usercard;
