import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { screen, fireEvent } from '@testing-library/react';
import { notification } from 'antd';

const DepartmentAdd = ({refreshTable}) => {
  const [departmentname, setdepartmentname] = useState('');
  //const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isValiddepartmentname = /^\S+[A-Za-z ]+$/.test(departmentname);
  //const isValidCode = /^\d+$/.test(code);


  const isFormValid = () => {
    return (
      departmentname !== '' &&
      //code !== '' &&
      isValiddepartmentname //&& isValidCode
    );

  };

  const isFilled = () => {
    return (
      departmentname !== '' //&&
      //code !== ''
    );

  };

  const handleSave = async () => {
    if (!isFilled()) {
      setErrorMessage('Please fill in all asterix fields.');
      return;
    }
    if (!isValiddepartmentname) {
      setErrorMessage('Department Name should be in text format');
        return;
    }
    // if (!isValidCode) {
    //   setErrorMessage('Code should be numeric');
    //     return;
    // }
    
    const departmentData = {
      //code,
      Dept_Name: departmentname,
    };

    try {
      const response = await fetch('http://localhost:9036/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(departmentData),
      });
  
      if (response.ok) {
        console.log('Department added successfully');
        notification.success({
          message: 'Success',
          description: 'Department added successfully',
          placement: 'topRight',
          duration: 3,
        });
        // Clear the form
        setdepartmentname('');
        setErrorMessage('');
        const closeButton = screen.getByTestId('close');
        fireEvent.click(closeButton);
        refreshTable();
      } else {
        console.error('Error adding department:', response.statusText);
        notification.error({
          message: 'Error',
          description: 'Error adding department',
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

    // console.log('Department Data:', departmentData);

    // setdepartmentname('');
    // //setCode('');
    // setErrorMessage('');
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-indigo11 shadow-blueA4 hover:bg-violet3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-blue focus:outline-none" data-testid='adddepartment'>
          Add Department
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">
          <Dialog.Title className="text-violet12 m-0 text-[17px] font-medium" data-testid='adddepartmenttitle'>
            Add Department
          </Dialog.Title>
          <Dialog.Description className="text-violet12 mt-[10px] mb-5 text-[15px] leading-normal">
            Add department details. Click save when you're done.
          </Dialog.Description>
          {errorMessage && (
            <div className="mb-[15px] text-red-600 text-[15px]" data-testid='errormessage'>
              {errorMessage}
            </div>
          )}
          {/* <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-indigo11 w-[90px] text-right text-[15px]">
              Code<span className="text-red-600">*</span>
            </label>
            <input
              className="text-indigo11 shadow-indigo7 focus:shadow-indigo8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              data-testid='codelabel'
            />
          </fieldset> */}
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-indigo11 w-[90px] text-right text-[14px]">
              Department Name<span className="text-red-600">*</span>
            </label>
            <input
              className="text-indigo11 shadow-indigo7 focus:shadow-indigo8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="departmentname"
              value={departmentname}
              onChange={(e) => setdepartmentname(e.target.value)}
              data-testid='departmentnamelabel'
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

export default DepartmentAdd;
