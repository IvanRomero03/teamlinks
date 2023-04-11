

import csv
import asyncio
from prisma import Prisma











class Proyecto():
    def __init__(self,id):
        self.id=id
    """def _init2_(self,id,nombre,descripcion,pais,remoto,serviceRegion,estatus,fechaCreacion,fechaEstatusChange,adminId,admin,reclutadorId
            ,reclutador,numPosicionesTot,numPosicionesDis, puesto,Departamento, departamentoId,Requirement  ):
        self.id=id 
        self.nombre=nombre
        self.descripcion=descripcion
        self.pais=pais
        self.remoto=remoto
        self.serviceRegion=serviceRegion
        self.estatus=estatus
        self.fechaCreacion=fechaCreacion
        self.fechaEstatusChange=fechaEstatusChange
        self.adminId=adminId
        self.admin=admin
        self.reclutadorId=reclutadorId
        self.reclutador=reclutador
        self.numPosicionesTot=numPosicionesTot
        self.numPosicionesDis=numPosicionesDis
        self.puesto=puesto
        self.Departamento=Departamento
        self.departamentoId=departamentoId
        self.Requirement=Requirement """
        
proyectos_lista=[]

with open('formas_normal.csv', 'r') as file:
    cs=csv.reader(file)
    
    next(file)

    
    

    for line in cs:
        
        proyectos_lista.append(Proyecto(line[10]))
        
async def main() -> None:
        db = Prisma()
        await db.connect()
        #queries

    
        

        await db.disconnect()
        if __name__ == '__main__':
            asyncio.run(main())


        

    









#for celda in .csv :
    #p1=Proyecto(celda k2, #celda...)
    
    #mandar p1 a base de datos


