import React, { useState } from 'react';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space, Typography, Button } from 'antd';
import { Navigate } from 'react-router-dom';

const { Title } = Typography;

const LogIn = ({ setAdminLoggedIn, setUserLoggedIn, setUserName }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [passwordcheck, setPasswordCheck] = useState('');
  const [adminloggedIn, setadminLoggedIn] = useState(false);
  const [userloggedIn, setuserLoggedIn] = useState(false);

  // const fetchEmployeesPassword = async (username) => {
  //   try {
  //     const response = await fetch(`http://localhost:9036/employees/${username}/password`);
  //     if (response.ok) {
  //       const password = await response.json();
  //       setPasswordCheck(password);
  //     } else {
  //       console.error('Failed to fetch employees password:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching employees password:', error);
  //   }
  // };

  const fetchEmployeesPassword = async (username) => {
    try {
      const response = await fetch(`http://localhost:9036/employees/${username}/password`);
      if (response.ok) {
        const data = await response.json();
        const passwordFromServer = data.password;
        if (passwordFromServer === password) {
          setUserLoggedIn(true);
          setuserLoggedIn(true);
          setUserName(username);
        } else {
          alert('Wrong username or password');
        }
      } else {
        console.error('Failed to fetch employees password:', response.statusText);
        alert('Wrong username or password');
      }
    } catch (error) {
      console.error('Error fetching employees password:', error);
      alert('Wrong username or password');
    }
  };

  // useEffect(() => {
  //   if (passwordcheck && passwordcheck === password) {
  //     setUserLoggedIn(true);
  //     setuserLoggedIn(true);
  //     setPasswordCheck('');
  //     setUserName(username);
  //   } else if (passwordcheck) {
  //     alert('Wrong username or password');
  //   }
  // }, [passwordcheck, password, setUserLoggedIn, setUserName, username]);

  const imageUrl = 'https://wallpaper.forfun.com/fetch/8f/8f0b1487338dc0820748ada8adba3df7.jpeg?h=1200&r=0.5'
  const handleLogin = async () => {
    if (username === 'admin' && password === 'password') {
      setAdminLoggedIn(true);
      setadminLoggedIn(true);
    } 
    else if (username !== '') {
      parseInt(username);
      fetchEmployeesPassword(username);
      // console.log(passwordcheck);
      // if (passwordcheck === password){
      //   setUserLoggedIn(true);
      //   setuserLoggedIn(true);
      //   setPasswordCheck('');
      //   setUserName(username);
      //   }
      // else {
      //   alert('Wrong username1 or password')
      // }
    } else {
      alert('Wrong username or password');
    }
  };

  if (adminloggedIn) {
    return <Navigate to="/dashboard" />;
  }

  if (userloggedIn) {
    return <Navigate to={`/home/${username}`} />;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', height: '100vh', backgroundColor: 'lightblue' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          maxWidth: '400px',
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <Title level={3} style={{ color: 'darkblue', marginBottom: '20px' }}>
            Enter your credentials
          </Title>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Input
              placeholder="Username"
              suffix={<UserOutlined style={{ color: 'darkblue' }} />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input.Password
              placeholder="Password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="primary" onClick={handleLogin} style={{ width: '100%' }}>Login</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
