export interface Transaction {
    id?: number;
    description: string
    amount: number;
    type_id: number;
    created_at: string;
    updated_at: string;
}
