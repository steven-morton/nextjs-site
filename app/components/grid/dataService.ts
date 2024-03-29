import { RowData } from './types/rowData';

export const GetData = (): RowData[] => [
    { id: 1, make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { id: 2, make: "Ford", model: "F-Series", price: 33850, electric: false },
    { id: 3, make: "Toyota", model: "Corolla", price: 29600, electric: false },
];