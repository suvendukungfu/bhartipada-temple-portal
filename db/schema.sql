-- Supabase PostgreSQL Schema for Bhartipada Temple

-- Users table (Admins/Donors)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role VARCHAR(50) DEFAULT 'user',
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Temple Needs (Specific donation categories)
CREATE TABLE needs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  required_amount DECIMAL(12,2) NOT NULL,
  collected_amount DECIMAL(12,2) DEFAULT 0.00,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Donations table (Supports general and specific needs)
CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  age INT,
  birthdate DATE,
  amount DECIMAL(12,2) NOT NULL,
  payment_mode VARCHAR(50) NOT NULL,
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  purpose VARCHAR(255) DEFAULT 'general',
  need_id INT REFERENCES needs(id) ON DELETE SET NULL,
  message TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  pan_number VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Gallery table (Images for timeline and gallery)
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  caption VARCHAR(255),
  category VARCHAR(50) DEFAULT 'general', -- old, construction, festival, general
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
