/*
    This file contain and edit router on navigation bar !!!
*/

import React, { useContext, useState } from 'react';
import { UserOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext);
    console.log('Auth: ', auth);
    const items = [
        {
            label: <Link to={"/"}>Home Page</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        ...(auth?.isAuthenticated ? [{
            label: <Link to={"/user"}>User</Link>,
            key: 'user',
            icon: <UserOutlined />,
        }] : []),
        {
            label: (auth?.isAuthenticated ? `Welcome, ${auth?.user?.email} !!` : "Join us now !!"),
            key: 'SubMenu',
            icon: <LoginOutlined />,
            children: [
                ...(!(auth?.isAuthenticated) ? [
                    { label: <Link to={"/login"}>Login</Link >, key: 'login' },
                    { label: <Link to={"/register"}>Register</Link>, key: 'register' },
                ] : []),

                ...(auth?.isAuthenticated ? [{
                    label: <span onClick={() => {
                        localStorage.removeItem('accessToken');
                        // Update auth context state
                        setAuth({
                            isAuthenticated: false,
                            user: null
                        });
                        setTimeout(() => {
                            window.location.href = '/login';
                        }, 1000);
                    }}>Logout</span>, key: 'logout'
                }] : []),
            ],
        },
    ];

    const [current, setCurrent] = useState('mail');
    const onClick = e => {
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;