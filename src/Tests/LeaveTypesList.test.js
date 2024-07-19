import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TablesLeaveTypes from '../components/shared/LeaveTypes-Table';

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
      const response = await fetch('https://my-json-server.typicode.com/pk2601/leavetypes/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }


describe.skip('TablesLeaveTypes component', () => {

    let mockData = [];
  
    beforeAll(async () => {
      mockData = await fetchData();
    });
  
    beforeEach(() => {
      render(<TablesLeaveTypes dataleavetypes={mockData} />);
    });
  
    it('renders table columns correctly', () => {
      const columns = screen.getAllByRole('columnheader');
      expect(columns).toHaveLength(4);
      expect(screen.getByTestId('leavetypeid')).toBeInTheDocument();
      expect(screen.getByTestId('leavetypecode')).toBeInTheDocument();
      expect(screen.getByTestId('leavetypename')).toBeInTheDocument();
    });

    it('renders table rows correctly', () => {
      const rows = screen.getAllByRole('row');
      expect(rows.slice(1)).toHaveLength(mockData.length);
    });
  
    it('renders initial rows from mock data', () => {
      const rows = screen.getAllByRole('row');
      expect(rows.slice(1)).toHaveLength(mockData.length);
      expect(screen.getByText('Annual Leave')).toBeInTheDocument();
      expect(screen.getByText('Medical Leave')).toBeInTheDocument();
      expect(screen.getByText('Sick Leave')).toBeInTheDocument();
    });
  
    it('filters table rows based on search input', async () => {
      const searchInput = screen.getByPlaceholderText(/search/i);
      fireEvent.change(searchInput, { target: { value: 'Annual' } });
      const filteredRow = await screen.findByText('Annual Leave');
      const notfilteredRow = screen.queryByText('Medical Leave');
      const notfilteredRow2 = screen.queryByText('Sick Leave');
      expect(filteredRow).toBeInTheDocument();
      expect(notfilteredRow).not.toBeInTheDocument();
      expect(notfilteredRow2).not.toBeInTheDocument();
    });
  
    it('deletes a row on confirmation', async () => {
      const deleteButton = screen.getAllByTestId('deletebutton');
      fireEvent.click(deleteButton[0]);
      const confirmButton = await screen.findByText('Yes');
      fireEvent.click(confirmButton);
      await waitFor(() => {
        const deletedRow = screen.queryByText('Annual Leave');
        expect(deletedRow).not.toBeInTheDocument();
      });
    });

    it('column sorting', async () => {
      const idColumnHeader = screen.getByTestId('leavetypeid');
      fireEvent.click(idColumnHeader);
      const sortedRowsId = screen.getAllByRole('row');
      const sortedDataById = mockData.slice().sort((a, b) => a.leavetypeid - b.leavetypeid);

      sortedRowsId.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[1]).toHaveTextContent(sortedDataById[index].leavetypeid.toString());
      });

      const codeColumnHeader = screen.getByTestId('leavetypecode');
      fireEvent.click(codeColumnHeader);
      const sortedRowsCode = screen.getAllByRole('row');
      const sortedDataByCode = mockData.slice().sort((a, b) => a.leavetypecode - b.leavetypecode);
      sortedRowsCode.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[2]).toHaveTextContent(sortedDataByCode[index].leavetypecode.toString());
        
      });

      const nameColumnHeader = screen.getByTestId('leavetypename');
      fireEvent.click(nameColumnHeader);
      const sortedRowsName = screen.getAllByRole('row');
      const sortedDataByName = mockData.slice().sort((a, b) => a.leavetypename.localeCompare(b.leavetypename));
      sortedRowsName.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[3]).toHaveTextContent(sortedDataByName[index].leavetypename.toString());
        
      });
    });
  });
  