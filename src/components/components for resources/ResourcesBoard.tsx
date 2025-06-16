import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import SourceIcon from "@mui/icons-material/Source";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "1px solid black",
  boxShadow: 24,
  p: "30px",
  borderRadius: "10px",
};

function ResourcesBoard() {
  let token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    if (categories?.data.data.length > 0) {
      setCategory(categories?.data.data[0].id);
    }
    setOpen(true);
  };
  let [category, setCategory] = useState("");
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [media, setMedia] = useState("");
  let [image, setImage] = useState("");

  console.log(category);
  

  function PostResource() {
    axios
      .post(
        "https://findcourse.net.uz/api/resources",
        {
          categoryId: category,
          name: name,
          description: description,
          media: media,
          image: image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Resource added successfully!");
        refetch();
        handleClose();
        setName("");
        setDescription("");
        setMedia("");
        setImage("");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || error.response.data.msg);
        } else {
          toast.error("Something went wrong!");
        }
      });
  }

  let getResources = async () => {
    let res = await axios.get("https://findcourse.net.uz/api/resources");
    return res;
  };

  let { data: resources, refetch } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
  });

  let getCategories = async () => {
    let res = await axios.get("https://findcourse.net.uz/api/categories");
    return res;
  };

  let { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

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

  function DeleteResource(id: any) {
    axios
      .delete(`https://findcourse.net.uz/api/resources/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success(res.data.message);
        refetch();
      })
      .catch((res) => {
        toast.error(res.response.message);
      });
  }

  return (
    <div>
      <div className="mt-[150px] mobile:mt-[115px]">
        <div className="flex justify-center">
          <button
            onClick={handleOpen}
            className="bg-[black] text-white p-[10px] rounded-[5px]"
          >
            Add Resource
          </button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <p className="text-center font-[500] text-[25px]">
                Add New Resource
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-[100%] border-[1px] border-solid border-[black] outline-none p-[5px] rounded-[5px] text-[20px] mt-[15px]"
                name="filials"
                id="filials"
              >
                {categories?.data.data.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-[100%] border-[1px] border-solid border-[black] outline-none p-[5px] rounded-[5px] text-[20px] mt-[15px]"
                placeholder="Resource name"
              />
              <textarea
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                className="w-[100%] border-[1px] border-solid border-[black] outline-none p-[5px] rounded-[5px] text-[20px] mt-[15px]"
                name="description"
                id="description"
              ></textarea>
              <input
                onChange={(e) => setMedia(e.target.value)}
                type="text"
                className="w-[100%] border-[1px] border-solid border-[black] outline-none p-[5px] rounded-[5px] text-[20px] mt-[15px]"
                placeholder="Media URL"
              />
              <input
                onChange={(e) => setImage(e.target.value)}
                type="text"
                className="w-[100%] border-[1px] border-solid border-[black] outline-none p-[5px] rounded-[5px] text-[20px] mt-[15px]"
                placeholder="Image URL"
              />
              <Button
                sx={{
                  width: "100%",
                  bgcolor: "black",
                  marginTop: "15px",
                  color: "white",
                  fontSize: "15px",
                }}
                onClick={() => {
                  return PostResource(), handleClose;
                }}
              >
                Add Resource
              </Button>
              <Button
                sx={{
                  width: "100%",
                  bgcolor: "black",
                  marginTop: "15px",
                  color: "white",
                  fontSize: "15px",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Modal>
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
                  <div className="flex items-center justify-between">
                    <Link to={resource.media} target="blank">
                      <button className="bg-[black] text-white p-[10px] rounded-[5px] mt-[20px]">
                        Preview
                      </button>
                    </Link>
                    {myData?.data.data.id == resource?.userId ? (
                      <button
                        onClick={() => DeleteResource(resource.id)}
                        className="p-[10px] rounded-[5px] mt-[20px] border-[1px] border-solid border-black"
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
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
