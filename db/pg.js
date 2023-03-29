import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString:
    "postgres://ormkixfx:PV9p0lsgOBWtUoSkeceQ7sctqhnpv4Sb@trumpet.db.elephantsql.com/ormkixfx",
});

export default pool;
