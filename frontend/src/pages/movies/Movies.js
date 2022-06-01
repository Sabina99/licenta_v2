import './Movies.scss';
import Menu from "../../common/menu/Menu";
import {Button} from "antd";

function Movies() {
  const onFilter = () => {
    console.log("filter")
  }

  const onSort = () => {
    console.log("sort")
  }

  const onReset = () => {
    console.log("reset")
  }

  return (
    <div className="movies-container">
      <Menu/>
      <div className="movies-wrapper">
        <div className="header">
          <div className="filter-buttons">
            <Button className="button" onClick={onFilter}>Filter by</Button>
            <Button className="button" onClick={onSort}>Sort by</Button>
            <Button className="button" onClick={onReset}>Reset filters</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies;
