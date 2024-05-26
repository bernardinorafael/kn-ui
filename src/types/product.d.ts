export interface Product {
	id: string;
	name: string;
	size: string;
	active: boolean;
	price: number;
	created_at: string;
	brand: string;
	color: string;
	stock: number;
	current_stock: number;
	category: string;
	obs: string | null;
}
