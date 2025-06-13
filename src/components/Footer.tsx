import Logo from "../assets/photos/logo.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <div className="bg-[black] py-[30px] min-w-[440px]">
      <div className="flex items-center justify-between px-[30px] flex-row-reverse mobile:flex-col-reverse mobile:items-start mobile:gap-[30px]">
        <div className="flex items-center gap-[70px] text-[white] mobile:flex-wrap mobile:items-start mobile:gap-[50px]">
          <div className="flex flex-col gap-[10px]">
            <p className="cursor-pointer">Home</p>
            <p className="cursor-pointer">Learning centers</p>
            <p className="cursor-pointer">About us</p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="cursor-pointer">Contact us</p>
            <p className="cursor-pointer">Comments</p>
            <p className="cursor-pointer">Projects</p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="cursor-pointer">IT</p>
            <p className="cursor-pointer">Math</p>
            <p className="cursor-pointer">Marketing</p>
            <p className="cursor-pointer">SAT</p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="cursor-pointer">English language</p>
            <p className="cursor-pointer">SMM</p>
            <p className="cursor-pointer">Design</p>
            <p className="cursor-pointer">Business</p>
          </div>
        </div>
        <div className="bg-[white] p-[13px] rounded-[100%]">
          <img className="w-[70px] mobile:w-[35px]" src={Logo} alt="logo" />
        </div>
      </div>
      <div className="text-white px-[30px] flex justify-between mt-[50px] mobile:mt-[30px] items-center mobile:flex-col-reverse mobile:gap-[30px]">
        <p>© 2025 Skillpoint. All Rights Reserved</p>
        <div className="flex items-start gap-[13px] mobile:flex-wrap">
          <button className="cursor-pointer">
            <FacebookIcon sx={{ fontSize: "40px" }} />
          </button>
          <button className="cursor-pointer">
            <InstagramIcon sx={{ fontSize: "40px" }} />
          </button>
          <button className="cursor-pointer">
            <TelegramIcon sx={{ fontSize: "40px" }} />
          </button>
          <button className="cursor-pointer">
            <YouTubeIcon sx={{ fontSize: "40px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;