import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';

import { createUserApi } from '../util/api';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    // Using useNavigate hook from react-router-dom to navigate to different routes
    const navigation = useNavigate();

    useEffect(() => {
        // configure notification if you decide to use it
        notification.config({
            placement: 'topRight',
            duration: 4,
            maxCount: 3,
        });
    }, []);

    const onFinish = async (values) => {
        const { email, username, password } = values;
        const res = await createUserApi(username, email, password);
        // Check if response indicates success
        if (res.message._id) {
            // Use notification for success 
            notification.success({
                message: 'Registration Successful',
                description: 'Your account has been created successfully',
            });
            // Add a delay before navigation to allow notification to be seen
            setTimeout(() => {
                navigation('/login');
            }, 2000);
        } else {
            const errorMessage = typeof res.message === 'string' ? res.message : 'Registration failed. Please try again.';
            // Use notification for errors too
            notification.error({
                message: 'Registration Failed',
                description: errorMessage,
            });
        }
        console.log('>> ', res);
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
            <h1>Register page</h1>
            <div className="register-form" style={{ paddingTop: "40px" }}>
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
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
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
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    )
}

export default RegisterPage;