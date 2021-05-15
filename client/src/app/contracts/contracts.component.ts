import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { Contract } from '../models/contract';
import { Product } from '../models/product';
import { ContractsService } from '../services/contracts.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  id: string;
  contracts = [];

  constructor(private route: ActivatedRoute, private contractsService: ContractsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
    })

    this.contractsService.getAllContracts(this.id).toPromise()
    .then((data) => {
      console.log(data[0]);
      for(let contract of (data as any)) {
        let newContract = new Contract(contract.contractnumber, contract.enddate, contract.startdate, contract.status);
        newContract.id = contract.sfid;
        this.contracts.push(newContract);
      }

      for(let contract of this.contracts) {
        console.log(contract.id);
        this.contractsService.getProductsByContractId(contract.id).toPromise()
        .then((data) => {
          console.log(data);
          let products = [];
          for(let product of (data as any)) {
            let newProduct = new Product(product.product_name__c, product.quantity, product.totalprice, product.contract__c);
            products.push(newProduct);
          }
          contract.products = products;
        })
      }
    })
  }

  

}
