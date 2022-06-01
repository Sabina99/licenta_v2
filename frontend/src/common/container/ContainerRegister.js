import './ContainerRegister.scss';
import { Form, Button } from "antd";
import CustomInput from "../customInput/CustomInput";

const ContainerRegister = () => {

  return (
    <div className="container-wrapper">
      <div className="container-header">
        <div className="title title-register">Register</div>
      </div>
      <Form
        name="login_form"
        layout="vertical"
        onFinish={(values) => console.log(values)}
      >
        <Form.Item
          name="name"
        >
          <CustomInput
            label="Name"
            placeholder="Name"
            name="name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Email is not valid!",
            },
            {
              required: true,
              message: "This field is required!",
            }
          ]}
        >
          <CustomInput
            label="Email"
            placeholder="Email"
            name="email"
          />

        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: "Password is not valid!",
            },
            {
              required: true,
              message: "This field is required!",
            }
          ]}
        >
          <CustomInput
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            passField={true}
          />

        </Form.Item>
        <Form.Item
        name="confirm-password"
        rules={[
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: "Password is not valid!",
          },
          {
            required: true,
            message: "This field is required!",
          }
        ]}
      >
        <CustomInput
          type="password"
          label="Confirm password"
          placeholder="Confirm password"
          name="confirm-password"
        />

      </Form.Item>
        <Button
          className="submit-button-register"
          id="register"
          htmlType="submit"
        >
          Register
        </Button>
      </Form>
      <div className="container-footer-register">
        <a href="/login" className="login">Login</a>
      </div>
    </div>
  );
}

export default ContainerRegister;
