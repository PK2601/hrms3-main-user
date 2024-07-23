import React, { useState, useEffect, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { Cross2Icon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { screen, fireEvent } from '@testing-library/react';
import { notification } from 'antd';

const EmployeeModify = ({record, refreshTable}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [managerId, setManagerId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [data, setData] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:9036/departments');
      if (response.ok) {
        const departments = await response.json();
        setData(departments);
      } else {
        console.error('Failed to fetch departments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const refreshDeptTable = useCallback(async () => {
    await fetchDepartments();
  }, []);

  useEffect(() => {
    refreshDeptTable();
  }, [refreshDeptTable]);

  const departments = data.map(item => ({
    id: item.dept_id,
    name: item.Dept_Name
  }));

  useEffect(() => {
    if (record) {
      setId(record.emp_id);
      setName(record.name);
      setDepartmentId(record.dept_id);
      if (record.manager_id === null) {
        setManagerId('');
      } else {
        setManagerId(record.manager_id);
      }      
      setEmail(record.email);
      setPhone(record.phone);
      setAddress(record.address);
      setDob(record.dob);
    }
  }, [record]);

  //const isValidId = /^\d+$/.test(id);
  // const isValidName = (name) => {
  //   return name === '' || /^\S+[A-Za-z ]+$/.test(name);
  // };
  // const isValidDepartmentId = (departmentId) => {
  //   return departmentId === '' || /^\d+$/.test(departmentId);
  // };
  // const isValidManagerId = (managerId) => {
  //   return managerId === '' || /^\d+$/.test(managerId);
  // };
  // const isValidEmail = (email) => {
  //   return email === '' || /\S+@\S+\.\S+/.test(email);
  // };
  // const isValidPhone = (phone) => {
  //   return phone === '' || /^\d{10}$/.test(phone);
  // };
  // const isValidAddress = (address) => {
  //   return address === '' || /^[^\s][\s\S]*$/.test(address);
  // };
  // const isValidDOB = (dob) => {
  //   return dob === '' || /^\d{4}-\d{2}-\d{2}$/.test(dob);
  // };
  const isValidName = /^\S+[A-Za-z ]+$/.test(name);
  //const isValidDepartmentId = /^\d+$/.test(departmentId);
  const isValidManagerId = (managerId) => {
    return managerId === '' || /^\d+$/.test(managerId);
  };
  const isValidEmail = /\S+@\S+\.\S+/.test(email);
  const isValidPhone = /^\d{10}$/.test(phone);
  const isValidAddress = /^[^\s][\s\S]*$/.test(address);
  const isValidDOB = /^\d{4}-\d{2}-\d{2}$/.test(dob);

  // const isFormValid = () => {
  //   return (
  //     id !== '' && isValidId &&
  //     isValidName(name) && isValidDepartmentId(departmentId) &&
  //     isValidManagerId(managerId) &&
  //     isValidEmail(email) && isValidPhone(phone) &&
  //     isValidAddress(address) && isValidDOB(dob) &&
  //     (name !== '' || departmentId !== '' ||
  //       email !== '' || phone !== '' ||
  //       address !== '' || dob !== '')
  //   );

  // };
  const isFormValid = () => {
    return (
      name !== '' &&
      //departmentId !== '' &&
      email !== '' &&
      phone !== '' &&
      address !== '' &&
      dob !== '' &&
      isValidName && //isValidDepartmentId &&
      isValidManagerId(managerId) &&
      isValidEmail && isValidPhone &&
      isValidAddress && isValidDOB
    );
  };

  // const isFilled = () => {
  //   return (
  //     id !== '' &&
  //     (name !== '' || departmentId !== '' ||
  //       email !== '' || phone !== '' ||
  //       address !== '' || dob !== '')
  //   );

  // };
  const isFilled = () => {
    return (
      name !== '' &&
      //departmentId !== '' &&
      email !== '' &&
      phone !== '' &&
      address !== '' &&
      dob !== ''
    );
  };

  // const handleSave = () => {
  //   if (!isFilled()) {
  //     setErrorMessage('Please fill in id and one more column');
  //     return;
  //   }
  //   if (!isValidId) {
  //       setErrorMessage('Id should be numeric');
  //         return;
  //     }
  //   if (!isValidName(name)) {
  //     setErrorMessage('Name should be in text format');
  //       return;
  //   }
  //   if (!isValidDepartmentId(departmentId)) {
  //     setErrorMessage('Department Id should be numeric');
  //       return;
  //   }
  //   if (!isValidManagerId(managerId)) {
  //     setErrorMessage('Manager Id should be numeric');
  //       return;
  //   }
  //   if (!isValidEmail(email)) {
  //     setErrorMessage('Email is of wrong type');
  //       return;
  //   }
  //   if (!isValidPhone(phone)) {
  //     setErrorMessage('Phone must contain 10 numbers');
  //       return;
  //   }
  //   if (!isValidAddress(address)) {
  //     setErrorMessage('Address should be in text format');
  //       return;
  //   }
  //   if (!isValidDOB(dob)) {
  //     setErrorMessage('Date of Birth should be of format YYYY-MM-DD');
  //       return;
  //   }
  const handleSave = async () => {
    if (!isFilled()) {
      setErrorMessage('Please fill in all asterix fields.');
      return;
    }
    if (!isValidName) {
      setErrorMessage('Name should be in text format');
      return;
    }
    /*
    if (!isValidDepartmentId) {
      setErrorMessage('Department Id should be numeric');
      return;
    }*/
    if (!isValidManagerId(managerId)) {
      setErrorMessage('Manager Id should be numeric');
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

    const departmentIdInt = parseInt(departmentId);
    const managerIdInt = managerId ? parseInt(managerId) : null;

    const modifiedemployeeData = {
      id,
      name,
      dept_id: departmentIdInt,
      manager_id: managerIdInt,
      email,
      phone: phone.toString(),
      address,
      dob,
    };

    try {
      const response = await fetch(`http://localhost:9036/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedemployeeData),
      });
  
      if (response.ok) {
        console.log('Employee modified successfully');
        notification.success({
          message: 'Success',
          description: 'Employee modified successfully',
          placement: 'topRight',
          duration: 3,
        });
        setId('');
        setName('');
        setDepartmentId('');
        setManagerId('');
        setEmail('');
        setPhone('');
        setAddress('');
        setDob('');
        setErrorMessage('');
        const closeButton = screen.getByTestId('close');
        fireEvent.click(closeButton);
        refreshTable();
      } else {
        console.error('Error modifying employee:', response.statusText);
        notification.error({
          message: 'Error',
          description: 'Error modifying employee',
          placement: 'topRight',
          duration: 3,
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      notification.error({
        message: 'Error',
        description: 'Network error',
        placement: 'topRight',
        duration: 3,
      });
    }

    
  //   const modifiedemployeeData = {
  //     id,
  //     name,
  //     departmentId,
  //     managerId,
  //     email,
  //     phone,
  //     address,
  //     dob,
  //   };

  //   console.log('Modified Employee Data:', modifiedemployeeData);

  //   setId('');
  //   setName('');
  //   setDepartmentId('');
  //   setManagerId('');
  //   setEmail('');
  //   setPhone('');
  //   setAddress('');
  //   setDob('');
  //   setErrorMessage('');
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-indigo11 shadow-blueA4 hover:bg-violet3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-blue focus:outline-none"  data-testid='modifyemployee'>
          Modify
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]" data-testid='modifyemployeetitle'>
          <Dialog.Title className="text-violet12 m-0 text-[17px] font-medium">
            Modify Employee
          </Dialog.Title>
          <Dialog.Description className="text-violet12 mt-[10px] mb-5 text-[15px] leading-normal">
            Modify employee details. Click save when you're done.
          </Dialog.Description>
          {errorMessage && (
            <div className="mb-[15px] text-red-600 text-[15px]" data-testid='errormessage'>
              {errorMessage}
            </div>
          )}
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-indigo11 w-[90px] text-right text-[15px]">
              Name<span className="text-red-600">*</span>
            </label>
            <input
              className="text-indigo11 shadow-indigo7 focus:shadow-indigo8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid='namelabel'
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="text-indigo11 w-[90px] text-right text-[14px]">
              Department Id<span className="text-red-600">*</span>
            </label>
            <Select.Root value={departmentId} onValueChange={setDepartmentId}>
              <Select.Trigger
                className="text-indigo11 shadow-indigo7 focus:shadow-indigo8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                aria-label="Department" data-testid='departmentdropdown'
              >
                <Select.Value placeholder="Select department" />
                <Select.Icon className="text-violet11">
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger >
              <Select.Portal>
                <Select.Content className="z-[200] absolute top-[calc(100% + 10px)] left-0 w-full max-h-[200px] overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] border border-indigo11">
                  <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                    <ChevronUpIcon />
                  </Select.ScrollUpButton>
                <Select.Viewport className="text-indigo11">
                  {departments.map((dept) => (
                    <Select.Item key={dept.id} value={dept.id} className="text-center border-b border-indigo11 last:border-b-0">
                      <Select.ItemText data-testid= 'departmentoption'>{dept.name}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
              </Select.Portal>
            </Select.Root>
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-indigo11 w-[90px] text-right text-[15px]">
              Manager Id
            </label>
            <input
              className="text-indigo11 shadow-indigo7 focus:shadow-indigo8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="managerid"
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
              data-testid='manageridlabel'
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-indigo11 w-[90px] text-right text-[15px]">
              Email<span className="text-red-600">*</span>
            </label>
            <input
              className="text-indigo11 shadow-indigo7 focus:shadow-indigo8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid='emaillabel'
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-indigo11 w-[90px] text-right text-[15px]">
              Phone<span className="text-red-600">*</span>
            </label>
            <input
              className="text-indigo11 shadow-indigo7 focus:shadow-indigo8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              data-testid='phonelabel'
            />
            <span className="text-sm text-indigo11">{phone.length}/10</span>
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-indigo11 w-[90px] text-right text-[15px]">
              Address<span className="text-red-600">*</span>
            </label>
            <input
              className="text-indigo11 shadow-indigo7 focus:shadow-indigo8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              data-testid='addresslabel'
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-indigo11 w-[90px] text-right text-[15px]">
              Date of Birth<span className="text-red-600">*</span>
            </label>
            <input
              className="text-indigo11 shadow-indigo7 focus:shadow-indigo8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              data-testid='doblabel'
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
              <button
                className={`bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none ${!isFormValid() && 'opacity-50 cursor-not-allowed'}`}
                onClick={handleSave} data-testid='save'
                //disabled={!isFormValid()}
              >
                Save
              </button>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-indigo11 hover:bg-indigo4 focus:shadow-indigo7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close" data-testid='close'
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EmployeeModify;

