import { Pool } from "pg";

new Pool({
  user: "postgres",
  password: "mysecretpassword",
  host: "localhost",
  port: 5432,
  database: "mydb",
});
