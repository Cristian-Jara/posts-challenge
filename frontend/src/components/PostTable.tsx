import { useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnType } from "antd";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import type { TableProps } from "antd";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "../utils/constants";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  useDeletePostMutation,
  useGetPostsQuery,
} from "../redux/services/postApi";
import { resetFilter, setSearch } from "../redux/slices/filtersSlice";

function PostTable() {
  const filters = useAppSelector((state) => state.filters);
  const { data, isFetching } = useGetPostsQuery("");
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const dispatch = useAppDispatch();
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string
  ) => {
    confirm();
    dispatch(setSearch({ text: selectedKeys[0], column: dataIndex }));
  };

  const handleReset = (
    clearFilters: () => void,
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string
  ) => {
    clearFilters();
    dispatch(resetFilter(dataIndex));
    confirm();
  };

  const getColumnSearchProps = (
    dataIndex: "name" | "description"
  ): TableColumnType<Post> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              clearFilters && handleReset(clearFilters, confirm, dataIndex)
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record: Post) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      filters[dataIndex] ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[filters[dataIndex]]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableProps<Post>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 500,
      render: (description: string) => description || "-",
      ...getColumnSearchProps("description"),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (date: string) => dayjs(date).format(DATE_TIME_FORMAT),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 200,
      render: (date: string) => dayjs(date).format(DATE_TIME_FORMAT),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => deletePost(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={isLoading}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
      width: 100,
    },
  ];

  return (
    <Table
      dataSource={data}
      size="large"
      columns={columns}
      loading={isFetching}
      scroll={{ y: 500 }}
      pagination={false}
      style={{ height: 500 }}
      bordered
    />
  );
}

export default PostTable;
