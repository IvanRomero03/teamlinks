import { PrismaClient } from "@prisma/client";
import { env } from "y/env.mjs";
import csvParser from "csv-parser";
import fs from "fs";
import { prisma } from "y/server/db";

const results: string[] = getDataFromCsv();



