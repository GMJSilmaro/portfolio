-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "LocationSource" AS ENUM ('VERCEL', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "DeviceLocationSource" AS ENUM ('NONE', 'BROWSER', 'DENIED', 'UNSUPPORTED', 'TIMEOUT', 'ERROR');

-- CreateTable
CREATE TABLE "login_activity" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_ip" TEXT NOT NULL,
    "ip_city" TEXT,
    "ip_region" TEXT,
    "ip_country" TEXT,
    "ip_location_source" "LocationSource" NOT NULL DEFAULT 'UNAVAILABLE',
    "ip_location_unavailable" BOOLEAN NOT NULL DEFAULT true,
    "browser" TEXT,
    "os" TEXT,
    "user_agent" TEXT,
    "device_latitude" DOUBLE PRECISION,
    "device_longitude" DOUBLE PRECISION,
    "device_accuracy_m" DOUBLE PRECISION,
    "device_captured_at" TIMESTAMP(3),
    "device_location_source" "DeviceLocationSource" NOT NULL DEFAULT 'NONE',

    CONSTRAINT "login_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login_attempt" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_ip" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "login_attempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "login_activity_created_at_idx" ON "login_activity"("created_at");

-- CreateIndex
CREATE INDEX "login_attempt_client_ip_created_at_idx" ON "login_attempt"("client_ip", "created_at");
