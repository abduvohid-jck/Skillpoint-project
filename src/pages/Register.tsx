import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/photos/logo.svg";
import { useState } from "react";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";

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

function Register() {
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [otp, setOtp] = useState("");
  let [surname, setSurname] = useState("");
  let [email, setEmail] = useState("");
  let [number, setNumber] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("USER");
  let [image, setImage] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function PostRegister() {
    axios
      .post("https://findcourse.net.uz/api/users/register", {
        firstName: name,
        lastName: surname,
        email: email,
        phone: number,
        password: password,
        role: role,
        image: image,
      })
      .then(() => {
        handleOpen();
      })
      .catch((res) => toast.error(res.response.data.message));
  }

  function PostVerifyEmail() {
    axios
      .post("https://findcourse.net.uz/api/users/verify-otp", {
        email: email,
        otp: otp,
      })
      .then(() => {
        navigate("/login");
      })
      .catch((res) => toast.error(res.response.data.message));
  }

  function SendOTP() {
    axios
      .post("https://findcourse.net.uz/api/users/send-otp", {
        email: email,
      })
      .then((res) => toast.success(res.data.message))
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
        <div className=" flex flex-col border-[1px] border-solid border-black rounded-[10px] py-[20px] px-[40px] shadow-[0px_10px_20px_rgba(0,0,0,0.19),0px_6px_6px_rgba(0,0,0,0.23)]">
          <p className="text-center text-[20px] font-[600] pb-[20px]">
            Register
          </p>
          <input
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px]"
            placeholder="Enter your name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px]"
            type="text"
            placeholder="Enter your surname"
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            placeholder="Enter your email"
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px]"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px]"
            placeholder="Enter your phone number"
            type="text"
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px]"
            placeholder="Create password"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="mb-[10px]">Choose your role:</p>
          <select
            name="Role"
            id="Role"
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px]"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="CEO">CEO</option>
            <option value="USER" selected>
              USER
            </option>
          </select>
          <input
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px]"
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(e) => setImage(e.target.value)}
          />
          <button
            onClick={PostRegister}
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] mb-[20px] bg-[black] text-white font-[600]"
          >
            Register
          </button>
          <p className="text-center">
            Already have an account?
            <span className="underline">
              <Link to="/login"> Login</Link>
            </span>
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
            Enter the verification code sent to your email:
          </Typography>
          <input
            className="border-solid border-[1px] border-black outline-none rounded-[5px] p-[5px] w-[100%] mt-[20px] text-center"
            type="text"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={PostVerifyEmail}
            className="w-[100%] bg-[black] text-white mt-[20px] rounded-[5px] p-[5px] font-[600]"
          >
            Verify email
          </button>
          <p className="text-center mt-[25px]">
            Didn't receive code?{" "}
            <span className="underline cursor-pointer" onClick={SendOTP}>
              Resend OTP
            </span>
          </p>
        </Box>
      </Modal>
    </div>
  );
}

export default Register;
