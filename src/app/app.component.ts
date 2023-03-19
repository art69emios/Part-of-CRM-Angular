import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface localItemsInterface {
  id:number,
  name:string,
  items:itemsInterface[],
}

interface itemsInterface {
  id:number,
  name:string,
  GLCode:number,
  amount:number,
  salesTax:salesTaxInterface
}

interface salesTaxInterface {
  id:number,
  title:string,
  value:number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  totalSum:number = 0
  totalAmount:number = 1
  flag: boolean = false
  itemCategory = [
    'Category',
    'Items',
    'Price',
    'Amount',
    'Sales Tax',
    'Total'
  ]

  localItems:localItemsInterface[] = [{
    id: 0,
    name: 'Category 1',
    items: [{
        id:0,
        GLCode: 1,
        name:'Item 1',
        amount: 1,
        salesTax:{id:1 , title: '', value: 0}
      }]
  }]

  salectedTax:salesTaxInterface[] = [
    {id: 1, title:'not value', value: 0},
    {id: 1, title:'NY', value: 10},
    {id: 1, title:'Bristol', value: 20},
  ]

  addCategory(){
    this.localItems.push({
      id: -(new Date().getTime()),
      name: 'Category',
      items: [{
        id: -(new Date().getTime()),
        GLCode: 1,
        name:'Item',
        amount: 1,
        salesTax:{id:1 , title: '', value: 0}
      }]
    })
  }

  addItem(item:localItemsInterface){
    item.items.push({
        id: -(new Date().getTime()),
        GLCode: 0,
        name:'Item',
        amount: 0,
        salesTax:{id:1 , title: '', value: 0}
      })
  }

  removeCategory(item:localItemsInterface){
    let idX = this.localItems.findIndex((items) => items.id === item.id)
    this.localItems.splice(idX, 1)
  }

  removeItem(itemId: localItemsInterface, index: number) {
    itemId.items.splice(index, 1);
  }

  onSubmit(myForm: NgForm){
    console.log(myForm);
    this.flag = true
  }

  getTotal(isAmount: boolean){
    let total = 0
    this.localItems.forEach(item => {
      total = item.items.reduce((acc, curr) => {
        if(isAmount){
          return +acc + +curr.amount 
        }
        return +acc + +curr.salesTax.value * +curr.GLCode
      }, total)
    })
    if(isAmount) this.totalAmount = total
    else this.totalSum = total
  }
}
