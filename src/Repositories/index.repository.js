// Initialization of DAOs
import { CartsDAO, ProductsDAO, UsersDAO } from "./DAOs/factory.js";
import CartsRepository from "./carts.repository.js"
import ProductsRepository from "./products.repository.js"
import UsersRepository from "./users.repository.js"

export const cartsRepository = new CartsRepository(new CartsDAO())
export const productsRepository = new ProductsRepository(new ProductsDAO())
export const usersRepository = new UsersRepository(new UsersDAO())