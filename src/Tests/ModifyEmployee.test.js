import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import EmployeeModify from '../components/Modify-Employee';

beforeAll(() => {
    window.matchMedia = window.matchMedia || function() {
      return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
      };
    };
  });


describe.skip('ModifyEmp component', () => {

    beforeEach(() => {
      render(<EmployeeModify />);
    });

    it('opens dialog on Modify Employee button click', () => {
    
      const modifyButton = screen.getAllByTestId('modifyemployee');
      fireEvent.click(modifyButton[0]);
    
      const dialogTitle = screen.getByTestId('modifyemployeetitle');
      expect(dialogTitle).toBeInTheDocument();
      });
    
      it('closes dialog on Close button click', () => {
    
        const modifyButton = screen.getAllByTestId('modifyemployee');
        fireEvent.click(modifyButton[0]);
    
        const dialogTitle = screen.getByTestId('modifyemployeetitle');
    
        const closeButton = screen.getByTestId('close');
        fireEvent.click(closeButton);
    
        expect(dialogTitle).not.toBeInTheDocument();
      });

      it('displays error messages for invalid form input', async () => {
      
        const modifyButton = screen.getAllByTestId('modifyemployee');
        fireEvent.click(modifyButton[0]);
    
        const dialogTitle = screen.getByTestId('modifyemployeetitle');
        expect(dialogTitle).toBeInTheDocument();
    
        const saveButton = screen.getByTestId('save');
        expect(saveButton).toHaveClass('cursor-not-allowed');
        fireEvent.click(saveButton);

        const errorMessage = screen.getByTestId('errormessage');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage.textContent).toEqual('Please fill in all asterix fields.');
      });

      it('enables Save button on valid form input', async () => {
      
        const modifyButton = screen.getAllByTestId('modifyemployee');
        fireEvent.click(modifyButton[0]);
    
        const dialogTitle = screen.getByTestId('modifyemployeetitle');
        expect(dialogTitle).toBeInTheDocument();

        const nameInput = screen.getByTestId('namelabel');
        userEvent.type(nameInput, 'James');

        const emailInput = screen.getByTestId('emaillabel');
        userEvent.type(emailInput, 'james@example.com');

        const phoneInput = screen.getByTestId('phonelabel');
        userEvent.type(phoneInput, '1234567890');

        const addressInput = screen.getByTestId('addresslabel');
        userEvent.type(addressInput, '123 Main St');

        const dobInput = screen.getByTestId('doblabel');
        userEvent.type(dobInput, '1990-01-01');

        const saveButton = screen.getByTestId('save');
        expect(saveButton).not.toHaveClass('cursor-not-allowed');
      });

      it('displays error messages for invalid name input', async () => {
        
        const modifyButton = screen.getAllByTestId('modifyemployee');
        fireEvent.click(modifyButton[0]);
    
        const dialogTitle = screen.getByTestId('modifyemployeetitle');
        expect(dialogTitle).toBeInTheDocument();
    
        const nameInput = screen.getByTestId('namelabel');
        userEvent.type(nameInput, '123');

        const emailInput = screen.getByTestId('emaillabel');
        userEvent.type(emailInput, 'james@example.com');

        const phoneInput = screen.getByTestId('phonelabel');
        userEvent.type(phoneInput, '1234567890');

        const addressInput = screen.getByTestId('addresslabel');
        userEvent.type(addressInput, '123 Main St');

        const dobInput = screen.getByTestId('doblabel');
        userEvent.type(dobInput, '1990-01-01');

        const saveButton = screen.getByTestId('save');
        fireEvent.click(saveButton);

        expect(saveButton).toHaveClass('cursor-not-allowed');

        const errorMessage = screen.getByTestId('errormessage');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage.textContent).toEqual('Name should be in text format');
      });

      it('displays error messages for invalid managerid input', async () => {
        const modifyButton = screen.getAllByTestId('modifyemployee');
        fireEvent.click(modifyButton[0]);
    
        const dialogTitle = screen.getByTestId('modifyemployeetitle');
        expect(dialogTitle).toBeInTheDocument();
    
        const nameInput = screen.getByTestId('namelabel');
        userEvent.type(nameInput, 'James');

        const managerInput = screen.getByTestId('manageridlabel');
        userEvent.type(managerInput, 'error');

        const emailInput = screen.getByTestId('emaillabel');
        userEvent.type(emailInput, 'james@example.com');

        const phoneInput = screen.getByTestId('phonelabel');
        userEvent.type(phoneInput, '1234567890');

        const addressInput = screen.getByTestId('addresslabel');
        userEvent.type(addressInput, '123 Main St');

        const dobInput = screen.getByTestId('doblabel');
        userEvent.type(dobInput, '1990-01-01');

        const saveButton = screen.getByTestId('save');
        fireEvent.click(saveButton);

        expect(saveButton).toHaveClass('cursor-not-allowed');

        const errorMessage = screen.getByTestId('errormessage');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage.textContent).toEqual('Manager Id should be numeric');
      });
    
      it('displays error messages for invalid email input', async () => {
        const modifyButton = screen.getAllByTestId('modifyemployee');
        fireEvent.click(modifyButton[0]);
    
        const dialogTitle = screen.getByTestId('modifyemployeetitle');
        expect(dialogTitle).toBeInTheDocument();
    
        const nameInput = screen.getByTestId('namelabel');
        userEvent.type(nameInput, 'james');

        const emailInput = screen.getByTestId('emaillabel');
        userEvent.type(emailInput, 'jamesexample.com');

        const phoneInput = screen.getByTestId('phonelabel');
        userEvent.type(phoneInput, '1234567890');

        const addressInput = screen.getByTestId('addresslabel');
        userEvent.type(addressInput, '123 Main St');

        const dobInput = screen.getByTestId('doblabel');
        userEvent.type(dobInput, '1990-01-01');

        const saveButton = screen.getByTestId('save');
        fireEvent.click(saveButton);

        expect(saveButton).toHaveClass('cursor-not-allowed');

        const errorMessage = screen.getByTestId('errormessage');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage.textContent).toEqual('Email is of wrong type');
      });
    
      it('displays error messages for invalid less phone input', async () => {
        const modifyButton = screen.getAllByTestId('modifyemployee');
        fireEvent.click(modifyButton[0]);
    
        const dialogTitle = screen.getByTestId('modifyemployeetitle');
        expect(dialogTitle).toBeInTheDocument();

        const nameInput = screen.getByTestId('namelabel');
        userEvent.type(nameInput, 'james');

        const emailInput = screen.getByTestId('emaillabel');
        userEvent.type(emailInput, 'james@example.com');

        const phoneInput = screen.getByTestId('phonelabel');
        userEvent.type(phoneInput, '12345670');

        const addressInput = screen.getByTestId('addresslabel');
        userEvent.type(addressInput, '123 Main St');

        const dobInput = screen.getByTestId('doblabel');
        userEvent.type(dobInput, '1990-01-01');

        const saveButton = screen.getByTestId('save');
        fireEvent.click(saveButton);

        expect(saveButton).toHaveClass('cursor-not-allowed');

        const errorMessage = screen.getByTestId('errormessage');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage.textContent).toEqual('Phone must contain 10 numbers');
      });
    
      it('displays error messages for invalid text phone input', async () => {
        const modifyButton = screen.getAllByTestId('modifyemployee');
        fireEvent.click(modifyButton[0]);
    
        const dialogTitle = screen.getByTestId('modifyemployeetitle');
        expect(dialogTitle).toBeInTheDocument();

        const nameInput = screen.getByTestId('namelabel');
        userEvent.type(nameInput, 'james');

        const emailInput = screen.getByTestId('emaillabel');
        userEvent.type(emailInput, 'james@example.com');

        const phoneInput = screen.getByTestId('phonelabel');
        userEvent.type(phoneInput, '1234567as0');

        const addressInput = screen.getByTestId('addresslabel');
        userEvent.type(addressInput, '123 Main St');

        const dobInput = screen.getByTestId('doblabel');
        userEvent.type(dobInput, '1990-01-01');

        const saveButton = screen.getByTestId('save');
        fireEvent.click(saveButton);

        expect(saveButton).toHaveClass('cursor-not-allowed');

        const errorMessage = screen.getByTestId('errormessage');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage.textContent).toEqual('Phone must contain 10 numbers');
      });
    
      it('displays error messages for invalid address input', async () => {
        const modifyButton = screen.getAllByTestId('modifyemployee');
        fireEvent.click(modifyButton[0]);
    
        const dialogTitle = screen.getByTestId('modifyemployeetitle');
        expect(dialogTitle).toBeInTheDocument();
    
        const nameInput = screen.getByTestId('namelabel');
        userEvent.type(nameInput, 'james');

        const emailInput = screen.getByTestId('emaillabel');
        userEvent.type(emailInput, 'james@example.com');

        const phoneInput = screen.getByTestId('phonelabel');
        userEvent.type(phoneInput, '1234567890');

        const addressInput = screen.getByTestId('addresslabel');
        userEvent.type(addressInput, '     123 Main St');

        const dobInput = screen.getByTestId('doblabel');
        userEvent.type(dobInput, '1990-01-01');

        const saveButton = screen.getByTestId('save');
        fireEvent.click(saveButton);

        expect(saveButton).toHaveClass('cursor-not-allowed');

        const errorMessage = screen.getByTestId('errormessage');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage.textContent).toEqual('Address is of wrong type');
      });
    
      it('displays error messages for invalid dob input', async () => {
        const modifyButton = screen.getAllByTestId('modifyemployee');
        fireEvent.click(modifyButton[0]);
    
        const dialogTitle = screen.getByTestId('modifyemployeetitle');
        expect(dialogTitle).toBeInTheDocument();
    
        const nameInput = screen.getByTestId('namelabel');
        userEvent.type(nameInput, 'james');

        const emailInput = screen.getByTestId('emaillabel');
        userEvent.type(emailInput, 'james@example.com');

        const phoneInput = screen.getByTestId('phonelabel');
        userEvent.type(phoneInput, '1234567890');

        const addressInput = screen.getByTestId('addresslabel');
        userEvent.type(addressInput, '123 Main St');

        const dobInput = screen.getByTestId('doblabel');
        userEvent.type(dobInput, '19901-01');

        const saveButton = screen.getByTestId('save');
        fireEvent.click(saveButton);

        expect(saveButton).toHaveClass('cursor-not-allowed');

        const errorMessage = screen.getByTestId('errormessage');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage.textContent).toEqual('Date of Birth should be of format YYYY-MM-DD');
      });
});