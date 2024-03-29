'use client'

import { useCallback, useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { RowData } from './types/rowData';
import { ColumnDefinitions } from './columnDefinitions'
import { GetData } from './dataService';

const Grid = () => {
    const [rowData, setRowData] = useState<RowData[]>([]);
    const gridRef = useRef<AgGridReact>(null);

    const deleteSelectedRows = useCallback(() => {
        const selectedRows : RowData[] | undefined = gridRef.current?.api.getSelectedRows();
        if(selectedRows){
            const selectedIds = new Set(selectedRows.map(row => row.id));
            setRowData(rowData => rowData?.filter(row => !selectedIds.has(row.id)));
        }
    }, []);

    const loadData = useCallback(() => {
        setRowData(GetData());
    }, []);

    useEffect(loadData, [loadData]);
    
    return (
        <div className="ag-theme-quartz" style={{ height: 1000 }}>
            <button
                onClick={deleteSelectedRows}
                className="bg-red-600 text-white py-2 px-4"
            >
                Delete selected rows
            </button>
            <button 
                onClick={loadData}
                className="bg-slate-600 text-white py-2 px-4"
            > 
                Reset data
            </button>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={ColumnDefinitions}
                rowSelection="multiple"
                animateRows={true}
                suppressCellFocus={true}
            />
        </div>
    )
}

export default Grid;
