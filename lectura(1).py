import csv
 
#import asyncio
from prisma import Prisma

class Proyecto():
    def __init__(self,id, nombre,descripcion,pais,remoto,serviceRegion,estatus,fechaCreacion,fechaEstatusChange,adminId,admin,reclutadorId
            ,reclutador,numPosicionesTot):
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
        self.Departamento=Departamento
        self.Requirement=Requirement
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
     def __init__(self,id,jobTitle,descripcion,tipo,employee,contractor,deptOrgFieldValue,genus,hireCategory,mustHaves,estatus,fechaCreacion,fechaEstatusChange,numPosiciones,numPosicionesDisponibles):
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
     def __init__(self,id,sessionToken,userId):
        self.id=id
        self.sessionToken=sessionToken
        self.userId=userId
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

with open('formas_normal_2.csv', 'r') as file:
    cs=csv.reader(file)
    next(file)
    for line in cs:

        proyecto_lista.append(Proyecto(line[10],  #id
                                       line[12],  #nombre
                                       line[19],  #descripcion
                                       line[15],  #pais
                                       line[16],  #remto
                                       line[17],  #serviceRegion
                                       line[3],   #estatus
                                       line[23],  #fechaCreacion
                                       line[43],  #fechaEstatusChange
                                       line[51], #adminId
                                       line[51], #reclutadorId
                                       line[22],  #reclutador
                                       line[24],  #numPosicionesTot
                                       line[41],  #numPosicionesDis
                                        ))
        
        departamento_lista.append(Departamento(line[5], #id
                                               line[50], #nombre
                                               line[10], #proyectoId
                                               line[51],#adminId
                                               line[51],#reclutadorId
                                        ))
        
        admin_lista.append(Admin(line[51], #id
                                 line[51], #user
                                 line[10],  #proyectoId
                                 line[5],   #departamentoId
                                        ))
        
        reclutador_lista.append(Reclutador(line[51], #id
                                           line[22],  #user
                                           line[15],  #country
                                           line[51], #tecPrincipal
                                           line[51], #tecSecundaria
                                           line[51], #aplicacion
                                           line[10],  #proyecto
                                           line[5],   #departamentoId
                                        ))
        
        aplicacion_lista.append(Aplicacion(line[0],   #id
                                           line[51], #nombre
                                           line[44],  #fechaCreacion
                                           line[51], #candidatoId
                                           line[51], #reclutadorId
                                        ))
        
        mustHaves_lista.append(MustHaves(line[51], #id
                                         line[9], #name
                                         line[51], #puestosId
                                        ))
        
        puestos_lista.append(Puestos(line[51], #id
                                     line[4], #jobTitle
                                     line[51], #descripcion
                                     line[2], #employee
                                     line[2], #contractor
                                     line[5], #deptOrgFieldValue
                                     line[6], #genus
                                     line[8], #hireCategory
                                     line[9], #mustHaves
                                     line[3], #estatus
                                     line[23], #fechaCreacion
                                     line[43], #fechaEstatusChange
                                     line[24], #numPosiciones
                                     line[41], #numPosicionesDis
                                     line[10], #proyectoId
                                        ))
        
        user_lista.append(User(line[51], #id
                               line[51], #name
                               line[51], #email
                               line[51], #emailVerified
                               line[51], #image
                               line[51], #accounts
                               line[51], #sessions
                               line[51], #candidatoId
                               line[51], #reclutadorId
                               line[51], #adminId
                                        ))
        
        session_lista.append(Session(line[51], #id
                                     line[51], #sessionToken
                                     line[51], #userId
                                        ))
        
        verificationToken_lista.append(VerificationToken(line[51], #identifier
                                                         line[51], #token
                                                         line[51], #expires
                                        ))
        
        requirement_lista.append(Requirement(line[51], #id
                                             line[51], #name
                                             line[51], #proyectoId
                                        ))
        
        invitation_lista.append(Invitation(line[51], #id
                                           line[51], #email
                                           line[51], #createdAt
                                        ))


for obj in puestos_lista:
     print(obj.jobTitle)

admin = [Prisma.admin.create(id=obj["id"], user=obj["user"], Departamentoid=obj["departamentoId"], Proyectoid=obj["proyectoId"],) for obj in admin_lista]
