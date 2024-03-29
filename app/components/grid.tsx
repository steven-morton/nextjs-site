'use client'

import { useCallback, useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

type RowData = {
    id: number;
    make: string;
    model: string;
    price: number;
    electric: boolean;
};

const columnDefs: ColDef<RowData>[] = [
    { field: "make", headerName: "Manufacturer" },
    { field: "model", headerName: "Model" },
    { 
        field: "price",
        headerName: "Price ($)",
        valueFormatter: ({value}) => value.toLocaleString("en-US", {style:"currency", currency:"USD"}) },
    { 
        field: "electric",
        headerName: "Electric",
        cellRenderer: (params:ICellRendererParams) => params.value ? 'Yes' : 'No'
    }
]

const getData = (): RowData[] => [
    { id: 1, make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { id: 2, make: "Ford", model: "F-Series", price: 33850, electric: false },
    { id: 3, make: "Toyota", model: "Corolla", price: 29600, electric: false },
]

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
        setRowData(getData());
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
                columnDefs={columnDefs}
                rowSelection="multiple"
                animateRows={true}
                suppressCellFocus={true}
            />
        </div>
    )
}

export default Grid;
