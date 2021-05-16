import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import { fetchUsers, selectAllUsers } from "../../redux/slicers/usersSlice";

import { Table } from "antd";

import { User } from "../../models/User";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text: string, record: any) => {
      return <Link to={`/users/${record.id}`}>{record.email}</Link>;
    },
  },
];

export const UsersList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const users: Array<User> = useAppSelector<Array<User>>(selectAllUsers);

  return (
    <section>
      <h2>Users</h2>

      <Table columns={columns} dataSource={users} rowKey="id" />
    </section>
  );
};
