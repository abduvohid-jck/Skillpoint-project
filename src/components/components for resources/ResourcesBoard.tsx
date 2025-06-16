import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import SourceIcon from "@mui/icons-material/Source";
import axios from "axios";
import { Link } from "react-router-dom";

function ResourcesBoard() {
  let getResources = async () => {
    let res = await axios.get("https://findcourse.net.uz/api/resources");
    return res;
  };

  let { data: resources } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
  });

  console.log(resources?.data.data);

  return (
    <div>
      <div className="mt-[150px] mobile:mt-[115px]">
        <div className="flex justify-center">
          <button className="bg-[black] text-white p-[10px] rounded-[5px]">
            Add Resource
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-[30px] mt-[65px] mobile:mt-[50px] mb-[65px] mobile:mb-[50px]">
          {resources?.data.data.map((resource: any) => {
            return (
              <Card
                sx={{
                  maxWidth: 345,
                }}
                key={resource.id}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`${resource.image}`}
                  alt="not found"
                  sx={{ width: "384px", height: "192px" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <div className="flex items-center gap-[10px]">
                      <SourceIcon /> Resource
                    </div>
                  </Typography>
                  <p>{resource.name}</p>

                  <p className="mt-[10px]">by {resource.user.firstName}</p>
                  <p className="mt-[10px]">{resource.description}</p>
                  <p className="mt-[10px]">
                    {new Date(resource.createdAt).toLocaleString()}
                  </p>
                  <Link to={resource.media} target="blank">
                    <button className="bg-[black] text-white p-[10px] rounded-[5px] mt-[20px]">
                      Preview
                    </button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ResourcesBoard;
