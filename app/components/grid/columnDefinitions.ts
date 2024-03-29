import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { RowData } from './types/rowData';

export const ColumnDefinitions: ColDef<RowData>[] = [
    { field: "make", headerName: "Manufacturer" },
    { field: "model", headerName: "Model" },
    { 
        field: "price",
        headerName: "Price ($)",
        valueFormatter: ({value}) => value.toLocaleString("en-US", {style:"currency", currency:"USD"}) 
    },
    { 
        field: "electric",
        headerName: "Electric",
        cellRenderer: (params: ICellRendererParams) => params.value ? 'Yes' : 'No'
    },
];