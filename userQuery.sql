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

