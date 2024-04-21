import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_tenants_status" AS ENUM('live', 'ready_to_launch');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "tenants" ADD COLUMN "status" "enum_tenants_status" NOT NULL;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "tenants" DROP COLUMN IF EXISTS "status";`);

};
