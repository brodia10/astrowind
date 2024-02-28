import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "forms_blocks_payment_price_conditions";
DROP TABLE "forms_blocks_payment";
ALTER TABLE "form_submissions" DROP COLUMN IF EXISTS "payment_field";
ALTER TABLE "form_submissions" DROP COLUMN IF EXISTS "payment_status";
ALTER TABLE "form_submissions" DROP COLUMN IF EXISTS "payment_amount";
ALTER TABLE "form_submissions" DROP COLUMN IF EXISTS "payment_payment_processor";
ALTER TABLE "form_submissions" DROP COLUMN IF EXISTS "payment_credit_card_token";
ALTER TABLE "form_submissions" DROP COLUMN IF EXISTS "payment_credit_card_brand";
ALTER TABLE "form_submissions" DROP COLUMN IF EXISTS "payment_credit_card_number";`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_forms_blocks_payment_price_conditions_condition" AS ENUM('hasValue', 'equals', 'notEquals');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_forms_blocks_payment_price_conditions_operator" AS ENUM('add', 'subtract', 'multiply', 'divide');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_forms_blocks_payment_price_conditions_value_type" AS ENUM('static', 'valueOfField');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "forms_blocks_payment_price_conditions" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"field_to_use" varchar,
	"condition" "enum_forms_blocks_payment_price_conditions_condition",
	"value_for_condition" varchar,
	"operator" "enum_forms_blocks_payment_price_conditions_operator",
	"valueType" "enum_forms_blocks_payment_price_conditions_value_type",
	"value_for_operator" varchar
);

CREATE TABLE IF NOT EXISTS "forms_blocks_payment" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"base_price" numeric,
	"required" boolean,
	"block_name" varchar
);

ALTER TABLE "form_submissions" ADD COLUMN "payment_field" varchar;
ALTER TABLE "form_submissions" ADD COLUMN "payment_status" varchar;
ALTER TABLE "form_submissions" ADD COLUMN "payment_amount" numeric;
ALTER TABLE "form_submissions" ADD COLUMN "payment_payment_processor" varchar;
ALTER TABLE "form_submissions" ADD COLUMN "payment_credit_card_token" varchar;
ALTER TABLE "form_submissions" ADD COLUMN "payment_credit_card_brand" varchar;
ALTER TABLE "form_submissions" ADD COLUMN "payment_credit_card_number" varchar;
CREATE INDEX IF NOT EXISTS "forms_blocks_payment_price_conditions_order_idx" ON "forms_blocks_payment_price_conditions" ("_order");
CREATE INDEX IF NOT EXISTS "forms_blocks_payment_price_conditions_parent_id_idx" ON "forms_blocks_payment_price_conditions" ("_parent_id");
CREATE INDEX IF NOT EXISTS "forms_blocks_payment_order_idx" ON "forms_blocks_payment" ("_order");
CREATE INDEX IF NOT EXISTS "forms_blocks_payment_parent_id_idx" ON "forms_blocks_payment" ("_parent_id");
CREATE INDEX IF NOT EXISTS "forms_blocks_payment_path_idx" ON "forms_blocks_payment" ("_path");
DO $$ BEGIN
 ALTER TABLE "forms_blocks_payment_price_conditions" ADD CONSTRAINT "forms_blocks_payment_price_conditions__parent_id_forms_blocks_payment_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "forms_blocks_payment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forms_blocks_payment" ADD CONSTRAINT "forms_blocks_payment__parent_id_forms_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};
