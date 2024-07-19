import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LeaveManagement from '../components/Leave-Management';


beforeAll(() => {
    window.matchMedia = window.matchMedia || function() {
      return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
      };
    };
  });


describe.skip('LeaveManagement Component', () => {
    it('opens tabs on click', () => {
  
    render(<LeaveManagement />);
  
    const approvedButton = screen.getByTestId('approvedleave');
    fireEvent.click(approvedButton);
  
    const Decline = screen.getAllByText('Decline');
    expect(Decline[0]).toBeInTheDocument();

    const DeclineButton = screen.getByTestId('declinedleave');
    fireEvent.click(DeclineButton);
  
    const Approve = screen.getAllByText('Approve');
    expect(Approve[0]).toBeInTheDocument();

    const pendingButton = screen.getByTestId('pendingleave');
    fireEvent.click(pendingButton);
  
    const PendingDecline = screen.getAllByText('Decline');
    expect(PendingDecline[0]).toBeInTheDocument();
    const PendingApprove = screen.getAllByText('Approve');
    expect(PendingApprove[0]).toBeInTheDocument();
    });
});