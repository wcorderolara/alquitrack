CREATE SCHEMA `alquitrack` ;

CREATE USER 'usAlquitrack'@'localhost' IDENTIFIED BY 'ALQUITRACKAdmin1';

GRANT ALL PRIVILEGES ON * . * TO 'usAlquitrack'@'localhost';