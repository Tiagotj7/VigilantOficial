-- CreateEnum
CREATE TYPE "OrgRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "MonitorKind" AS ENUM ('WEB', 'DB', 'VPS', 'TCP');

-- CreateEnum
CREATE TYPE "MonitorStatus" AS ENUM ('ONLINE', 'OFFLINE', 'DEGRADED', 'PAUSED');

-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('INVESTIGATING', 'IDENTIFIED', 'MONITORING', 'RESOLVED');

-- CreateEnum
CREATE TYPE "IntegrationType" AS ENUM ('SLACK', 'DISCORD', 'WEBHOOK', 'EMAIL');

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memberships" (
    "id" UUID NOT NULL,
    "role" "OrgRole" NOT NULL DEFAULT 'MEMBER',
    "organization_id" UUID NOT NULL,
    "profile_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monitors" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "kind" "MonitorKind" NOT NULL DEFAULT 'WEB',
    "status" "MonitorStatus" NOT NULL DEFAULT 'ONLINE',
    "interval_sec" INTEGER NOT NULL DEFAULT 60,
    "last_check_at" TIMESTAMP(3),
    "last_latency_ms" INTEGER,
    "uptime_pct" DECIMAL(5,2) NOT NULL DEFAULT 100,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "monitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monitor_checks" (
    "id" UUID NOT NULL,
    "monitor_id" UUID NOT NULL,
    "status" "MonitorStatus" NOT NULL,
    "latency_ms" INTEGER,
    "status_code" INTEGER,
    "checked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "monitor_checks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incidents" (
    "id" UUID NOT NULL,
    "monitor_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "status" "IncidentStatus" NOT NULL DEFAULT 'INVESTIGATING',
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP(3),
    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incident_updates" (
    "id" UUID NOT NULL,
    "incident_id" UUID NOT NULL,
    "author_id" UUID,
    "status" "IncidentStatus" NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "incident_updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_pages" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "status_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integrations" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "type" "IntegrationType" NOT NULL,
    "config" JSONB NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "integrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");
CREATE UNIQUE INDEX "organizations_slug_key" ON "organizations"("slug");
CREATE UNIQUE INDEX "memberships_organization_id_profile_id_key" ON "memberships"("organization_id", "profile_id");
CREATE INDEX "monitors_organization_id_idx" ON "monitors"("organization_id");
CREATE INDEX "monitor_checks_monitor_id_checked_at_idx" ON "monitor_checks"("monitor_id", "checked_at");
CREATE INDEX "incidents_monitor_id_idx" ON "incidents"("monitor_id");
CREATE UNIQUE INDEX "status_pages_slug_key" ON "status_pages"("slug");
CREATE INDEX "status_pages_organization_id_idx" ON "status_pages"("organization_id");
CREATE INDEX "integrations_organization_id_idx" ON "integrations"("organization_id");

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "monitors" ADD CONSTRAINT "monitors_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "monitor_checks" ADD CONSTRAINT "monitor_checks_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "incident_updates" ADD CONSTRAINT "incident_updates_incident_id_fkey" FOREIGN KEY ("incident_id") REFERENCES "incidents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "incident_updates" ADD CONSTRAINT "incident_updates_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "status_pages" ADD CONSTRAINT "status_pages_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
