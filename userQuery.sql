use alquitrack;
select * from usuario;

select * from empleado;

INSERT INTO empleado(`nombre`,`apellido`,`telefono`,`direccion`,`fechaNacimiento`,`status`,`createdAt`,`updatedAt`,`PaiId`,`tipoEmpleadoId`,`estadoempleadoId`,`SedeId`)
values('Walter','Cordero','+502 5825-7897','Ciudad de Guatemala','1987-11-10',1,NOW(),NOW(),1,1,1,1);

select * from pais;
select * from tipoempleado;
select * from estadoempleado;
select * from sede;

select * from rol;

delete from usuario where id = 2;

alter table empleado auto_increment = 0;
alter table usuario auto_increment = 0;

select * from tipoalquiler;
select * from tipoequipo;
select * from precioEquipo;

select * from usuario;
select * from empleado;

update empleado set status = 1 where id = 3;

update usuario set status = 1 where id = 3;

delete from usuario where id in(3,4);

select * from tipousuario;
select * from rol;

select * from tipocredito;

insert into tipocredito (`descripcion`, `status`, `createdAt`, `updatedAt`,`diasCredito`)
values ('15 dias', 1, now(), now(), 15);

insert into tipocredito (`descripcion`, `status`, `createdAt`, `updatedAt`,`diasCredito`)
values ('30 dias', 1, now(), now(), 30);

insert into tipocredito (`descripcion`, `status`, `createdAt`, `updatedAt`,`diasCredito`)
values ('45 dias', 1, now(), now(), 45);

insert into tipocredito (`descripcion`, `status`, `createdAt`, `updatedAt`,`diasCredito`)
values ('60 dias', 1, now(), now(), 60);

select* from tractor;

select * from tipocliente;

Insert into tipocliente (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Empresa',1,NOW(),NOW());

Insert into tipocliente (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Desarrolladora',1,NOW(),NOW());

Insert into tipocliente (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Constructora',1,NOW(),NOW());

Insert into tipocliente (`descripcion`,`status`,`createdAt`,`updatedAt`)
values('Persona Individual',1,NOW(),NOW());


select * from estadoPedido;
-- estadoPedido
select * from reserva;
select * from reservadetalle;

select * from factura;
select * from facturadetalle;

select * from cliente;



select * from tipoalquiler;


select * from tipoequipo;
select * from precioequipo;

select * from tractor;

select * from monedapais;












select * from reserva;

select * from reservadetalle;


select * from tractor;


select * from precioequipo;

select * from estadoequipo;

update reserva set status = 0 where id in (1,2,3,4,5,6,7,8,9,10);
update reservadetalle set status = 0 where id in (1,2,3,4,5,6,7,8,9,10);
update tractor set estadoEquipoId = 1 where id =1;

