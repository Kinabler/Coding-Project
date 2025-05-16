/*
    This file is used to develop frontend for Login Page and Add JWT access Token !!!!
*/

import React, { useEffect, useContext } from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';

import { loginUserApi } from '../util/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';


const LoginPage = () => {
    // Using useNavigate hook from react-router-dom to navigate to different routes
    const navigation = useNavigate();
    // Using useContext to access the AuthContext
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        // configure notification if you decide to use it
        notification.config({
            placement: 'topRight',
            duration: 4,
            maxCount: 3,
        });
    }, []);

    const onFinish = async (values) => {
        const { email, password } = values;
        const res = await loginUserApi(email, password);
        console.log('Response: ', res);
        // Check if response indicates success
        if (!res.message.EC) {
            // Save token to local storage
            localStorage.setItem("accessToken", res.message.accessToken);
            // Use notification for success 
            notification.success({
                message: 'Login Successful',
                description: 'You have successfully logged in!',
            });
            setAuth({
                isAuthenticated: true,
                user: {
                    email: res?.message?.user?.email ?? "",
                    username: res?.message?.user?.username ?? "",
                },
            })

            // Add a delay before navigation to allow notification to be seen
            setTimeout(() => {
                navigation('/');
            }, 2000);
        } else {
            // Use notification for error
            notification.error({
                message: 'Login Failed',
                description: res?.message?.EM ?? "Error occurred during login",
            })
        }
    };

    // Added missing onFinishFailed function
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error({
            content: 'Please check your form inputs',
            style: {
                marginTop: '50px',
            },
        });
    };

    return (
        <div>
            <h1>Login page</h1>
            <div className="login-form" style={{ paddingTop: "40px" }}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 400 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" label={null}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    )
}

export default LoginPage;