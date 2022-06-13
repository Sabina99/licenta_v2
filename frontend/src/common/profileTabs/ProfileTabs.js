import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './ProfileTabs.scss';
import {useSelector} from "react-redux";
import React from "react";
import RatingsTab from "../ratingsTab/RatingsTab";
import FollowingTab from "../followingTab/FollowingTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function extraProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ProfileTabs() {
  const {friend} = useSelector((state) => state.friends);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className="profile-tabs-wrapper">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Ratings" {...extraProps(0)} />
          <Tab label="Following" {...extraProps(1)} />
          <Tab label="Liked movies" {...extraProps(2)} />
          <Tab label="Disliked movies" {...extraProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <RatingsTab movies={friend.user_movies} showRating={true}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FollowingTab users={friend.following} changeUser={() => setValue(0)}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RatingsTab movies={friend.user_movies.filter((el) => el.is_liked === 1)}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RatingsTab movies={friend.user_movies.filter((el) => el.is_liked === 0)}/>
      </TabPanel>
    </Box>
  );
}

export default ProfileTabs;