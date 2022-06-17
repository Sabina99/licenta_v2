import './MustWatch.scss';
import Menu from "../../common/menu/Menu";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import RecommendedMovies from "../../common/recommendedMovies/RecommendedMovies";
import {useState} from "react";
import ChooseMovie from "../../common/chooseMovie/ChooseMovie";


function MustWatch() {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="must-watch-container">
      <Menu/>
      <div className="must-watch-wrapper">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Get recommended movies" />
              <Tab label="Choose movie to watch with your friends" />
            </Tabs>
          </Box>
          {!value ? <RecommendedMovies value={value} index={0} /> :
            <ChooseMovie value={value} index={1} />
          }
        </Box>
      </div>
    </div>
  );
}

export default MustWatch;
