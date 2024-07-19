import React, { useEffect, useState } from 'react';
import { Descriptions, Button, Switch, Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

const data_employee = [
    {
      key: '1',
      username: 'user',
      password: 'password',
      emp_id: 1,
      dept_id: 1,
      manager_id: 201,
      name: 'John Brown',
      email: 'john.brown@example.com',
      phone: '1234567890',
      address: 'New York No. 1 Lake Park',
      dob: '1990-01-01',
    },
];

export default function Home({dataemployee = data_employee}) {
  const [data, setData] = useState(dataemployee[0]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [employeeid, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [departmentid, setDepartmentId] = useState('');
  const [managerid, setManagerId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (data) {
      setUsername(data.username);
      setEmployeeId(data.emp_id);
      setName(data.name);
      setDepartmentId(data.dept_id);
      setManagerId(data.manager_id);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
      setDob(data.dob);
      setPassword(data.password);
    }
  }, [data]);

  const items = [
    {
      key: '1',
      label: 'Username',
      children: isEditing ? (
        <Input value={username} onChange={(e) => {setIsModified(true); setUsername(e.target.value)}} />
      ) : (
        username
      ),
    },
    {
      key: '2',
      label: 'Password',
      children: isEditing ? (
        <Input.Password
          value={password}
          onChange={(e) => {setIsModified(true); setPassword(e.target.value)}}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      ) : (
        <span>
          {isPasswordVisible ? password : '********'}
          <Button
            type="link"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            icon={isPasswordVisible ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
          />
        </span>
      ),
    },
    {
        key: '3',
        label: '',
    },
    {
      key: '4',
      label: 'Employee Id',
      children: employeeid
    },
    {
        key: '5',
        label: 'Department Id',
        children: departmentid
    },
    {
        key: '6',
        label: 'Manager Id',
        children: managerid
    },
    {
        key: '7',
        label: 'Name',
        children: isEditing ? (
          <Input value={name} onChange={(e) => {setIsModified(true); setName(e.target.value)}} />
        ) : (
          name
        ),
    },
    {
        key: '8',
        label: 'Email',
        children: isEditing ? (
          <Input value={email} onChange={(e) => {setIsModified(true); setEmail(e.target.value)}} />
        ) : (
          email
        ),
    },
    {
        key: '9',
        label: 'Phone',
        children: isEditing ? (
          <Input value={phone} onChange={(e) => {setIsModified(true); setPhone(e.target.value)}} />
        ) : (
          phone
        ),
    },
    {
      key: '10',
      label: 'Address',
      span: 2,
      children: isEditing ? (
        <Input value={address} onChange={(e) => {setIsModified(true); setAddress(e.target.value)}} />
      ) : (
        address
      ),
    },
    {
      key: '11',
      label: 'Date of Birth',
      children: isEditing ? (
        <Input value={dob} onChange={(e) => {setIsModified(true); setDob(e.target.value)}} />
      ) : (
        dob
      ),
    },
  ];

  const isValidUserName = /^[A-Za-z0-9]{4,}$/.test(username);
  const isValidPassword = /^.{4,}$/.test(password);
  const isValidName = /^\S+[A-Za-z ]+$/.test(name);
  const isValidEmail = /\S+@\S+\.\S+/.test(email);
  const isValidPhone = /^\d{10}$/.test(phone);
  const isValidAddress = /^[^\s][\s\S]*$/.test(address);
  const isValidDOB = /^\d{4}-\d{2}-\d{2}$/.test(dob);

  const isFormValid = () => {
    return (
      username!== '' && password!== '' &&
      name!== '' && email!== '' && phone!== '' &&
      address!== '' && dob!== '' &&
      isValidUserName && isValidPassword &&
      isValidName && isValidEmail && isValidPhone &&
      isValidAddress && isValidDOB
    );
  };

  const isFilled = () => {
    return (
        username!== '' && password!== '' &&
        name!== '' && email!== '' && phone!== '' &&
        address!== '' && dob!== ''
      );
  };

  const handleSave = () => {
    if (!isFilled()) {
        setErrorMessage('Please fill in all asterix fields.');
        return;
      }
      if (!isValidUserName) {
        setErrorMessage('Username can contain only numbers and string and must be of minimum length 4');
        return;
      }
      if (!isValidPassword) {
        setErrorMessage('Password length should be minimum 4');
        return;
      }
      if (!isValidName) {
        setErrorMessage('Name should be in text format');
        return;
      }
      if (!isValidEmail) {
        setErrorMessage('Email is of wrong type');
        return;
      }
      if (!isValidPhone) {
        setErrorMessage('Phone must contain 10 numbers');
        return;
      }
      if (!isValidAddress) {
        setErrorMessage('Address is of wrong type');
        return;
      }
      if (!isValidDOB) {
        setErrorMessage('Date of Birth should be of format YYYY-MM-DD');
        return;
      }
    setIsEditing(false);
    setIsModified(false);
    setErrorMessage('');
    console.log('Data saved:', { username, password, employeeid, departmentid, managerid, name, email, phone, address, dob });
  };

  const handleSwitchClick = () => {
    if (isModified) {
      setErrorMessage('Please save your changes before switching modes.');
    } else {
      setIsEditing(!isEditing);
      setErrorMessage('');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ fontSize: '24px', color: 'slate-800', marginRight: '16px' }}>
          Employee Information
        </span>
        <Switch
          checked={isEditing}
          checkedChildren="Edit"
          unCheckedChildren="View"
          onChange={handleSwitchClick}
          //disabled={isModified}
        />
      </div>
      {isEditing && errorMessage && (
            <div className="mb-[15px] text-red-600 text-[15px]" data-testid='errormessage'>
              {errorMessage}
            </div>
          )}
      <Descriptions
        layout="vertical"
        items={items}
      />
      {isEditing && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Button className={`bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none ${!isFormValid() && 'opacity-50 cursor-not-allowed'}`}
              onClick={handleSave} data-testid='save'
              //disabled={!isFormValid()}
              >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}