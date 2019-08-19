import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../services/item.entity';
import { Product } from '../services/product.entity';
import { ProductService } from '../services/product.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	public items: Item[] = [];
	public total: number = 0;

	constructor(
		public activatedRoute: ActivatedRoute,
		public productService: ProductService,
		private alertService: AlertService
	) { }
	showAlerts(): void{
        // For normal messages
        this.alertService.info('this is an info alert');
        this.alertService.danger('this is a danger alert');
        this.alertService.success('this is a success alert');
        this.alertService.warning('this is a warning alert');
        
        // For html messages:
        this.alertService.warning({html: '<b>This message is bold</b>'});
    }    
	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			var id = params['id'];
			if (id) {
				var item: Item = {
					product: this.productService.find(id),
					quantity: 1
				};
				if (localStorage.getItem('cart') == null) {
					let cart: any = [];
					cart.push(JSON.stringify(item));
					localStorage.setItem('cart', JSON.stringify(cart));
				} else {
					let cart: any = JSON.parse(localStorage.getItem('cart'));
					let index: number = -1;
					for (var i = 0; i < cart.length; i++) {
						let item: Item = JSON.parse(cart[i]);
						if (item.product.id == id) {
							index = i;
							break;
						}
					}
					if (index == -1) {
						cart.push(JSON.stringify(item));
						localStorage.setItem('cart', JSON.stringify(cart));
					} else {
						let item: Item = JSON.parse(cart[index]);
						item.quantity += 1;
						cart[index] = JSON.stringify(item);
						localStorage.setItem("cart", JSON.stringify(cart));
					}
				}
				this.loadCart();
			} else {
				this.loadCart();
			}
		});
	}

	loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.price * item.quantity;
		}
	}

	remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product.id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}


}