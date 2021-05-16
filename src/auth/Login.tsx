import { useState } from "react";

import { useAppDispatch } from "../redux/hooks";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import { login } from "../redux/slicers/authSlice";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";

const Login = () => {
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useAppDispatch();
  const history = useHistory();

  const disabled = addRequestStatus === "pending";

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setAddRequestStatus("pending");
      const resultAction = await dispatch(
        login({ email: values.username, password: values.password })
      );
      unwrapResult(resultAction);
      setAddRequestStatus("idle");
      history.push(`/users`);
    } catch (err) {
      setAddRequestStatus("idle");
      console.log(err);
    }
  };

  return (
    <div id="components-form-demo-normal-login">
      <h2>Login</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={disabled}
          >
            Login
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
