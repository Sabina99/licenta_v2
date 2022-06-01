import './ContainerEdit.scss';
import {Form, Button, Input} from "antd";
import CustomInput from "../customInput/CustomInput";
import TextArea from "antd/es/input/TextArea";

const ContainerEdit = () => {
  const user = {};
  return (
    <Form
      name="profile_form"
      onFinish={(values) => console.log(values)}
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
          />

          <label htmlFor="age">Age</label>
          <Input
            id="age"
            placeholder="Age"
            type="text"
            defaultValue={user.age}
            className="input-edit"
          />

          <label htmlFor="email">Email</label>
          <Input
            placeholder="Email"
            type="text"
            defaultValue={user.email}
            className="input-edit"
          />
        </div>
        <div className="input-groups">
          <label htmlFor="description">Description</label>
          <TextArea
            id="description"
            placeholder="Description"
            type="textarea"
            defaultValue={user.textarea}
            className="input-edit"
            size="middle"
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
