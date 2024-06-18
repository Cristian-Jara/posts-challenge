import { Col, Row } from "antd";
import { Container } from "./StyledComponents";
import PostTable from "./components/PostTable";
import AddPost from "./components/AddPost";

function App() {
  return (
    <Container>
      <Row gutter={24}>
        <Col span={18} push={1}>
          <PostTable />
        </Col>
        <Col span={4} push={1}>
          <AddPost />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
