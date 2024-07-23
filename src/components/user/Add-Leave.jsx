import React, { useCallback, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { Cross2Icon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { screen, fireEvent } from '@testing-library/react';

const EmployeeLeaveAdd = ({refreshTable, userid}) => {
  const [leavetypeId, setLeaveTypeId] = useState(1);
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  const fetchLeaveTypes = async () => {
    try {
      const response = await fetch('http://localhost:9036/leavetypes');
      if (response.ok) {
        const leavetypes = await response.json();
        setData(leavetypes);
      } else {
        console.error('Failed to fetch leave types:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching leave types:', error);
    }
  };

  const refreshLeaveTypeTable = useCallback(async () => {
    await fetchLeaveTypes();
  }, []);

  useEffect(() => {
    refreshLeaveTypeTable();
  }, [refreshLeaveTypeTable]);

  const leavetypes = data.map(item => ({
    id: item.leave_type_id,
    name: item.leave_type_name
  }));

  const isValidStartDate = /^\d{4}-\d{2}-\d{2}$/.test(startdate);
  const isValidEndDate = /^\d{4}-\d{2}-\d{2}$/.test(enddate);
  let isValidStartEndDate = false;
    if (isValidStartDate && isValidEndDate) {
    const startDateObj = new Date(startdate);
    const endDateObj = new Date(enddate);
    isValidStartEndDate = endDateObj >= startDateObj;
    }

  const isFormValid = () => {
    return (
      startdate!== '' &&
      enddate !== '' &&
      isValidStartDate && isValidEndDate && isValidStartEndDate
    );
  };

  const isFilled = () => {
    return (
        startdate!== '' &&
        enddate !== ''
    );
  };

  const handleSave = async () => {
    if (!isFilled()) {
      setErrorMessage('Please fill in all asterix fields.');
      return;
    }
    if (!isValidStartDate) {
      setErrorMessage('Start Date should be of format YYYY-MM-DD');
      return;
    }
    if (!isValidEndDate) {
        setErrorMessage('End Date should be of format YYYY-MM-DD');
        return;
    }
    if (!isValidStartEndDate) {
        setErrorMessage('End Date should be greater or equal than the Start Date');
        return;
    }

    const leavetypeIdInt = parseInt(leavetypeId);
    const useridInt = parseInt(userid);

    const employeeleaveData = {
      emp_id: useridInt,
      leave_type_id: leavetypeIdInt,
      start_date: startdate,
      end_date: enddate
    };

    try {
      const response = await fetch(`http://localhost:9036/leaves`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeleaveData),
      });
  
      if (response.ok) {
        console.log('Employee Leave added successfully');
        setLeaveTypeId('1');
        setStartDate('');
        setEndDate('');
        setErrorMessage('');
        const closeButton = screen.getByTestId('close');
        fireEvent.click(closeButton);
        refreshTable();
      } else {
        console.error('Error adding employee leave:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-indigo11 shadow-blueA4 hover:bg-violet3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-blue focus:outline-none" data-testid='addemployee'>
          Add Leave
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">
          <Dialog.Title className="text-violet12 m-0 text-[17px] font-medium" data-testid='addemployeetitle'>
            Add Leave
          </Dialog.Title>
          <Dialog.Description className="text-violet12 mt-[10px] mb-5 text-[15px] leading-normal">
            Add leave details. Click save when you're done.
          </Dialog.Description>
          {errorMessage && (
            <div className="mb-[15px] text-red-600 text-[15px]" data-testid='errormessage'>
              {errorMessage}
            </div>
          )}
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-indigo11 w-[90px] text-right text-[14px]" data-testid='leavetypeid'>
              Leave Type Id<span className="text-red-600">*</span>
            </label>
            <Select.Root value={leavetypeId} onValueChange={setLeaveTypeId}>
              <Select.Trigger
                className="text-indigo11 shadow-indigo7 focus:shadow-indigo8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                aria-label="Leave Type" data-testid='leavetypedropdown'
              >
                <Select.Value placeholder="Select Leave Type" />
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
                  {leavetypes.map((leave) => (
                    <Select.Item key={leave.id} value={leave.id} className="text-center border-b border-indigo11 last:border-b-0">
                      <Select.ItemText  data-testid= 'leavetypeoption'>{leave.name}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
              </Select.Portal>
            </Select.Root>
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-indigo11 w-[90px] text-right text-[15px]" data-testid='startdate'>
              Start Date<span className="text-red-600">*</span>
            </label>
            <input
              className="text-indigo11 shadow-indigo7 focus:shadow-indigo8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="startdate"
              value={startdate}
              onChange={(e) => setStartDate(e.target.value)}
              data-testid='startdatelabel'
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-indigo11 w-[90px] text-right text-[15px]" data-testid='enddate'>
              End Date<span className="text-red-600">*</span>
            </label>
            <input
              className="text-indigo11 shadow-indigo7 focus:shadow-indigo8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="enddate"
              value={enddate}
              onChange={(e) => setEndDate(e.target.value)}
              data-testid='enddatelabel'
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

export default EmployeeLeaveAdd;
