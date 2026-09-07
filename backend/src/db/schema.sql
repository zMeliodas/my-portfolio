CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  live_link TEXT,
  github_link TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT projects_sort_order_check
    CHECK (sort_order >= 0)
);

CREATE UNIQUE INDEX IF NOT EXISTS projects_title_unique
ON projects (LOWER(title));


CREATE TABLE IF NOT EXISTS technologies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  icon_slug VARCHAR(100) NOT NULL,
  icon_hex VARCHAR(6) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT technologies_sort_order_check
    CHECK (sort_order >= 0),

  CONSTRAINT technologies_icon_hex_check
    CHECK (icon_hex ~ '^[0-9A-Fa-f]{6}$')
);

CREATE UNIQUE INDEX IF NOT EXISTS technologies_name_unique
ON technologies (LOWER(name));


CREATE TABLE IF NOT EXISTS project_technologies (
  project_id INTEGER NOT NULL
    REFERENCES projects(id)
    ON DELETE CASCADE,

  technology_id INTEGER NOT NULL
    REFERENCES technologies(id)
    ON DELETE CASCADE,

  PRIMARY KEY (project_id, technology_id)
);


CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS resume (
  id INTEGER PRIMARY KEY DEFAULT 1,
  original_name TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT single_resume
    CHECK (id = 1)
);