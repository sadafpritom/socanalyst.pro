/*
  # Blog System Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique) - Category name
      - `slug` (text, unique) - URL-friendly category identifier
      - `description` (text) - Category description
      - `created_at` (timestamptz) - Creation timestamp
    
    - `authors`
      - `id` (uuid, primary key)
      - `name` (text) - Author full name
      - `email` (text, unique) - Author email
      - `bio` (text) - Author biography
      - `avatar_url` (text) - Author profile picture URL
      - `created_at` (timestamptz) - Creation timestamp
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text) - Post title
      - `slug` (text, unique) - URL-friendly post identifier
      - `excerpt` (text) - Short description/summary
      - `content` (text) - Full post content
      - `thumbnail_url` (text) - Thumbnail image URL placeholder
      - `author_id` (uuid, foreign key) - Reference to authors table
      - `category_id` (uuid, foreign key) - Reference to categories table
      - `published` (boolean) - Publication status
      - `published_at` (timestamptz) - Publication date
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
  
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (blog is public-facing)
    - Restrict write operations to authenticated users only
  
  3. Indexes
    - Add index on blog_posts.slug for fast lookups
    - Add index on blog_posts.category_id for filtering
    - Add index on blog_posts.published_at for sorting
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  bio text DEFAULT '',
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text DEFAULT '',
  content text DEFAULT '',
  thumbnail_url text DEFAULT '',
  author_id uuid REFERENCES authors(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

-- Public read access for authors
CREATE POLICY "Anyone can view authors"
  ON authors FOR SELECT
  USING (true);

-- Public read access for published blog posts
CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

-- Authenticated users can manage categories
CREATE POLICY "Authenticated users can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (true);

-- Authenticated users can manage authors
CREATE POLICY "Authenticated users can insert authors"
  ON authors FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update authors"
  ON authors FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete authors"
  ON authors FOR DELETE
  TO authenticated
  USING (true);

-- Authenticated users can manage blog posts
CREATE POLICY "Authenticated users can insert posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
  ('Web Development', 'web-development', 'Articles about web development, frameworks, and best practices'),
  ('Mobile Apps', 'mobile-apps', 'Mobile application development for iOS and Android'),
  ('UI/UX Design', 'ui-ux-design', 'User interface and user experience design principles'),
  ('Digital Marketing', 'digital-marketing', 'SEO, content marketing, and digital strategy'),
  ('Technology Trends', 'technology-trends', 'Latest trends and innovations in technology')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample authors
INSERT INTO authors (name, email, bio, avatar_url) VALUES
  ('Sarah Johnson', 'sarah@example.com', 'Senior Developer with 10+ years of experience in web technologies', '/placeholder-avatar-1.jpg'),
  ('Michael Chen', 'michael@example.com', 'UX Designer passionate about creating intuitive user experiences', '/placeholder-avatar-2.jpg'),
  ('Emily Rodriguez', 'emily@example.com', 'Digital Marketing Strategist specializing in SEO and content', '/placeholder-avatar-3.jpg')
ON CONFLICT (email) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, thumbnail_url, author_id, category_id, published, published_at) 
SELECT 
  'Building Scalable Web Applications',
  'building-scalable-web-applications',
  'Learn the key principles and practices for building web applications that can scale to millions of users.',
  'Full content here...',
  '/placeholder-blog-1.jpg',
  (SELECT id FROM authors WHERE email = 'sarah@example.com' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'web-development' LIMIT 1),
  true,
  now() - interval '2 days'
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'building-scalable-web-applications');

INSERT INTO blog_posts (title, slug, excerpt, content, thumbnail_url, author_id, category_id, published, published_at) 
SELECT 
  'Modern UI Design Principles',
  'modern-ui-design-principles',
  'Discover the fundamental principles that make user interfaces intuitive and beautiful.',
  'Full content here...',
  '/placeholder-blog-2.jpg',
  (SELECT id FROM authors WHERE email = 'michael@example.com' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'ui-ux-design' LIMIT 1),
  true,
  now() - interval '5 days'
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'modern-ui-design-principles');

INSERT INTO blog_posts (title, slug, excerpt, content, thumbnail_url, author_id, category_id, published, published_at) 
SELECT 
  'SEO Strategies That Actually Work',
  'seo-strategies-that-work',
  'Proven SEO techniques to improve your website ranking and drive organic traffic.',
  'Full content here...',
  '/placeholder-blog-3.jpg',
  (SELECT id FROM authors WHERE email = 'emily@example.com' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'digital-marketing' LIMIT 1),
  true,
  now() - interval '1 day'
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'seo-strategies-that-work');

INSERT INTO blog_posts (title, slug, excerpt, content, thumbnail_url, author_id, category_id, published, published_at) 
SELECT 
  'The Future of Mobile Development',
  'future-of-mobile-development',
  'Explore emerging trends and technologies shaping the future of mobile app development.',
  'Full content here...',
  '/placeholder-blog-4.jpg',
  (SELECT id FROM authors WHERE email = 'sarah@example.com' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'mobile-apps' LIMIT 1),
  true,
  now() - interval '7 days'
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'future-of-mobile-development');

INSERT INTO blog_posts (title, slug, excerpt, content, thumbnail_url, author_id, category_id, published, published_at) 
SELECT 
  'AI and Machine Learning Trends 2025',
  'ai-ml-trends-2025',
  'Stay ahead with the latest developments in artificial intelligence and machine learning.',
  'Full content here...',
  '/placeholder-blog-5.jpg',
  (SELECT id FROM authors WHERE email = 'michael@example.com' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'technology-trends' LIMIT 1),
  true,
  now() - interval '3 days'
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'ai-ml-trends-2025');
