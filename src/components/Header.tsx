import Logo from "../assets/photos/logo.svg";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import LoginIcon from "@mui/icons-material/Login";
import { AccountCircle, HowToReg } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Header() {
  let token: any = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {(token == null ? ["Login", "Register"] : ["Profile"]).map((text) => (
          <ListItem key={text} disablePadding>
            <Link
              to={
                text == "Register"
                  ? "/register"
                  : text == "Login"
                  ? `/login`
                  : text == "Profile"
                  ? `/profile`
                  : ``
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  {text == "Login" ? (
                    <LoginIcon />
                  ) : text == "Register" ? (
                    <HowToReg />
                  ) : text == "Profile" ? (
                    <AccountCircle />
                  ) : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Close"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CloseIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="flex justify-between mobile:px-[10px] px-[30px] py-[10px] items-center shadow-lg shadow-[rgba(50,50,105,0.15)] fixed w-[100%] top-0 bg-[white] z-[10]">
      <Link to="/">
        <img className="mobile:w-[60px] w-[80px]" src={Logo} alt="Logo" />
      </Link>
      <div className="hidden mobile:block">
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        <SwipeableDrawer
          anchor="right"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </div>
      <div className="mobile:hidden">
        <Stack
          sx={{
            alignItems: "center",
            gap: "10px",
          }}
          direction="row"
        >
          <Link to="/login" className={`${token == null ? "block" : "hidden"}`}>
            <Button
              sx={{ border: "1px solid black", color: "black" }}
              variant="outlined"
            >
              Login
            </Button>
          </Link>

          <Link
            to="/register"
            className={`${token == null ? "block" : "hidden"}`}
          >
            <Button
              sx={{
                border: "1px solid black",
                color: "white",
                backgroundColor: "black",
              }}
              variant="outlined"
            >
              Register
            </Button>
          </Link>
          <Link
            to="/profile"
            className={`${token == null ? "hidden" : "block"}`}
          >
            <Button
              sx={{
                border: "1px solid black",
                color: "black",
                backgroundColor: "white",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
              variant="outlined"
            >
              <AccountCircle />
              Profile
            </Button>
          </Link>
        </Stack>
      </div>
    </div>
  );
}

export default Header;
