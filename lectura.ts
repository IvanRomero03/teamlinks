import { PrismaClient } from "@prisma/client";
import { env } from "y/env.mjs";
import csvParser from "csv-parser";
import fs from "fs";
import { prisma } from "y/server/db";




const results: string[] = getDataFromCsv();

function getDataFromCsv(): string {
    
    fs.createReadStream('formas_normal.csv')
  .pipe(csvParser())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    return results;
  });

}

