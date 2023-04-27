import { createTRPCRouter } from "../../trpc";
import { protectedProcedure } from "../../trpc";
import {z} from "zod";
import { Proyecto } from "@prisma/client";

export const importRouter = createTRPCRouter({
    
 importExcel: protectedProcedure.input(
    z.object({
        
        idFile:z.string(),
    })) 
    .mutation(async ({ctx, input}) => {
        const {idFile} = input;
        interface Proyecto {
            id: line[10];
        nombre: string;
        descripcion: string;
        }
        // interface Proyecto
        
    })
})
