import './Friends.scss';
import Menu from "../../common/menu/Menu";
import AutoComplete from "../../common/customAutoComplete/CustomAutoComplete";

function Friends() {

  return (
    <div className="friends-container">
      <Menu/>
      <div className="friends-wrapper">
        <AutoComplete/>
      </div>
    </div>
  );
}

export default Friends;
