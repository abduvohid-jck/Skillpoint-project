import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BookIcon from "@mui/icons-material/Book";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { toast } from "react-toastify";

function Appointmentsarea() {
  let token = localStorage.getItem("token");

  function DeleteAppointment(id: any) {
    axios
      .delete(`https://findcourse.net.uz/api/reseption/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Deleted successfully"), refetch();
      })
      .catch((res) =>
        res?.response.message
          ? toast.error(res.response.message)
          : toast.error(res.response.msg)
      );
  }

  let getAppointments = async () => {
    let res = await axios.get("https://findcourse.net.uz/api/users/mydata", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };

  let { data: appointments, refetch } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  return (
    <div>
      <div className="mt-[150px] mobile:mt-[55px]">
        <div className="mx-auto w-[45%] mobile:w-[80%] flex justify-center gap-[10px]">
          <div className="w-[100%]"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-[30px] mt-[65px] mobile:mt-[50px] mb-[65px] mobile:mb-[50px]">
          {appointments?.data.data.receptions.length == 0 ? (
            <p className="h-[24vh] flex justify-center items-center">You don't have any appointments yet</p>
          ) : (
            appointments?.data.data.receptions.map((appointment: any) => (
              <Card
                sx={{
                  maxWidth: 345,
                }}
                key={appointment.id}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://findcourse.net.uz/api/image/${appointment.center.image}`}
                  alt="not found"
                  sx={{ width: "384px", height: "192px" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {appointment.center.name.length > 19
                      ? appointment.center.name.slice(0, 19) + "..."
                      : appointment.center.name}
                  </Typography>
                  <div className="flex items-center gap-[5px]">
                    <LocationOnIcon /> <p>Address:</p>
                    <p>{appointment.center.address}</p>
                  </div>
                  <div className="flex items-center mt-[20px] gap-[5px]">
                    <DateRangeIcon />
                    <p>Visit date:</p>
                    <p>{new Date(appointment.visitDate).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center mt-[20px] gap-[5px]">
                    <BookIcon />
                    <p>Major:</p>
                    <p>{appointment.major.name}</p>
                  </div>
                  <div className="flex items-center mt-[20px] gap-[5px]">
                    <BookmarkBorderIcon />
                    <p>{appointment.status}</p>
                  </div>
                  <button
                    className="mt-[10px] border-[1px] border-solid border-black p-[5px] rounded-[5px]"
                    onClick={() => DeleteAppointment(appointment.id)}
                  >
                    Delete
                  </button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointmentsarea;
