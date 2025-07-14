CREATE TABLE IF NOT EXISTS menu_items(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    ingredients TEXT[],
    price NUMERIC(10, 2) NOT NULL,
    available BOOLEAN NOT NULL,
    image_url TEXT
);