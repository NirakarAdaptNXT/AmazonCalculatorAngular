import { Component, OnInit } from '@angular/core';
import { CalculatorApiService } from '../../services/calculatorapi.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  categories:string[]|null=null;
  category:string='';

  subcategories:string[]|null=null;
  subcategory:string='Select your SubCategory';

  price:number=999;
  weight:number=999;

  shippingway:string|null='Select Shipping Method';
  isviewshippingarea:boolean=true;

  shippingarea:string|null='Select Shipping Area';

  shippingcost:string|null=null;

  output:any={};

  constructor(private apicalc:CalculatorApiService) { }

  ngOnInit(): void {
    this.apicalc.getCategories().subscribe((data:any) =>this.categories=data);
  }
  
  getSubCategory(e:any):void{
    //alert(e.target.value)
    console.log(this.category);
    if(this.category!='Select your Category'){
      this.apicalc.getSubCategories(this.category).subscribe((data:any) =>{
        console.log(data);
        return this.subcategories = data;
      });
    }
    else{
      this.subcategory='Select your SubCategory';
      this.subcategories=null;
      this.price=999;
      this.weight=999;
      this.shippingway='Select Shipping Method';
      this.shippingarea='Select Shipping Area';
      this.shippingcost=null;
      this.output={};
    }
  }

  showNext():void{
    if(this.shippingway=='Self Ship'){
      this.isviewshippingarea=false;
    }
    else{
      this.isviewshippingarea=true;
    }
  }  

  OnsubCategorySelect(e:any){
    //alert(e.target.value);
    if(e.target.value=='Select your SubCategory'){
      this.price=999;
      this.weight=999;
      this.shippingway='Select Shipping Method';
      this.shippingarea='Select Shipping Area';
      this.shippingcost=null;
      this.output={};
    }
    if(e.target.value!='Select your SubCategory' && this.price!=null && this.weight!=null 
    && this.shippingway!='Select Shipping Method' ){
      if(this.shippingway!='Self Ship' && this.shippingarea!='Select Shipping Area'){
        this.viewOutput();
      } 
      else if(this.shippingway=='Self Ship' ){
        this.viewOutput();
      }     
    }
  }

  onPriceChange(){
    if( this.shippingway!='Select Shipping Method' && this.subcategory!='Select your SubCategory'){
      if(this.shippingway!='Self Ship' && this.shippingarea!='Select Shipping Area' && this.weight!=null ){
        this.viewOutput();
      }
      else if(this.shippingway=='Self Ship'){
        this.viewOutput();
      }         
    }
  }

  onWeightChange(){
    if(this.subcategory!='Select your SubCategory' && this.price!=null  
    && this.shippingway!='Select Shipping Method' && this.shippingarea!='Select Shipping Area' ){
        if(this.shippingway!='Self Ship' && this.shippingarea!='Select Shipping Area'){
          this.viewOutput();
        }
    }
  }

  onShippingWaySelect(){
    if(this.shippingway=='Select Shipping Method'){
      this.shippingarea='Select Shipping Area';
      this.shippingcost=null;
    }
    if(this.subcategory!='Select your SubCategory' && this.price!=null && this.weight !=null && 
    this.shippingway!='Select Shipping Method'){
      if(this.shippingway!='Self Ship' && this.shippingarea!='Select Shipping Area'){
        this.viewOutput();
      }
      else if(this.shippingway=='Self Ship'){
        this.viewOutput();
      } 
    }
  }

  OnShippingAreaSelect(e:any){
    if(e.target.value!='Select Shipping Area' && this.shippingway!='Select Shipping Method' &&
             this.subcategory!='Select your SubCategory'  && this.weight !=null && this.price!=null){
        this.viewOutput();
    }
  }

  onShippingCostChange(){
    if( this.shippingway!='Select Shipping Method' &&
             this.subcategory!='Select your SubCategory' && this.price!=null){
        this.viewOutput();
    }
  }

  viewOutput():void{
    var details={};
    
      details={
        "product_catagory":this.category,
        "product_sub_catagory":this.subcategory,
        "sell_price_of_product":this.price,
        "weight_of_product":this.weight,
        "ways_of_shipping":this.shippingway,
        "shipping_charge":this.shippingcost,
        "shipping_zone":this.shippingarea
      }
      

      this.apicalc.getOutput(details).subscribe((data:any) =>{
        console.log(data);
        console.log(Object.values(data));
        console.log(JSON.stringify(data));
        this.output = data;
       });

  }
}

