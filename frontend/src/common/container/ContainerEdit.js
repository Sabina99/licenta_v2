import './ContainerEdit.scss';
import {Form, Button, Input} from "antd";
import TextArea from "antd/es/input/TextArea";

const ContainerEdit = ({user, editUser}) => {

  return (
    <Form
      name="profile_form"
      onFinish={editUser}
    >
      <Form.Item>
        <div className="input-groups">
          <label htmlFor="full-name">Full name</label>
          <Input
            id="full-name"
            placeholder="Full name"
            type="text"
            defaultValue={user.name}
            className="input-edit"
            onChange={(a) => user.name = a.target.value}
          />

          <label htmlFor="age">Age</label>
          <Input
            id="age"
            placeholder="Age"
            type="text"
            defaultValue={user.age}
            className="input-edit"
            onChange={(a) => user.age = a.target.value}
          />

          <label htmlFor="email">Email</label>
          <Input
            placeholder="Email"
            type="text"
            defaultValue={user.email}
            className="input-edit"
            disabled
          />
        </div>
        <div className="input-groups">
          <label htmlFor="description">Description</label>
          <TextArea
            id="description"
            placeholder="Description"
            type="textarea"
            defaultValue={user.description}
            className="input-edit"
            size="middle"
            onChange={(a) => user.description = a.target.value}
          />
        </div>
      </Form.Item>

      <div className="button-wrapper">
        <Button className="save-button" htmlType="submit">
          Save changes
        </Button>
      </div>
    </Form>
  );
}

export default ContainerEdit;
