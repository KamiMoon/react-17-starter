import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useHistory } from "react-router-dom";
import {
  postUpdated,
  selectPostById,
  fetchPost,
  updatePost,
} from "redux/slicers/postsSlice";
import { Form, Input, Button } from "antd";
import { unwrapResult } from "@reduxjs/toolkit";

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 22 },
};

interface Match {
  match: {
    params: { postId: string };
  };
}

export const EditPostForm = ({ match }: Match) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { postId } = match.params;

  const post = useAppSelector((state) => selectPostById(state, postId));

  useEffect(() => {
    dispatch(fetchPost({ id: postId }));
  }, [dispatch, postId]);

  const onSavePostClicked = async (values: {
    title: string;
    content: string;
  }) => {
    if (values.title && values.content) {
      try {
        const title = values.title;
        const content = values.content;

        const updateAction = await dispatch(
          updatePost({ id: postId, title, content })
        );
        unwrapResult(updateAction);
        history.push(`/posts/view/${postId}`);
      } catch (err) {
        console.error("Failed to save the post: ", err);
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section>
      <h2>Edit Post</h2>

      {post && (
        <Form
          {...layout}
          name="basic"
          initialValues={{
            title: post.title,
            content: post.content,
            remember: true,
          }}
          onFinish={onSavePostClicked}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Post Title"
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input />
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
      )}
    </section>
  );
};
