import './Profile.scss';
import Menu from "../../common/menu/Menu";
import { EditOutlined } from "@ant-design/icons";
import {useState} from "react";
import ContainerEdit from "../../common/container/ContainerEdit";
import {useDispatch, useSelector} from "react-redux";
import {API_BASE_URL} from "../../env";
import {edit, getUser} from "../../actions/auth";

function Profile() {
  const [isShown, setIsShown] = useState(false);
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let myUser = user?.user

  let backgroundImage = API_BASE_URL.replace('/api', '') + myUser?.image;
  if (!myUser?.image) {
    backgroundImage = "../../../images/default-profile-picture.jpg"
  }

  const changeProfileImage = (event) => {
      myUser.new_image = event.target.files[0];

      editUser()
  }

  const editUser = () => dispatch(edit(myUser)).then(() => dispatch(getUser()))

  return (
    <div className="profile-container">
      <Menu/>
      <div className="profile-wrapper">
        <div className="cover-image">
        </div>
        {
          myUser &&
          <div className="profile-content">
            <div className="edit-title">
              Edit profile
            </div>

            <div className="user-profile">
              {!isShown ?
                ( <div className="profile-image"
                  style={{backgroundImage: `url(${backgroundImage})`}}
                  onMouseEnter={() => setIsShown(true)}
                  onMouseLeave={() => setIsShown(false)}
                />) :
                (<div className="change-image">
                  <input
                    id="profileImageInput"
                    type="file"
                    name="myImage"
                    onChange={changeProfileImage}
                    hidden
                  />
                  <label className="profile-image" style={{backgroundImage: `url(${backgroundImage})`, opacity: "0.5"}}
                       onMouseEnter={() => setIsShown(true)}
                       onMouseLeave={() => setIsShown(false)}
                       htmlFor="profileImageInput"
                  >
                  </label>
                  <EditOutlined className="edit-icon"/>
                </div>)}

              <div className="name-and-followers">
                <div className="name">{myUser.name} ({myUser.age})</div>
                <div className="followers">
                  <div style={{fontWeight: "bold"}}>{myUser.followers}&nbsp;</div>
                  followers
                </div>
              </div>
            </div>

            <div className="edit-profile-form">
              <ContainerEdit user={myUser} editUser={editUser}/>
            </div>

          </div>
        }
      </div>
    </div>
  );
}

export default Profile;
