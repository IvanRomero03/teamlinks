

import csv

class Proyecto():
    def _init_(self,id,nombre,descripcion,pais,remoto,serviceRegion,estatus,fechaCreacion,fechaEstatusChange,adminId,admin,reclutadorId
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
        self.Requirement=Requirement
        



#for celda in .csv :
    #p1=Proyecto(celda k2, #celda...)
    
    #mandar p1 a base de datos


