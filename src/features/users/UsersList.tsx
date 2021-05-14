import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "../../redux/slicers/usersSlice";

import { Table } from "antd";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string, record: any) => {
      return <Link to={`/users/${record.id}`}>{record.name}</Link>;
    },
  },
];

export const UsersList = () => {
  const users: any = useSelector(selectAllUsers);

  return (
    <section>
      <h2>Users</h2>

      <Table columns={columns} dataSource={users} rowKey="id" />
    </section>
  );
};
