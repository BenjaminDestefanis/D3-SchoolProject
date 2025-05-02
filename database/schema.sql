-- Tabla: students (alumnos)
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    birth_date DATE,
    gender TEXT CHECK (gender IN ('Masculino', 'Femenino', 'Otro')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: courses (cursos o clases)
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    year INTEGER NOT NULL,
    teacher_id INTEGER -- Puedes crear una tabla 'teachers' más adelante
);

-- Tabla: subjects (materias)
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- Tabla: enrollments (inscripciones de alumnos a cursos)
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE
);

-- Tabla: grades (calificaciones)
CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    grade NUMERIC(4,2) CHECK (grade >= 0 AND grade <= 10),
    date DATE NOT NULL
);
