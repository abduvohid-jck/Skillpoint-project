import TextField from "@mui/material/TextField";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const getCenters = async () => {
  const res = await axios.get("https://findcourse.net.uz/api/centers");
  return res;
};

function LearningCenters() {
  let [search, setSearch] = useState("");
  let token = localStorage.getItem("token");

  function DeleteLike(id: any) {
    axios
      .delete(`https://findcourse.net.uz/api/liked/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        refetch();
        mydatarefetch();
      })
      .catch((res) =>
        res.response.data.message
          ? toast.error(res.response.data.message)
          : toast.error(res.response.data.msg)
      );
  }

  function PostLike(id: any) {
    axios
      .post(
        "https://findcourse.net.uz/api/liked",
        {
          centerId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        refetch();
        mydatarefetch();
      })
      .catch((res) =>
        res.response.data.message
          ? toast.error(res.response.data.message)
          : toast.error(res.response.data.msg)
      );
  }

  const { data, refetch } = useQuery({
    queryKey: ["centers"],
    queryFn: getCenters,
  });

  let filteredCenters = data?.data.data.filter((center: any) =>
    center.name.toLowerCase().includes(search.toLowerCase())
  );

  let getMyData = async () => {
    let res = await axios.get("https://findcourse.net.uz/api/users/mydata", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };

  let { data: myData, refetch: mydatarefetch } = useQuery({
    queryKey: ["mydata"],
    queryFn: getMyData,
  });

  return (
    <div className="mt-[190px] mobile:mt-[55px]">
      <div className="mx-auto w-[45%] mobile:w-[80%] flex justify-center gap-[10px]">
        <div className="w-[100%]">
          <TextField
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black",
              },
            }}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-[30px] mt-[65px] mobile:mt-[50px] mb-[65px] mobile:mb-[50px]">
        {filteredCenters == 0 ? (
          <p>Centers not found</p>
        ) : (
          filteredCenters?.map((center: any) => (
            <Card
              sx={{
                maxWidth: 345,
              }}
              key={center.id}
            >
              <CardActionArea>
                <div className="absolute">
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={myData?.data.data.likes.some(
                      (userLikes: any) => userLikes.centerId == center.id
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        PostLike(center.id);
                      } else {
                        const likeId = myData?.data.data.likes.find(
                          (like: any) => like.centerId == center.id
                        )?.id;

                        if (likeId) {
                          DeleteLike(likeId);
                        }
                      }
                    }}
                  />
                </div>
                <Link to={`centers/${center.id}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://findcourse.net.uz/api/image/${center.image}`}
                    alt="not found"
                    sx={{ width: "384px", height: "192px" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {center.name.length > 19
                        ? center.name.slice(0, 19) + "..."
                        : center.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {center.address}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        marginTop: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <LocalPhoneIcon sx={{ fontSize: "15px" }} />{" "}
                      {center.phone}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default LearningCenters;
