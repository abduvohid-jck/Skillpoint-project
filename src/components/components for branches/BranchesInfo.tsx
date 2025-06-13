import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function BranchesInfo() {
  let { id, branchid } = useParams();
  let getCenterInfoB = async () => {
    let res = await axios.get(`https://findcourse.net.uz/api/centers/${id}`);
    return res;
  };

  let { data } = useQuery({
    queryKey: ["centersinfobranch"],
    queryFn: getCenterInfoB,
  });

  let branch = data?.data.data.filials.find(
    (filial: any) => filial.id == branchid
  );

  return (
    <div className="mt-[150px] mb-[50px] px-[300px] mobile:px-[30px] min-w-[440px]">
      <div className="border-[1px] border-solid border-black rounded-[10px] shadow-[0px_10px_20px_rgba(0,0,0,0.19),0px_6px_6px_rgba(0,0,0,0.23)] overflow-hidden">
        <img
          className="w-[500px] h-[400px] m-auto object-contain mobile:h-[300px]"
          src={`https://findcourse.net.uz/api/image/${branch?.image}`}
          alt="Branch photo"
        />
        <div className="p-[30px]">
          <p className="text-[30px] font-[600]">{branch?.name}</p>
          <div className="flex items-center gap-[10px] mt-[20px]">
            <MapIcon />
            <p>{branch?.region.name}</p>
          </div>
          <div className="flex items-center gap-[10px] mt-[20px]">
            <MyLocationIcon />
            <p className="font-[500]">Address:</p>
          </div>
          <p className="mt-[5px]">{branch?.address}</p>
          <div className="flex items-center gap-[10px] mt-[20px]">
            <LocalPhoneIcon />
            <p className="font-[500]">Phone:</p>
          </div>
          <p className="mt-[5px]">{branch?.phone}</p>
          <Link to={`/centers/${id}`}>
            <Button
              sx={{ color: "white", bgcolor: "black", marginTop: "20px" }}
            >
              <div className="flex items-center">
                <ArrowBackIosIcon />
                <p>Back to center</p>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BranchesInfo;
