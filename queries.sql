/*Insert de paises*/

Insert into pais (`descripcion`,`flag`,`status`,`createdAt`,`updatedAt`)
values('Guatemala','http://res.cloudinary.com/crmprobns/image/upload/v1459128652/bander_guatemala_s6n6cl.png',1,NOW(),NOW());

Insert into pais (`descripcion`,`flag`,`status`,`createdAt`,`updatedAt`)
values('El Salvador','http://res.cloudinary.com/crmprobns/image/upload/v1459128652/bandera_salvador_p6rjav.png',1,NOW(),NOW());

Insert into pais (`descripcion`,`flag`,`status`,`createdAt`,`updatedAt`)
values('Costa Rica','http://res.cloudinary.com/crmprobns/image/upload/v1459128652/bandera_costa_rica_nfjojh.jpg',1,NOW(),NOW());

/*tipo de Empleados*/
Insert into tipoEmpleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Administrativo',1,NOW(),NOW());

Insert into tipoEmpleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Operario',1,NOW(),NOW());

-- Insert into tipoempleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
-- values('Facturador',1,NOW(),NOW());

-- Insert into tipoempleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
-- values('Cobrador',1,NOW(),NOW());

-- Insert into tipoempleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
-- values('Operador',1,NOW(),NOW());

/*estados de empleado*/
Insert into estadoEmpleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Activo',1,NOW(),NOW());

Insert into estadoEmpleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Suspendido',1,NOW(),NOW());

Insert into estadoEmpleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Vacaciones',1,NOW(),NOW());

Insert into estadoEmpleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Despedido',1,NOW(),NOW());

Insert into estadoEmpleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Nuevo',1,NOW(),NOW());

/*Estdos del equipo*/

Insert into estadoEquipo (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Disponible',1,NOW(),NOW());

Insert into estadoEquipo (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Alquiler',1,NOW(),NOW());

Insert into estadoEquipo (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Reparacion',1,NOW(),NOW());

Insert into estadoEquipo (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Retirado',1,NOW(),NOW());

/*Sedes*/
Insert into sede (`descripcion`,`status`,`createdAt`,`updatedAt`, `PaiId`)
values('Sede de Guatemala',1,NOW(),NOW(),1);

Insert into sede (`descripcion`,`status`,`createdAt`,`updatedAt`, `PaiId`)
values('Sede de El Salvador',1,NOW(),NOW(),2);

Insert into sede (`descripcion`,`status`,`createdAt`,`updatedAt`, `PaiId`)
values('Sede de Costa Rica',1,NOW(),NOW(),3);

/*Tipos de usuario*/
Insert into tipoUsuario (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Administrador',1,NOW(),NOW());

Insert into tipoUsuario (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Vendedor',1,NOW(),NOW());

Insert into tipoUsuario (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Facturador',1,NOW(),NOW());

Insert into tipoUsuario (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Reportes',1,NOW(),NOW());

Insert into tipoUsuario (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Cobros',1,NOW(),NOW());

/*Roles*/
Insert into rol (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Administrador',1,NOW(),NOW());

Insert into rol (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Vendedor',1,NOW(),NOW());

Insert into rol (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Facturador',1,NOW(),NOW());

Insert into rol (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Reportes',1,NOW(),NOW());

Insert into rol (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Supervisor',1,NOW(),NOW());

Insert into rol (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Cobrador',1,NOW(),NOW());

-- tipo credito
insert into tipoCredito (`descripcion`, `status`, `createdAt`, `updatedAt`,`diasCredito`)
values ('15 dias', 1, now(), now(), 15);

insert into tipoCredito (`descripcion`, `status`, `createdAt`, `updatedAt`,`diasCredito`)
values ('30 dias', 1, now(), now(), 30);

insert into tipoCredito (`descripcion`, `status`, `createdAt`, `updatedAt`,`diasCredito`)
values ('45 dias', 1, now(), now(), 45);

insert into tipoCredito (`descripcion`, `status`, `createdAt`, `updatedAt`,`diasCredito`)
values ('60 dias', 1, now(), now(), 60);

/*tipo de Empleados*/
Insert into tipoCliente (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Empresa',1,NOW(),NOW());

Insert into tipoCliente (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Desarrolladora',1,NOW(),NOW());

Insert into tipoCliente (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Constructora',1,NOW(),NOW());

Insert into tipoCliente (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Persona Individual',1,NOW(),NOW());

-- Estado Pedido
Insert into estadoPedido (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Activo',1,NOW(),NOW());

Insert into estadoPedido (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Facturado',1,NOW(),NOW());

Insert into estadoPedido (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Rechazado',1,NOW(),NOW());

Insert into estadoPedido (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Cancelado',1,NOW(),NOW());

-- tipo Alquiler
insert into tipoAlquiler (`descripcion`,`status`,`createdAt`,`updatedAt`, `horasMinimas`)
values('diario',1,NOW(),NOW(),8);

insert into tipoAlquiler (`descripcion`,`status`,`createdAt`,`updatedAt`, `horasMinimas`)
values('semanal',1,NOW(),NOW(),44);

insert into tipoAlquiler (`descripcion`,`status`,`createdAt`,`updatedAt`, `horasMinimas`)
values('mensual 176',1,NOW(),NOW(),176);

insert into tipoAlquiler (`descripcion`,`status`,`createdAt`,`updatedAt`, `horasMinimas`)
values('mensual 200',1,NOW(),NOW(),200);


-- tipo Pago
insert into tipoPago (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('efectivo',1,NOW(),NOW());

insert into tipoPago (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('cheque',1,NOW(),NOW());

--tipo Operacion
insert into tipoOperacion (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Pago de Contado',1,NOW(),NOW());

insert into tipoOperacion (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Credito',1,NOW(),NOW());

insert into tipoOperacion (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Abono',1,NOW(),NOW());

insert into tipoOperacion (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Pago Total',1,NOW(),NOW());

--Monedas
INSERT INTO monedaPais (`descripcion`,`simbolo`,`status`,`createdAt`,`updatedAt`,`paisId`)
VALUES('Quetzal','Q.',1,NOW(),NOW(),1);











