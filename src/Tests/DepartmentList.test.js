import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TablesDept from '../components/shared/Department-Table';

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
      const response = await fetch('https://my-json-server.typicode.com/pk2601/department/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }


describe.skip('TablesDept component', () => {

    let mockData = [];
  
    beforeAll(async () => {
      mockData = await fetchData();
    });
  
    beforeEach(() => {
      render(<TablesDept datadept={mockData} />);
    });
  
    it('renders table columns correctly', () => {
      const columns = screen.getAllByRole('columnheader');
      expect(columns).toHaveLength(4);
      expect(screen.getByTestId('departmentid')).toBeInTheDocument();
      expect(screen.getByTestId('departmentcode')).toBeInTheDocument();
      expect(screen.getByTestId('departmentname')).toBeInTheDocument();
    });

    it('renders table rows correctly', () => {
      const rows = screen.getAllByRole('row');
      expect(rows.slice(1)).toHaveLength(mockData.length);
    });
  
    it('renders initial rows from mock data', () => {
      const rows = screen.getAllByRole('row');
      expect(rows.slice(1)).toHaveLength(mockData.length);
      expect(screen.getByText('Human Resources')).toBeInTheDocument();
      expect(screen.getByText('Information Technology')).toBeInTheDocument();
    });
  
    it('filters table rows based on search input', async () => {
      const searchInput = screen.getByPlaceholderText(/search/i);
      fireEvent.change(searchInput, { target: { value: 'Human' } });
      const filteredRow = await screen.findByText('Human Resources');
      const notfilteredRow = screen.queryByText('Information Technology');
      expect(filteredRow).toBeInTheDocument();
      expect(notfilteredRow).not.toBeInTheDocument();
    });
  
    it('deletes a row on confirmation', async () => {
      const deleteButton = screen.getAllByTestId('deletebutton');
      fireEvent.click(deleteButton[0]);
      const confirmButton = await screen.findByText('Yes');
      fireEvent.click(confirmButton);
      await waitFor(() => {
        const deletedRow = screen.queryByText('Human Resources');
        expect(deletedRow).not.toBeInTheDocument();
      });
    });

    it('column sorting', async () => {
      const idColumnHeader = screen.getByTestId('departmentid');
      fireEvent.click(idColumnHeader);
      const sortedRowsId = screen.getAllByRole('row');
      const sortedDataById = mockData.slice().sort((a, b) => a.departmentid - b.departmentid);

      sortedRowsId.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[1]).toHaveTextContent(sortedDataById[index].departmentid.toString());
      });

      const codeColumnHeader = screen.getByTestId('departmentcode');
      fireEvent.click(codeColumnHeader);
      const sortedRowsCode = screen.getAllByRole('row');
      const sortedDataByCode = mockData.slice().sort((a, b) => a.departmentcode - b.departmentcode);
      sortedRowsCode.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[2]).toHaveTextContent(sortedDataByCode[index].departmentcode.toString());
        
      });

      const nameColumnHeader = screen.getByTestId('departmentname');
      fireEvent.click(nameColumnHeader);
      const sortedRowsName = screen.getAllByRole('row');
      const sortedDataByName = mockData.slice().sort((a, b) => a.departmentname.localeCompare(b.departmentname));
      sortedRowsName.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[3]).toHaveTextContent(sortedDataByName[index].departmentname.toString());
        
      });
    });
  });
  