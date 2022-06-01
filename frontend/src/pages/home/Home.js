import './Home.scss';
import Menu from "../../common/menu/Menu";
import React from "react";
import CustomSearch from "../../common/customSearch/CustomSearch";

function Home() {

  return (
    <div className="home-container">
      <Menu/>
      <div className="home-wrapper">
        <CustomSearch
          onChange={(el) => console.log('s', el)}
          placeholder="Search movie or user"
        />
      </div>
    </div>
  );
}

export default Home;
