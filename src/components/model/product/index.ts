interface ProductDimensions {
	length: string;
	width: string;
	height: string;
}

interface ProductCategory {
	id: number;
	name: string;
	slug: string;
}

interface ProductImage {
	id: number;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	src: string;
	name: string;
	alt: string;
}

interface ProductLinks {
	self: { href: string }[];
	collection: { href: string }[];
}

interface ProductType {
	id: number;
	name: string;
	slug: string;
	permalink: string;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	type: string;
	status: string;
	featured: boolean;
	catalog_visibility: string;
	description: string;
	short_description: string;
	sku: string;
	price: string;
	regular_price: string;
	sale_price: string;
	date_on_sale_from: string | null;
	date_on_sale_from_gmt: string | null;
	date_on_sale_to: string | null;
	date_on_sale_to_gmt: string | null;
	price_html: string;
	on_sale: boolean;
	purchasable: boolean;
	total_sales: number;
	virtual: boolean;
	downloadable: boolean;
	downloads: any[];
	download_limit: number;
	download_expiry: number;
	external_url: string;
	button_text: string;
	tax_status: string;
	tax_class: string;
	manage_stock: boolean;
	stock_quantity: number | null;
	stock_status: string;
	backorders: string;
	backorders_allowed: boolean;
	backordered: boolean;
	sold_individually: boolean;
	weight: string;
	dimensions: ProductDimensions;
	shipping_required: boolean;
	shipping_taxable: boolean;
	shipping_class: string;
	shipping_class_id: number;
	reviews_allowed: boolean;
	average_rating: string;
	rating_count: number;
	related_ids: number[];
	upsell_ids: number[];
	cross_sell_ids: number[];
	parent_id: number;
	purchase_note: string;
	categories: ProductCategory[];
	tags: any[];
	images: ProductImage[];
	attributes: any[];
	default_attributes: any[];
	variations: any[];
	grouped_products: any[];
	menu_order: number;
	meta_data: any[];
	_links: ProductLinks;
}
