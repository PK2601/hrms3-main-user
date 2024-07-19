import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PendingLeaves from '../components/PendingLeaves';
import { decl } from 'postcss';

beforeAll(() => {
    window.matchMedia = window.matchMedia || function() {
      return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
      };
    };
  });

export async function fetchData() {
    try {
      const response = await fetch('https://my-json-server.typicode.com/pk2601/approvedleave/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }


describe.skip('PendingLeave component', () => {

    let mockData = [];
  
    beforeAll(async () => {
      mockData = await fetchData();
    });
  
    beforeEach(() => {
      render(<PendingLeaves datapendingleaves={mockData} />);
    });
  
    it('renders table columns correctly', () => {
      const columns = screen.getAllByRole('columnheader');
      expect(columns).toHaveLength(7);
      expect(screen.getByTestId('id')).toBeInTheDocument();
      expect(screen.getByTestId('employeeid')).toBeInTheDocument();
      expect(screen.getByTestId('leavetypeid')).toBeInTheDocument();
      expect(screen.getByTestId('startdate')).toBeInTheDocument();
      expect(screen.getByTestId('enddate')).toBeInTheDocument();
    });

    it('renders table rows correctly', () => {
      const rows = screen.getAllByRole('row');
      expect(rows.slice(1)).toHaveLength(mockData.length);
    });
  
    it('renders initial rows from mock data', () => {
      const rows = screen.getAllByRole('row');
      expect(rows.slice(1)).toHaveLength(mockData.length);
      expect(screen.getByText('2024-07-01')).toBeInTheDocument();
      expect(screen.getByText('2024-07-10')).toBeInTheDocument();
    });

    it('column sorting', async () => {
      const idColumnHeader = screen.getByTestId('id');
      fireEvent.click(idColumnHeader);
      const sortedRowsId = screen.getAllByRole('row');
      const sortedDataById = mockData.slice().sort((a, b) => a.id - b.id);

      sortedRowsId.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[0]).toHaveTextContent(sortedDataById[index].id.toString());
      });

      const employeeidColumnHeader = screen.getByTestId('employeeid');
      fireEvent.click(employeeidColumnHeader);
      const sortedRowsEmployeeId = screen.getAllByRole('row');
      const sortedDataByEmployeeId = mockData.slice().sort((a, b) => a.employeeid - b.employeeid);

      sortedRowsEmployeeId.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[2]).toHaveTextContent(sortedDataByEmployeeId[index].employeeid.toString());
      });

      const leavetypeidColumnHeader = screen.getByTestId('leavetypeid');
      fireEvent.click(leavetypeidColumnHeader);
      const sortedRowsLeaveTypeId = screen.getAllByRole('row');
      const sortedDataByLeaveTypeId = mockData.slice().sort((a, b) => a.leavetypeid - b.leavetypeid);

      sortedRowsLeaveTypeId.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[2]).toHaveTextContent(sortedDataByLeaveTypeId[index].leavetypeid.toString());
      });

      const startdateColumnHeader = screen.getByTestId('startdate');
      fireEvent.click(startdateColumnHeader);
      const sortedRowsStartDate = screen.getAllByRole('row');
      const sortedDataByStartDate = mockData.slice().sort((a, b) => a.startdate.localeCompare(b.startdate));
      sortedRowsStartDate.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[3]).toHaveTextContent(sortedDataByStartDate[index].startdate.toString());
      });

      const enddateColumnHeader = screen.getByTestId('enddate');
      fireEvent.click(enddateColumnHeader);
      const sortedRowsEndDate = screen.getAllByRole('row');
      const sortedDataByEndDate = mockData.slice().sort((a, b) => a.enddate.localeCompare(b.enddate));
      sortedRowsEndDate.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[4]).toHaveTextContent(sortedDataByEndDate[index].enddate.toString());
      });
    });

    it('filters table rows based on search input', async () => {
        const searchInput = screen.getByPlaceholderText(/search/i);
        fireEvent.change(searchInput, { target: { value: '1' } });
        const filteredRow = await screen.findAllByText('1');
        const notfilteredRow = screen.queryByText('2');
        expect(filteredRow[1]).toBeInTheDocument();
        expect(notfilteredRow).not.toBeInTheDocument();
      });

    it('removes a row on approve', async () => {
      const approveButton = screen.getAllByTestId('approvebutton');
      fireEvent.click(approveButton[0]);
      const confirmButton = await screen.findByText('Yes');
      fireEvent.click(confirmButton);
      await waitFor(() => {
        const deletedRow = screen.queryByText('2024-07-01	');
        expect(deletedRow).not.toBeInTheDocument();
      });
    });

    it('removes a row on decline', async () => {
      const declineButton = screen.getAllByTestId('declinebutton');
      fireEvent.click(declineButton[0]);
      const confirmButton = await screen.findByText('Yes');
      fireEvent.click(confirmButton);
      await waitFor(() => {
        const deletedRow = screen.queryByText('2024-07-01	');
        expect(deletedRow).not.toBeInTheDocument();
      });
    });
  });
  