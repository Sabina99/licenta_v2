import './ContainerLogin.scss';
import { Form, Button } from "antd";
import CustomInput from "../customInput/CustomInput";

const ContainerLogin = () => {

  return (
    <div className="container-wrapper">
      <div className="container-header">
        <div className="title title-login">Login</div>
      </div>
      <Form
        name="login_form"
        layout="vertical"
        onFinish={(values) => console.log(values)}
      >
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
        <Button
          className="submit-button"
          id="login"
          htmlType="submit"
        >
          Login
        </Button>
      </Form>
      <div className="container-footer">
        <a href="/register" className="forgot-password">Forgot password?</a>
        <a href="/register" className="register">Register</a>
      </div>
    </div>
  );
}

export default ContainerLogin;
