import './ResetPassword.scss';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {resetPassword} from "../../actions/auth";
import {Button, Form, notification} from "antd";
import CustomInput from "../../common/customInput/CustomInput";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search)

  const onSubmit = (formData) => {

    dispatch(resetPassword({...formData, token: params.get('token')})).then((data) => {
      if (data?.message === 'Invalid token!') {
        notification.error({
          description: data?.message,
          placement: 'top',
        });
      } else {
        notification.success({
          description: data?.message,
          placement: 'top',
        });

        navigate('/login');
      }
    });
  };

  return (
    <div className="forgot-password login-container">
      <div className="container-wrapper">
        <div className="container-header">
          <div className="title title-register">Reset password</div>
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
              label="New password"
              placeholder="New password"
              name="password"
              passField={true}
            />

          </Form.Item>
          <Form.Item
            name="password_confirmation"
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
              name="password_confirmation"
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

export default ResetPassword;
