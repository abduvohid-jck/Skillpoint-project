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
import { HowToReg } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Header() {
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
        {["Login", "Register"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text == "Login" ? <LoginIcon /> : <HowToReg />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
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
    <div className="flex justify-between mobile:px-[10px] px-[30px] py-[10px] items-center shadow-lg shadow-[rgba(50,50,105,0.15)]">
      <img className="mobile:w-[60px] w-[80px]" src={Logo} alt="Logo" />
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
          sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          direction="row"
        >
          <Button
            sx={{ border: "1px solid black", color: "black" }}
            variant="outlined"
          >
            Login
          </Button>
          <Button
            sx={{ border: "1px solid black", color: "white" , backgroundColor: "black"}}
            variant="outlined"
          >
            Register
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default Header;
