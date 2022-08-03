import { Pool } from "pg";

let connection: Pool;
let init: boolean = false;

if (!init) {
  connection = new Pool({
    user: "danields",
    host: "localhost",
    port: 5432,
    database: "nextjsts",
  });
  init = true;
}

export { connection };
