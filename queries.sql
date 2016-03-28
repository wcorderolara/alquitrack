/*Insert de paises*/

Insert into Pais (`descripcion`,`flag`,`status`,`createdAt`,`updatedAt`)
values('Guatemala','http://res.cloudinary.com/crmprobns/image/upload/v1459128652/bander_guatemala_s6n6cl.png',1,NOW(),NOW());

Insert into Pais (`descripcion`,`flag`,`status`,`createdAt`,`updatedAt`)
values('El Salvador','http://res.cloudinary.com/crmprobns/image/upload/v1459128652/bandera_salvador_p6rjav.png',1,NOW(),NOW());

Insert into Pais (`descripcion`,`flag`,`status`,`createdAt`,`updatedAt`)
values('Costa Rica','http://res.cloudinary.com/crmprobns/image/upload/v1459128652/bandera_costa_rica_nfjojh.jpg',1,NOW(),NOW());

/*tipo de Empleados*/
Insert into tipoempleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Administrativo',1,NOW(),NOW());

Insert into tipoempleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Vendedor',1,NOW(),NOW());

Insert into tipoempleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Facturador',1,NOW(),NOW());

Insert into tipoempleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Cobrador',1,NOW(),NOW());

Insert into tipoempleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Operador',1,NOW(),NOW());

/*estados de empleado*/
Insert into estadoempleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Activo',1,NOW(),NOW());

Insert into estadoempleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Suspendido',1,NOW(),NOW());

Insert into estadoempleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Vacaciones',1,NOW(),NOW());

Insert into estadoempleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Despedido',1,NOW(),NOW());

Insert into estadoempleado (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Nuevo',1,NOW(),NOW());

/*Estdos del equipo*/

Insert into estadoequipo (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Disponible',1,NOW(),NOW());

Insert into estadoequipo (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('En alquiler',1,NOW(),NOW());

Insert into estadoequipo (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('En Reparacion',1,NOW(),NOW());

Insert into estadoequipo (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Retirado',1,NOW(),NOW());

/*Sedes*/
Insert into sede (`descripcion`,`status`,`createdAt`,`updatedAt`, `PaiId`)
values('Sede de Guatemala',1,NOW(),NOW(),1);

Insert into sede (`descripcion`,`status`,`createdAt`,`updatedAt`, `PaiId`)
values('Sede de El Salvador',1,NOW(),NOW(),2);

Insert into sede (`descripcion`,`status`,`createdAt`,`updatedAt`, `PaiId`)
values('Sede de Costa Rica',1,NOW(),NOW(),3);

/*Tipos de usuario*/
Insert into tipousuario (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Administrativo',1,NOW(),NOW());

Insert into tipousuario (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Vendedor',1,NOW(),NOW());

Insert into tipousuario (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Facturador',1,NOW(),NOW());

Insert into tipousuario (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Reportes',1,NOW(),NOW());

/*Roles*/
Insert into rol (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Administrador',1,NOW(),NOW());

Insert into rol (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Vendedor',1,NOW(),NOW());

Insert into rol (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Facturador',1,NOW(),NOW());

Insert into rol (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Reportes',1,NOW(),NOW());













