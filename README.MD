💰 Monetización a futuro
Plan gratuito para academias pequeñas (limitado a X alumnos).

Planes pagos mensuales según cantidad de cursos/estudiantes.

Servicios personalizados (branding, hosting propio).

Partner con academias para integrarlo como solución interna.



🧩 Modelo de Datos (versión inicial)
Este modelo está pensado para una base de datos relacional como PostgreSQL, aunque también se puede adaptar a NoSQL como Firestore.

📁 Tablas principales
1. students (alumnos)
Campo	Tipo	Descripción
id	SERIAL	ID único del alumno
name	TEXT	Nombre completo
email	TEXT	Correo (opcional)
birth_date	DATE	Fecha de nacimiento
gender	TEXT	Masculino, Femenino, Otro
created_at	TIMESTAMP	Fecha de alta

2. courses (cursos o clases)
Campo	Tipo	Descripción
id	SERIAL	ID único del curso
name	TEXT	Nombre (Ej: "3ro B")
year	INTEGER	Año académico
teacher_id	INTEGER	(futuro: referencia a tabla de usuarios)

3. subjects (materias)
Campo	Tipo	Descripción
id	SERIAL	ID de materia
name	TEXT	Ej: Matemáticas

4. enrollments (alumnos en cursos)
Campo	Tipo	Descripción
id	SERIAL	ID único
student_id	INT	Relación con students
course_id	INT	Relación con courses

5. grades (notas o calificaciones)
Campo	Tipo	Descripción
id	SERIAL	ID
student_id	INT	ID del alumno
subject_id	INT	ID de materia
course_id	INT	ID del curso
grade	NUMERIC	Nota (ej: 8.5)
date	DATE	Fecha de evaluación