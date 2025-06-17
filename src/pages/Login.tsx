import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/photos/logo.svg";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function Login() {
  let navigate = useNavigate();
  let [emailForOtp, setEmailForOtp] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const handleSecondOpen = () => setSecondOpen(true);
  const handleSecondClose = () => setSecondOpen(false);
  let [otp, setOtp] = useState("");
  let [newPassword, setNewpassword] = useState("");

  function ResetPassword() {
    axios
      .post("https://findcourse.net.uz/api/users/reset-password", {
        email: emailForOtp,
        otp: otp,
        newPassword: newPassword,
      })
      .then((res) => {
        toast.success(res.data.message);
        handleClose();
      })
      .catch((res) => toast.error(res.response.data.message));
  }

  function SendOtp() {
    axios
      .post("https://findcourse.net.uz/api/users/send-otp", {
        email: emailForOtp,
      })
      .then(() => {
        handleSecondClose(), handleOpen();
      })
      .catch((res) => toast.error(res.response.data.message));
  }

  function PostLogin() {
    axios
      .post("https://findcourse.net.uz/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);

        axios
          .get("https://findcourse.net.uz/api/users/mydata", {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
          })
          .then((myDataRes) => {
            let role = myDataRes.data.data.role;
            if (role == "CEO") {
              localStorage.setItem("role", role);
            }

            navigate("/");
            toast.success("Successfully logged in!");
          });
      })
      .catch((res) => toast.error(res.response.data.message));
  }
  return (
    <div className="min-w-[440px]">
      <Link to="/">
        <img
          className="mobile:w-[60px] w-[80px] mt-[10px] ml-[30px]"
          src={Logo}
          alt="Logo"
        />
      </Link>
      <div className="flex justify-center h-[calc(100vh-90px)] mobile:h-[calc(100vh-70px)] items-center">
        <div className="  flex flex-col border-[1px] border-solid border-black rounded-[10px] py-[20px] px-[40px] shadow-[0px_10px_20px_rgba(0,0,0,0.19),0px_6px_6px_rgba(0,0,0,0.23)]">
          <p className="text-center text-[20px] font-[600] pb-[20px]">Login</p>
          <input
            placeholder="Enter your email"
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px] w-[305.2px]"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px]"
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={PostLogin}
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px] bg-[black] text-white font-[600]"
          >
            Login
          </button>
          <p className="text-center mb-[10px]">
            Don't have an account?
            <span className="underline">
              <Link to="/register"> Register</Link>
            </span>
          </p>
          <p
            onClick={handleSecondOpen}
            className="text-center underline cursor-pointer"
          >
            Forgot your password?
          </p>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", fontWeight: "600", fontSize: "15px" }}
          >
            Fill blanks for creating new password:
          </Typography>
          <input
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] w-[100%] mt-[20px] text-center"
            type="text"
            placeholder="Enter the code we sent"
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] w-[100%] mt-[20px] text-center"
            type="text"
            placeholder="Create new password"
            onChange={(e) => setNewpassword(e.target.value)}
          />
          <button
            onClick={ResetPassword}
            className="w-[100%] bg-[black] text-white mt-[20px] rounded-[5px] p-[5px] font-[600]"
          >
            Create new password
          </button>
        </Box>
      </Modal>
      <Modal
        open={secondOpen}
        onClose={handleSecondClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", fontWeight: "600", fontSize: "15px" }}
          >
            We will send special code for recovering your password:
          </Typography>
          <input
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] w-[100%] mt-[20px] text-center"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmailForOtp(e.target.value)}
          />
          <button
            onClick={SendOtp}
            className="w-[100%] bg-[black] text-white mt-[20px] rounded-[5px] p-[5px] font-[600]"
          >
            Send
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default Login;
