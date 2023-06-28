import { React, useState } from "react";
// import { Footer } from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SubMenu from "antd/lib/menu/SubMenu";
import { Card, Layout, Menu } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { adminLinks } from "./SidebarConfig";

const { Content, Sider } = Layout;
export const Base = ({ children }) => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const navigateTo = ({ path, title }) => {
    navigate(path);
  };
  const createMenu = (link, index) => {
    // outerStatus = false;
    // verifyAccess(link);
    // if (outerStatus)
    if (link.subLinks) {
      if (link?.access?.includes(currentUser?.role)) {
        return (
          <>
            <SubMenu key={link.title + index} title={link.title}>
              {link.subLinks.map(createMenu)}
            </SubMenu>
          </>
        );
      }
    } else {
      if (link?.access?.includes(currentUser?.role)) {
        return (
          <>
            <Menu.Item
              key={link.title + index}
              title={link.title}
              // icon={<UserOutlined />}
              onClick={() => navigateTo(link)}>
              {link.title}
            </Menu.Item>
          </>
        );
      }
    }
  };
  return (
    <>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}>
          <Card className="m-0 p-0">
            <div>{currentUser?.name}</div>
            Role: <strong>{currentUser?.role}</strong>
          </Card>
          <Menu theme="dark" mode="inline">
            <Menu.Item
              key="back"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}>
              Back
            </Menu.Item>
            {adminLinks.map(createMenu)}
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <Card className="rounded">
              <div className="w-100">
                <main>{children}</main>
              </div>
            </Card>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
