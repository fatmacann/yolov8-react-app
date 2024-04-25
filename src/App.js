import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MenuFoldOutlined,
  LoginOutlined,
  HomeOutlined,
  VideoCameraAddOutlined,
  
} from '@ant-design/icons';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import YoloPage from './YoloPage';
import './styles/App.css'; 


const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    
    <Router>
      <Layout>
        <Header className="header-style">
          <div className="logo-style">
            SmartSightAI
          </div>
        </Header>

        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: '1',
                  icon: <HomeOutlined />,
                  label: <Link to="/">Home</Link>,
                },
                {
                  key: '2',
                  icon: <VideoCameraAddOutlined />,
                  label: <Link to="/yolo">AI</Link>,
                },
                {
                  key: '3',
                  icon: <LoginOutlined />,
                  label: <Link to="/login">Login</Link>,
                },
                {
                  key: '4',
                  icon: <MenuFoldOutlined />,
                  label: <Link to="/register">Register</Link>,
                },
              ]}
            />
          </Sider>
          <Content className="content-style">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/yolo" element={<YoloPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
