import "./index.css";
import Timeline from "../../components/Timeline";
import { getGiteeCommitRecord, getGithubCommitRecord } from "../../api/api";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button, Form, Input, Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { postFriendshipLinks, getFriendshipLinks } from "@/api/api";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Message = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [friendshipLinksDataList, setFriendshipLinksDataList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "已收到您的申请，请耐心等候～",
    });
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
    let res = await postFriendshipLinks(values);
    if (res.message === "添加成功") {
      setIsDisabled(true);
      success();
    }
  };
  useEffect(() => {
    async function getGiteeCommitRecordData() {
      try {
        // let data = await getGiteeCommitRecord();
        let data = await getGithubCommitRecord();
        const now = dayjs().valueOf();

        const formattedData = data.map((item) => {
          const timeValue = dayjs(item.commit.committer.date).valueOf();
          let timeDiff = now - timeValue;
          let formattedTime;

          if (timeDiff >= 7 * 24 * 60 * 60 * 1000) {
            formattedTime = dayjs(timeValue).format("YYYY-MM-DD");
          } else if (timeDiff >= 24 * 60 * 60 * 1000) {
            formattedTime = `${Math.floor(
              timeDiff / (24 * 60 * 60 * 1000)
            )}天前`;
          } else if (timeDiff >= 60 * 60 * 1000) {
            formattedTime = `${Math.floor(timeDiff / (60 * 60 * 1000))}小时前`;
          } else {
            formattedTime = dayjs(timeValue).format("HH:mm:ss");
          }

          return {
            label: formattedTime,
            children: item.commit.message,
          };
        });

        setDataList(formattedData);
      } catch (error) {
        console.error("Error fetching commit data:", error);
      }
    }
    getGiteeCommitRecordData();
  }, []);
  useEffect(() => {
    async function getFriendshipLinksData() {
      try {
        let data = await getFriendshipLinks();
        setFriendshipLinksDataList(data);
      } catch (error) {
        console.error("Error fetching commit data:", error);
      }
    }
    getFriendshipLinksData();
  }, []);

  return (
    <>
      {" "}
      {contextHolder}
      <div className="massage">
        <div className="massage-title">
          <span className="title-h1">Friendship Links / 友情链接</span>
          <br />
          <strong>MOON和他互联网的小伙伴们。</strong>
          <p>MOON And His Internet Friends.</p>
        </div>

        <div className="linksDiv">
          <h4># 已链接的小伙伴</h4>
          <div className="linksContent">
            {friendshipLinksDataList &&
              friendshipLinksDataList.map((item, index) =>
                item.isshow == true ? (
                  <div key={index}>
                    <Link
                      target="_blank"
                      to={item.address}
                      className="project-link"
                    >
                      <div className="links-item">
                        <Avatar
                          className="links-item-Avatar"
                          size={50}
                          icon={<UserOutlined />}
                          src={item.avatar}
                        />
                        <div className="links-item-text">
                          <strong className="links-item-name">
                            {item.name}
                          </strong>
                          <span className="links-item-description">
                            {item.description}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ) : null
              )}
          </div>

          <h4>友链申请</h4>
          <div>
            <Form
              name="basic"
              labelCol={{
                span: 12,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              clearOnDestroy={true}
            >
              <Form.Item
                label="网站名称"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "请填写网站名称!",
                  },
                ]}
              >
                <Input placeholder="MOON!" />
              </Form.Item>
              <Form.Item
                label="网站地址"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "请填写网站地址!",
                  },
                ]}
              >
                <Input placeholder="http://blog.lsltest.top" />
              </Form.Item>
              <Form.Item
                label="网站描述"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "请填写网站描述!",
                  },
                ]}
              >
                <Input placeholder="一个建立于21世纪的小站，存活于互联网的边缘" />
              </Form.Item>
              <Form.Item
                label="网站头像"
                name="avatar"
                rules={[
                  {
                    required: true,
                    message: "请填写网站头像地址!",
                  },
                ]}
              >
                <Input placeholder="https://foruda.gitee.com/avatar/1685169625021300383/9133927_lsl1201_1685169624.png" />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 12,
                  span: 16,
                }}
              >
                <Button disabled={isDisabled} type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="commit-list">
            <h4>网站更新记录</h4>
            <Timeline data={dataList} />
          </div>
        </div>
        <div style={{ height: "250px" }}></div>
      </div>
    </>
  );
};

export default Message;
