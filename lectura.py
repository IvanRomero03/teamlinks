

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
class Account():
     def __init__(self,id,userId,type,provider,providerAccountId,refresh_token,access_token,expires_at,token_type,scope,id_token,session_state,ext_expires_in,user):
          self.id=id
          self.userId=userId
          self.type=type
          self.provider=provider
          self.providerAccountId=providerAccountId
          self.refresh_token=refresh_token
          self.access_token=access_token
          self.expires_at=expires_at
          self.token_type=token_type
          self.scope=scope
          self.id_token=id_token
          self.session_state=session_state
          self.ext_expires_in=ext_expires_in
          self.user=user
class Departamento():
     def __init__(self,id,nombre,proyectoid,adminid,reclutadorid):
          self.id=id
          self.nombre=nombre #
          self.proyectoid=proyectoid
          self.adminid=adminid
          self.reclutadorid=reclutadorid
class Admin():
     def __init__(self,id,User,proyectoId,departamentoId):
          self.id=id
          self.User=User
          self.proyectoId=proyectoId
          self.departamentoId=departamentoId
class Reclutador():
     def __init__(self,id,user,country,tecPrincipal,tecSecundaria,aplicacion,proyecto,departamentoId):
          self.id=id
          self.user=user
          self.country=country
          self.tecPrincipal=tecPrincipal
          self.tecSecundaria=tecSecundaria
          self.aplicacion=aplicacion
          self.proyecto=proyecto
          self.departamentoId=departamentoId
class Candidato():
     def __init__(self,id,userId,tecPrincipal,tecSecundaria,pais,estado,ciudad,experiencia,ranking, aplicacionId):
        self.id=id
        self.userId=userId
        self.tecPrincipal=tecPrincipal
        self.tecSecundaria=tecSecundaria
        self.pais=pais
        self.estado=estado
        self.ciudad=ciudad
        self.experiencia=experiencia
        self.ranking=ranking
        self.aplicacionId=aplicacionId
class Aplicacion():
     def __init__(self,id,nombre,fechaCreacion,candidatoId,reclutadorId):
          self.id=id
          self.nombre=nombre
          self.fechaCreacion=fechaCreacion
          self.candidatoId=candidatoId
          self.reclutadorId=reclutadorId
class MustHaves():
     def __init__(self,id,name,puestosId):
          self.id=id
          self.name=name
          self.puestosId=puestosId
class Puestos():
     def __init__(self,id,jobTitle,descripcion,tipo,employee,contractor,deptOrgFieldValue,genus,hireCategory,mustHaves,estatus,fechaCreacion,fechaEstatusChange,numPosiciones,numPosicionesDisponibles,proyectoId):
        self.id=id
        self.jobTitle=jobTitle
        self.descripcion=descripcion
        self.tipo=tipo
        self.employee=employee
        self.contractor=contractor
        self.deptOrgFieldValue=deptOrgFieldValue
        self.genus=genus
        self.hireCategory=hireCategory
        self.mustHaves=mustHaves
        self.estatus=estatus
        self.fechaCreacion=fechaCreacion
        self.fechaEstatusChange=fechaEstatusChange
        self.numPosiciones=numPosiciones
        self.numPosicionesDisponibles=numPosicionesDisponibles
        self.proyectoId=proyectoId
class User():
     def __init__(self,id,name,email,emailVerified,image,accounts,sessions,candidatoId,reclutadorId,adminId):
          self.id=id
          self.name=name
          self.email=email
          self.emailVerified=emailVerified
          self.image=image
          self.accounts=accounts
          self.sessions=sessions
          self.candidatoId=candidatoId
          self.reclutadorId=reclutadorId
          self.adminId=adminId 
class Session():
     def __init__(self,id,sessionToken,userId,expires,user):
        self.id=id
        self.sessionToken=sessionToken
        self.userId=userId
        self.expires=expires
        self.user=user
class VerificationToken():
     def __init__(self,identifier,token,expires):
          self.identifier=identifier
          self.token=token
          self.expires=expires
class Requirement():
     def __init__(self,id,name,proyectoId):
          self.id=id
          self.name=name
          self.proyectoId=proyectoId
class Invitation():
     def __init__(self,id,email,createdAt):
          self.id=id
          self.email=email
          self.createdAt=createdAt          
            

proyecto_lista=[]
account_lista=[]
departamento_lista=[]
admin_lista=[]
reclutador_lista=[]
candidato_lista=[]
aplicacion_lista=[]
mustHaves_lista=[]
puestos_lista=[]
user_lista=[]
session_lista=[]
verificationToken_lista=[]
requirement_lista=[]
invitation_lista=[]




with open('formas_normal.csv', 'r') as file:
    cs=csv.reader(file)
    next(file)
    for line in cs:

        proyecto_lista.append(Proyecto(line[10]))


        
async def main() -> None:
        db = Prisma()
        await db.connect()
        #queries

    
        

        await db.disconnect()
        if __name__ == '__main__':
            asyncio.run(main())

    


