import { Injectable } from '@angular/core';

import { Product } from './product.entity';

@Injectable()
export class ProductService {

    public products: Product[];

    constructor() {
        this.products = [
            { id: 'p01', name: 'Book', price: 120, photo: 'siba.jpg' , desc: 'Hard copy version of the book.' , brief: 'Brief Description of what is happening on the book' , video:'video.mp4'},
            { id: 'p02', name: 'CD', price: 100, photo: 'cd.jpeg' , desc:'Audio version of the book.' , brief: 'Brief Description of what is happening ' , video:'video.mp4'}
        ];
    }

    findAll(): Product[] {
        return this.products;
    }

    find(id: string): Product {
        return this.products[this.getSelectedIndex(id)];
    }

    public getSelectedIndex(id: string) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                return i;
            }
        }
        return -1;
    }

}