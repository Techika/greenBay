-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema greenbay
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `greenbay` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `greenbay` ;

-- -----------------------------------------------------
-- Table `greenbay`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `greenbay`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `balance` INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `greenbay`.`sellable`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `greenbay`.`sellable` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `min_price` INT UNSIGNED NOT NULL,
  `max_price` INT UNSIGNED NULL,
  `sell_price` INT UNSIGNED NULL,
  `posted_at` INT UNSIGNED NOT NULL,
  `posted_until` INT UNSIGNED NULL,
  `sold_at` INT UNSIGNED NULL,
  `price_type` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `seller_id` INT UNSIGNED NOT NULL,
  `buyer_id` INT UNSIGNED NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `photo_url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`, `seller_id`),
  INDEX `fk_sellable_user_idx` (`seller_id` ASC) VISIBLE,
  INDEX `fk_sellable_user1_idx` (`buyer_id` ASC) VISIBLE,
  CONSTRAINT `fk_sellable_user`
    FOREIGN KEY (`seller_id`)
    REFERENCES `greenbay`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sellable_user1`
    FOREIGN KEY (`buyer_id`)
    REFERENCES `greenbay`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `greenbay`.`bid`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `greenbay`.`bid` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `bidder_id` INT UNSIGNED NOT NULL,
  `sellable_id` INT UNSIGNED NOT NULL,
  `bid_at` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `bidder_id`, `sellable_id`),
  INDEX `sellable_idx` (`sellable_id` ASC) VISIBLE,
  INDEX `bidder_idx` (`bidder_id` ASC) VISIBLE,
  CONSTRAINT `sellable`
    FOREIGN KEY (`sellable_id`)
    REFERENCES `greenbay`.`sellable` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `bidder`
    FOREIGN KEY (`bidder_id`)
    REFERENCES `greenbay`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
