import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { addNewPost } from "redux/slicers/postsSlice";
import { fetchUsers, selectAllUsers } from "redux/slicers/usersSlice";
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
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const users = useAppSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const canSave = addRequestStatus === "idle";

  const onSavePostClicked = async (values: {
    title: string;
    content: string;
    userId: string;
  }) => {
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
        setAddRequestStatus("idle");
        history.push(`/`);
      } catch (err) {
        setAddRequestStatus("idle");
        console.error("Failed to save the post: ", err);
      }
    }
  };

  const usersOptions = users.map((user) => (
    <Option key={user.id} value={user.id}>
      {user.firstName}
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
