import './ContainerLogin.scss';
import {Form, Button, notification} from "antd";
import CustomInput from "../customInput/CustomInput";
import { useDispatch } from "react-redux";
import {login} from "../../actions/auth";
import {useNavigate} from "react-router-dom";

const ContainerLogin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    dispatch(login(formData)).then((data) => {
      if (data?.status === 'success') {
        navigate('/');
      }
    });
  };

  return (
    <div className="container-wrapper">
      <div className="container-header">
        <div className="title title-login">Login</div>
      </div>
      <Form
        name="login_form"
        layout="vertical"
        onFinish={(values) => onSubmit(values)}
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
              // pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
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
        <a href="/forgot-password" className="forgot-password">Forgot password?</a>
        <a href="/register" className="register">Register</a>
      </div>
    </div>
  );
}

export default ContainerLogin;
