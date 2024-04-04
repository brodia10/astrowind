import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_tenant_stripe_configs_default_currency" AS ENUM('US', 'EU', 'GB', 'CA', 'AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_tenant_stripe_configs_payment_methods" AS ENUM('american_express', 'diners_club', 'mastercard', 'visa', 'apple_pay', 'google_pay', 'microsoft_pay', 'paypal', 'alipay', 'wechat_pay', 'unionpay', 'jcb', 'klarna', 'afterpay', 'ideal');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "tenant_stripe_configs" (
	"id" serial PRIMARY KEY NOT NULL,
	"stripe_secret_key" varchar NOT NULL,
	"stripe_publishable_key" varchar NOT NULL,
	"stripe_account_id" varchar NOT NULL,
	"stripe_webhook_secret" varchar NOT NULL,
	"defaultCurrency" "enum_tenant_stripe_configs_default_currency" NOT NULL,
	"paymentMethods" "enum_tenant_stripe_configs_payment_methods" NOT NULL,
	"success_url" varchar NOT NULL,
	"cancel_url" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "tenant_stripe_configs_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"tenants_id" integer
);

ALTER TABLE "tenants_domains" ALTER COLUMN "auto_generated" DROP NOT NULL;
ALTER TABLE "customers" ADD COLUMN "email" varchar;
ALTER TABLE "tenants_rels" ADD COLUMN "categories_id" integer;
CREATE INDEX IF NOT EXISTS "tenant_stripe_configs_payment_methods_idx" ON "tenant_stripe_configs" ("paymentMethods");
CREATE INDEX IF NOT EXISTS "tenant_stripe_configs_created_at_idx" ON "tenant_stripe_configs" ("created_at");
CREATE INDEX IF NOT EXISTS "tenant_stripe_configs_rels_order_idx" ON "tenant_stripe_configs_rels" ("order");
CREATE INDEX IF NOT EXISTS "tenant_stripe_configs_rels_parent_idx" ON "tenant_stripe_configs_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "tenant_stripe_configs_rels_path_idx" ON "tenant_stripe_configs_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "tenants_rels" ADD CONSTRAINT "tenants_rels_categories_id_categories_id_fk" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tenant_stripe_configs_rels" ADD CONSTRAINT "tenant_stripe_configs_rels_parent_id_tenant_stripe_configs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "tenant_stripe_configs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tenant_stripe_configs_rels" ADD CONSTRAINT "tenant_stripe_configs_rels_tenants_id_tenants_id_fk" FOREIGN KEY ("tenants_id") REFERENCES "tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "tenant_stripe_configs";
DROP TABLE "tenant_stripe_configs_rels";
ALTER TABLE "tenants_rels" DROP CONSTRAINT "tenants_rels_categories_id_categories_id_fk";

ALTER TABLE "tenants_domains" ALTER COLUMN "auto_generated" SET NOT NULL;
ALTER TABLE "customers" DROP COLUMN IF EXISTS "email";
ALTER TABLE "tenants_rels" DROP COLUMN IF EXISTS "categories_id";`);

};
