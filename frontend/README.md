# Notebook

A full-stack CRUD application built with **PostgreSQL, Express, React, and Node.js**.  
The twist: every operation shows you the **real SQL query** that ran behind the scenes — so you learn PostgreSQL while you use the app.

## 🧠 Why This Exists

Most tutorials hide the database layer. This app surfaces it.  
Every time you create, read, update, or delete a record, a console panel shows you the exact PostgreSQL query — with your real values interpolated, not placeholders like `$1, $2`.

```sql
-- You type "Buy milk" and hit create. You see this:
INSERT INTO notebook (description, date)
VALUES ('Buy milk', '2024-01-15')
RETURNING *;
```

Over time you stop thinking about SQL as magic and start thinking in it.
