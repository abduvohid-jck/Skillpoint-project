import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Button, Rating } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BookIcon from "@mui/icons-material/Book";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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

function CenterInfo() {
  let { id } = useParams();
  let [rating, setRating] = useState(0);
  let [comment, setComment] = useState("");
  let [star, setStar] = useState<number | null>(5);
  let token = localStorage.getItem("token");
  let [edit, setEdit] = useState(false);
  let [commentId, setCommentId] = useState("");
  let [editComment, setEditComment] = useState("");
  let [editStar, setEditStar] = useState<number | null>(5);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  let [filialId, setFilialId] = useState("");
  let [majorId, setMajorId] = useState("");
  let [date, setDate] = useState("");

  function PostReseption() {
    axios
      .post(
        "https://findcourse.net.uz/api/reseption",
        {
          centerId: id,
          filialId: filialId,
          majorId: majorId,
          visitDate: date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Registered successfully"), setDate(""), handleClose();
      })
      .catch((res) =>
        res.response.data.message
          ? toast.error(res.response.data.message)
          : toast.error(res.response.data.msg)
      );
  }

  function EditComment() {
    axios
      .patch(
        `https://findcourse.net.uz/api/comments/${commentId}`,
        {
          text: editComment,
          star: editStar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Comment edited!");
        setEdit(false);
        refetch();
      })
      .catch((res) =>
        toast.error(
          res.response.data.message
            ? res.response.data.message
            : res.response.data.msg
        )
      );
  }

  function DeleteComment(id: number) {
    axios
      .delete(`https://findcourse.net.uz/api/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message), refetch();
      })
      .catch((res) => toast.error(res.response.data.message));
  }

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

  let getCenterInfo = async () => {
    let res = await axios.get(`https://findcourse.net.uz/api/centers/${id}`);
    return res;
  };

  let { data, refetch } = useQuery({
    queryKey: ["centerinfo"],
    queryFn: getCenterInfo,
  });
  useEffect(() => {
    let rating = data?.data.data.comments.reduce(
      (rate: number, comment: any) => rate + comment.star,
      0
    );
    setRating(rating);
  }, [data]);

  const handleOpen = () => {
    if (data?.data.data.filials.length && data?.data.data.majors.length) {
      setFilialId(data.data.data.filials[0].id);
      setMajorId(data.data.data.majors[0].id);
    }
    setOpen(true);
  };

  let averageRating = (rating / data?.data.data.comments.length).toFixed(1);

  function PostComment() {
    axios
      .post(
        "https://findcourse.net.uz/api/comments",
        {
          text: comment,
          star: star,
          centerId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Comment posted!");
        refetch();
        setStar(5);
        setComment("");
      })
      .catch((res) =>
        toast.error(
          res.response.data.message
            ? res.response.data.message
            : res.response.data.msg
        )
      );
  }

  return (
    <div className="mt-[130px] px-[30px] pb-[30px] min-w-[440px]">
      <div className="w-[100%] overflow-hidden border-[1px] border-solid border-black rounded-[10px] shadow-[0px_10px_20px_rgba(0,0,0,0.19),0px_6px_6px_rgba(0,0,0,0.23)]">
        <div className="flex mobile:flex-col">
          <div className="w-[39%] mobile:w-[100%]">
            <img
              className="w-[562.44px] rounded-br-[10px] h-[256px] object-cover"
              src={`https://findcourse.net.uz/api/image/${data?.data.data.image}`}
              alt="Not found"
            />
            <div className="p-[30px]">
              <p className="text-[25px]">Our Branches</p>
              {data?.data.data.filials.map((filial: any) => {
                return (
                  <Link
                    key={filial.id}
                    to={`/centers/${id}/branches/${filial.id}`}
                  >
                    <div className="text-center mt-[10px] p-[10px] w-[100%] border-[1px] border-solid border-black rounded-[10px] shadow-[0px_10px_20px_rgba(0,0,0,0.19),0px_6px_6px_rgba(0,0,0,0.23)]">
                      <p className="mb-[5px]">{filial.name}</p>
                      <p>{filial.address}</p>
                    </div>
                  </Link>
                );
              })}
              <p className="text-[25px] mt-[30px]">Available Courses</p>
              {data?.data.data.majors.map((major: any) => {
                return (
                  <div
                    key={major.id}
                    className="flex items-center mt-[10px] gap-[10px]"
                  >
                    <BookIcon />
                    <p className="text-[20px]">{major.name}</p>
                  </div>
                );
              })}
              <Button
                onClick={handleOpen}
                sx={{ color: "white", bgcolor: "black", mt: "30px" }}
              >
                Register for the class
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <p className="text-center font-[500] text-[25px]">
                    Register for the class
                  </p>
                  <p className="mt-[10px] mb-[5px] text-center text-[20px] font-[500]">
                    Select branch
                  </p>
                  <select
                    onChange={(e) => setFilialId(e.target.value)}
                    className="w-[100%] border-[1px] border-solid border-[black] outline-none p-[5px] rounded-[5px] text-[20px]"
                    name="filials"
                    id="filials"
                  >
                    {data?.data.data.filials.map((filial: any) => (
                      <option key={filial.id} value={filial.id}>
                        {filial.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-[10px] mb-[5px] text-center text-[20px] font-[500]">
                    Select major:
                  </p>
                  <select
                    onChange={(e) => setMajorId(e.target.value)}
                    className="w-[100%] border-[1px] border-solid border-[black] outline-none p-[5px] rounded-[5px] text-[20px]"
                    name="majors"
                    id="majors"
                  >
                    {data?.data.data.majors.map((major: any) => (
                      <option key={major.id} value={major.id}>
                        {major.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-[10px] mb-[5px] text-center text-[20px] font-[500]">
                    Select date:
                  </p>
                  <input
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className="w-[100%] border-[1px] border-solid border-[black] outline-none p-[5px] rounded-[5px] text-[20px] "
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
                      return PostReseption(), handleClose;
                    }}
                  >
                    Register
                  </Button>
                </Box>
              </Modal>
            </div>
          </div>

          <div className="p-[30px] w-[61%] mobile:w-[100%]">
            <div className="flex items-center justify-between">
              <p className="text-[35px] font-[600]">{data?.data.data.name}</p>
              <div className="flex items-center justify-center">
                {averageRating}
                <StarIcon sx={{ fontSize: "18px" }} />
              </div>
            </div>
            <div className="flex items-center mt-[30px] gap-[10px]">
              <LocationOnIcon sx={{ color: "#4B5563" }} />
              <p className="text-[#4B5563]">{data?.data.data.address}</p>
            </div>
            <div className="flex items-center mt-[30px] gap-[10px]">
              <LocalPhoneIcon sx={{ color: "#4B5563" }} />
              <p className="text-[#4B5563]">{data?.data.data.phone}</p>
            </div>
            <div className="flex items-center mt-[80px] gap-[10px]">
              <ChatBubbleOutlineIcon sx={{ fontSize: "25px" }} />
              <p className="text-[25px]">Comments</p>
            </div>
            <textarea
              className="border-solid border-[#4B5563] outline-none border-[1px] w-[100%] h-[80px] p-[10px] rounded-[10px] mt-[10px] mb-[10px]"
              placeholder="Leave comment..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <p className="mobile:text-[10px]">Give your rate:</p>
                <Rating
                  value={star}
                  onChange={(_, newValue) => setStar(newValue)}
                />
              </div>
              <Button
                onClick={PostComment}
                sx={{ backgroundColor: "black", color: "white" }}
              >
                <p className="mobile:text-[10px]">Post Comment</p>
              </Button>
            </div>
            {data?.data.data.comments.map((comment: any) => {
              return (
                <div
                  key={comment.id}
                  id={comment.id}
                  className="overflow-hidden p-[10px] mt-[20px] border-[1px] border-solid border-black rounded-[10px] shadow-[0px_10px_20px_rgba(0,0,0,0.19),0px_6px_6px_rgba(0,0,0,0.23)]"
                >
                  <div className="flex justify-between mobile:flex-col mobile:gap-[5px]">
                    <div className="flex items-center gap-[5px] mobile:flex-col mobile:items-start">
                      <div className="flex items-center gap-[5px]">
                        <AccountCircleIcon />
                        <p className="font-[500]">{comment.user.firstName}</p>
                        <p className="font-[500]">{comment.user.lastName}</p>
                      </div>

                      <Rating value={comment.star} readOnly />
                    </div>
                    <p>{new Date(comment.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="mt-[30px] mb-[30px]">{comment.text}</p>
                    {myData?.data.data.id == comment.userId ? (
                      <div className="gap-[10px] flex items-center">
                        <button onClick={() => DeleteComment(comment.id)}>
                          <DeleteIcon />
                        </button>
                        <button
                          onClick={() => {
                            setEdit(!edit);
                            setCommentId(comment.id);
                            setEditComment(comment.text);
                          }}
                        >
                          <EditIcon />
                        </button>
                      </div>
                    ) : null}
                  </div>
                  {myData?.data.data.id == comment.userId &&
                  commentId == comment.id &&
                  edit == true ? (
                    edit ? (
                      <div>
                        <div>
                          <textarea
                            className="border-solid border-[#4B5563] outline-none border-[1px] w-[100%] h-[80px] p-[10px] rounded-[10px] mt-[10px] mb-[10px]"
                            name=""
                            id=""
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex gap-[10px] items-center">
                            <Button
                              sx={{
                                color: "black",
                                borderColor: "black",
                                border: "1px",
                                borderStyle: "solid",
                              }}
                              onClick={() => setEdit(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={EditComment}
                              sx={{ bgcolor: "black", color: "white" }}
                            >
                              Save
                            </Button>
                          </div>
                          <Rating
                            value={editStar}
                            onChange={(_, editValue) => setEditStar(editValue)}
                          />
                        </div>
                      </div>
                    ) : null
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CenterInfo;
