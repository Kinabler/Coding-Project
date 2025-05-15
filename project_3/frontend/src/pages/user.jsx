/*
    This file is used to develop frontend for User Page !!!!
*/

import React from 'react';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { notification } from 'antd';
import { getUsersApi } from '../util/api';

const UserPage = () => {
    // Fetch data from API in dynamic way
    // Using useState to manage the state of the data
    const [data, setData] = useState([]);

    // Using useEffect to fetch data when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getUsersApi();
            console.log('Response: ', typeof (res));
            // Check if response indicates success
            if (res) {
                setData(res);
            } else {
                notification.error({
                    message: 'Error',
                    description: "Error occurred while fetching users",
                })
            }

        }
        fetchUsers();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            showSorterTooltip: { target: 'full-header' },
            sorter: (a, b) => a._id - b._id,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            showSorterTooltip: { target: 'full-header' },
            sorter: (a, b) => a.email.length - b.email.length,
        },
        {
            title: 'Name',
            dataIndex: 'username',
            showSorterTooltip: { target: 'full-header' },
            sorter: (a, b) => a.username.length - b.username.length,
        },
        {
            title: 'Role',
            dataIndex: 'role',
        }

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <>
            <div className="header" style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "10px" }}>
                <h1>User Page</h1>
            </div >
            {/* Put table in Center */}
            < div className="table-content" style={{ padding: "40px", textAlign: "center" }
            }>
                <Table
                    bordered={true}
                    columns={columns}
                    dataSource={data}
                    onChange={onChange}
                    showSorterTooltip={{ target: 'sorter-icon' }}
                    rowKey="_id"
                />
            </div >
        </>
    )
}

export default UserPage;