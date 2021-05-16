import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

import { addNewPost } from "../../redux/slicers/postsSlice";
import { selectAllUsers } from "../../redux/slicers/usersSlice";

import { Form, Input, Button, Select } from "antd";
const { Option } = Select;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 22 },
};

export const AddPostForm = () => {
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useAppDispatch();
  const history = useHistory();

  const users = useAppSelector(selectAllUsers);

  const canSave = addRequestStatus === "idle";

  const onSavePostClicked = async (values: any) => {
    if (canSave) {
      try {
        const title = values.title;
        const content = values.content;
        const userId = values.userId;

        setAddRequestStatus("pending");
        const resultAction = await dispatch(
          addNewPost({ title, content, user: userId })
        );
        //required for normal try/catch logic to get the error
        unwrapResult(resultAction);

        history.push(`/`);
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user: any) => (
    <Option key={user.id} value={user.id}>
      {user.name}
    </Option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>

      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onSavePostClicked}
      >
        <Form.Item
          label="Post Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="userId" label="User" rules={[{ required: true }]}>
          <Select>{usersOptions}</Select>
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Please input your content!" }]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};
