import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Hero() {
  let token = localStorage.getItem("token");
  let getMyData = async () => {
    let res = await axios.get("https://findcourse.net.uz/api/users/mydata", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };

  let { data: myData } = useQuery({
    queryKey: ["mydata"],
    queryFn: getMyData,
  });

  if (myData?.data.data.role == "CEO") {
    localStorage.setItem("role", myData?.data.data.role);
  }

  return (
    <div>
      <h1 className="text-center mt-[215px] text-[60px] font-[500] mobile:text-[30px] mobile:mt-[135px]">
        One Search <br /> Infinite Potential
      </h1>
      <p className="text-center mt-[40px] text-[25px] mobile:text-[12.5px] mobile:px-[30px] mobile:mt-[20px]">
        We help students discover the best courses, centers, and learning{" "}
        <br className="mobile:hidden" />
        opportunities worldwide. With expert insights and real student reviews,
        <br className="mobile:hidden" />
        we make your education journey effortless
      </p>
    </div>
  );
}

export default Hero;
