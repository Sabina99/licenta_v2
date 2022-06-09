import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './ProfileTabs.scss';
import {useSelector} from "react-redux";

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
        {friend.user_movies.map((el) => (
          <div key={el.id} className="item">
            <div className="image" style={{backgroundImage: `url(${el.movie.image})`}}></div>
            <div className="details-wrapper">
              <div className="details">
                <div className="name">{el.movie.title}</div>
                <div className="rating">Rating: {el.rating}</div>
                {/*<div className="sub-name">Followed by: {follow.followers.length} people</div>*/}
              </div>
              {/*<div className="close-btn" onClick={() => onRemoveFriend(follow.id)}><PersonRemoveIcon/></div>*/}
            </div>
          </div>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item 4
      </TabPanel>
    </Box>
  );
}

export default ProfileTabs;