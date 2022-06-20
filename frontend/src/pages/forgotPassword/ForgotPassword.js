import './ForgotPassword.scss';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {forgotPassword} from "../../actions/auth";
import {Button, Form} from "antd";
import CustomInput from "../../common/customInput/CustomInput";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (formData) => {
    dispatch(forgotPassword(formData)).then((data) => {
      if (data?.status === 'success') {
        navigate('/login');
      }
    });
  };

  return (
    <div className="forgot-password login-container">
      <div className="container-wrapper">
        <div className="container-header">
          <div className="title title-register">Forgot password</div>
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

          <Button
            className="submit-button-register"
            id="register"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
        <div className="container-footer-register">
          <a href="/register" className="register">Register</a>

          <a href="/login" className="login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
