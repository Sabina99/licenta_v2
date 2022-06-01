import './Profile.scss';
import Menu from "../../common/menu/Menu";
import { EditOutlined } from "@ant-design/icons";
import {useState} from "react";
import ContainerEdit from "../../common/container/ContainerEdit";

function Profile() {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="profile-container">
      <Menu/>
      <div className="profile-wrapper">
        <div className="cover-image">
        </div>
        <div className="profile-content">
          <div className="edit-title">
            Edit profile
          </div>

          <div className="user-profile">
            {!isShown ?
              (<div className="profile-image"
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}>
              </div>) :
              (<div className="change-image">
                <div className="profile-image" style={{opacity: "0.5"}}
                  onMouseEnter={() => setIsShown(true)}
                  onMouseLeave={() => setIsShown(false)}
                  onClick={() => console.log("change image")}>
                </div>
                <EditOutlined className="edit-icon" onClick={() => console.log("change image")}/>
             </div>)}

            <div className="name-and-followers">
              <div className="name">Sabina Apostol (23)</div>
              <div className="followers">
                <div style={{fontWeight: "bold"}}>234&nbsp;</div>
                followers
              </div>
            </div>
          </div>

          <div className="edit-profile-form">
            <ContainerEdit />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
