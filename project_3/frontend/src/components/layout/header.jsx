/*
    This file contain and edit router on navigation bar !!!
*/

import React, { useState } from 'react';
import { UserOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Header = () => {
    const items = [
        {
            label: <Link to={"/"}>Home Page</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/user"}>User</Link>,
            key: 'user',
            icon: <UserOutlined />,
        },
        {
            label: 'Login',
            key: 'SubMenu',
            icon: <LoginOutlined />,
            children: [
                { label: <Link to={"/login"}>Login</Link >, key: 'login' },
                { label: <Link to={"/register"}>Register</Link>, key: 'register' },
                { label: 'Logout', key: 'logout' },
            ],
        },
    ]

    const [current, setCurrent] = useState('mail');
    const onClick = e => {
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;