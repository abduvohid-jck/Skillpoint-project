import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const getCenters = async () => {
  const res = await axios.get("https://findcourse.net.uz/api/centers");
  return res.data.data;
};

function LearningCenters() {
  const { data } = useQuery({
    queryKey: ["centers"],
    queryFn: getCenters,
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
            label="Outlined"
            variant="outlined"
          />
        </div>

        <Button
          sx={{
            border: "1px solid black",
            color: "white",
            backgroundColor: "black",
          }}
          variant="outlined"
        >
          <SearchIcon />
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-[30px] mt-[65px] mobile:mt-[50px] mb-[65px] mobile:mb-[50px]">
        {data?.map((center: any) => (
          <Card sx={{ maxWidth: 345 }} key={center.id}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={`https://findcourse.net.uz/api/image/${center.image}`}
                alt="green iguana"
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
        ))}
      </div>
    </div>
  );
}

export default LearningCenters;
