import { Button, Input, message, Row, Space, Typography } from "antd";
import { useCreatePostMutation } from "../redux/services/postApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setName, setDescription } from "../redux/slices/postSlice";

function AddPost() {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const newPost = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setDescription(e.target.value));
  };
  const handleAdd = () => {
    if (!newPost.name || !newPost.description) {
      message.error("Name and description are required");
      return;
    }
    createPost(newPost)
      .unwrap()
      .then(() => {
        dispatch(setName(""));
        dispatch(setDescription(""));
        message.success("Post added successfully");
      });
  };
  return (
    <Space direction="vertical">
      <Row>
        <Typography.Title level={4}>Add Post</Typography.Title>
      </Row>
      <Row>
        <Input
          placeholder="Name"
          value={newPost.name}
          onChange={handleNameChange}
        />
      </Row>
      <Row>
        <Input.TextArea
          placeholder="Description"
          value={newPost.description}
          onChange={handleDescriptionChange}
        />
      </Row>
      <Row>
        <Button type="primary" disabled={isLoading} onClick={handleAdd}>
          Add
        </Button>
      </Row>
    </Space>
  );
}

export default AddPost;
