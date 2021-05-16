import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useHistory } from "react-router-dom";

import {
  postUpdated,
  selectPostById,
  fetchPost,
} from "../../redux/slicers/postsSlice";

import { Form, Input, Button } from "antd";

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 22 },
};

export const EditPostForm = ({ match }: any) => {
  const { postId } = match.params;

  const post = useAppSelector((state: any) => selectPostById(state, postId));

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchPost({ id: postId }));
  }, [dispatch, postId]);

  const onSavePostClicked = (values: any) => {
    if (values.title && values.content) {
      const title = values.title;
      const content = values.content;

      dispatch(postUpdated({ id: postId, title, content }));
      history.push(`/posts/view/${postId}`);
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
