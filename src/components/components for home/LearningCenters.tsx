import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

function LearningCenters() {
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
    </div>
  );
}

export default LearningCenters;
