CREATE TABLE
  IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    live_link TEXT,
    github_link TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  IF NOT EXISTS technologies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon_slug VARCHAR(100) NOT NULL,
    icon_hex VARCHAR(6) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  IF NOT EXISTS project_technologies (
    project_id INTEGER NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    technology_id INTEGER NOT NULL REFERENCES technologies (id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, technology_id)
  );