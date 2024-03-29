'use client'

import { useCallback, useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import styled from 'styled-components';

import { RowData } from './types/rowData';
import { ColumnDefinitions } from './columnDefinitions'
import { GetData } from './dataService';

const GridWrapper = styled.div`
    display: flex;
    height: 100vh;
`;

const Grid = () => {
    const [rowData, setRowData] = useState<RowData[]>([]);
    const gridRef = useRef<AgGridReact<RowData>>(null);

    const deleteSelectedRows = useCallback(() => {
        const selectedRows = gridRef.current?.api.getSelectedRows();
        if(selectedRows){
            const selectedIds = new Set(selectedRows.map(row => row.id));
            setRowData(rowData => rowData.filter(row => !selectedIds.has(row.id)));
        }
    }, []);

    const resetSorting = useCallback(() => {
        gridRef.current?.api.resetColumnState();
    }, []);

    const loadData = useCallback(() => {
        setRowData(GetData());
    }, []);

    useEffect(loadData, [loadData]);
    
    return (
        <GridWrapper>
            <div className="flex-grow ag-theme-quartz">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={ColumnDefinitions}
                    rowSelection="multiple"
                    animateRows={true}
                    suppressCellFocus={true}
                />
            </div>
            <div className="flex flex-col justify-start">
                <button
                    onClick={deleteSelectedRows}
                    className="bg-red-600 text-white py-2 px-4"
                >
                    Delete selected rows
                </button>
                <button 
                    onClick={resetSorting}
                    className="bg-slate-600 text-white py-2 px-4"
                > 
                    Reset sorting
                </button>
                <button 
                    onClick={loadData}
                    className="bg-green-600 text-white py-2 px-4"
                > 
                    Reset data
                </button>
            </div>
        </GridWrapper>
    )
}

export default Grid;
