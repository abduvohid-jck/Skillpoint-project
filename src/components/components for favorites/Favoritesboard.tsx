import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Typography,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

function Favoritesboard() {
  let token = localStorage.getItem("token");

  const getMyData = async () => {
    let res = await axios.get("https://findcourse.net.uz/api/users/mydata", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };

  const { data: myData, refetch: mydataRefetch } = useQuery({
    queryKey: ["mydata"],
    queryFn: getMyData,
  });

  const getCenters = async () => {
    const res = await axios.get("https://findcourse.net.uz/api/centers");
    return res;
  };

  const { data: centers, refetch: centersRefetch } = useQuery({
    queryKey: ["centers"],
    queryFn: getCenters,
  });

  const DeleteLike = (id: any) => {
    axios
      .delete(`https://findcourse.net.uz/api/liked/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        mydataRefetch();
        centersRefetch();
      })
      .catch((res) =>
        res.response.data.message
          ? toast.error(res.response.data.message)
          : toast.error(res.response.data.msg)
      );
  };

  const favoriteCenters = centers?.data?.data.filter((center: any) =>
    center.likes.some((like: any) =>
      myData?.data.data.likes.some(
        (myLike: any) => myLike.centerId === like.centerId
      )
    )
  );

  return (
    <div className="flex flex-wrap justify-center gap-[30px] mt-[150px] mb-[65px]">
      {favoriteCenters?.length > 0 ? (
        favoriteCenters.map((center: any) => {
          const likeId = myData?.data.data.likes.find(
            (like: any) => like.centerId === center.id
          )?.id;

          return (
            <Card key={center.id} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <div className="absolute">
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked
                    onChange={() => {
                      if (likeId) {
                        DeleteLike(likeId);
                      }
                    }}
                  />
                </div>
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
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
                    <LocalPhoneIcon sx={{ fontSize: "15px" }} /> {center.phone}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })
      ) : (
        <p className="h-[33vh] flex justify-center items-center">
          You don't have any appointments yet
        </p>
      )}
    </div>
  );
}

export default Favoritesboard;
