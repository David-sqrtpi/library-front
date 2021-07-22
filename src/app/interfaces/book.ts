export interface Book {
    id: number,
    name?: string,
    author?: string,
    category?: string,
    rate?: number,
    stock?: number,
    availableQuantity?: number,
    reservedQuantity?: number
}
