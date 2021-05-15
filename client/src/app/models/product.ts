import { Contract } from "./contract";

export class Product {

  id: string;
  name: string;
  contract: string;
  quantity: number;
  totalPrice: number;

  constructor(name?: string, quantity?: number, totalPrice?: number, contract?: string) {
    this.name = name;
    this.quantity = quantity,
    this.totalPrice = totalPrice,
    this.contract = contract
  }
}