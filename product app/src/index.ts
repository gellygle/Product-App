import fs from 'fs';

interface Product {
   id: string;
   name: string;
   unit_price: number;
   quantity: number;
}

let productData: Product[] = [];

if (fs.existsSync('./data.json')) {
   const fileData = fs.readFileSync('./data.json', 'utf8');
   productData = JSON.parse(fileData);
}



/*                       CREATE A PRODUCT                         */

//hh


function addProduct(newProduct: Product) {
   const isDuplicate = productData.some((product) => product.id === newProduct.id);
   if (isDuplicate) {
      console.log('ERROR!! PRODUCT WITH THE SAME ID ALREADY EXIST.');
   } else {
      productData.push(newProduct);
      fs.writeFileSync('./data.json', JSON.stringify(productData, null, 2));
      console.log('PRODUCT ADDED SUCCESSFULLY ');
   }
 }





 /*                      LIST ALL PRODUCTS                                   */

function productList() {

   const availableStocks = productData.filter((product) => product.quantity >= 1);
   availableStocks.sort((a, b) => b.id.localeCompare(a.id)); 

   availableStocks.forEach((product) => {
      const total_price = product.unit_price * product.quantity; 
      console.log(`Product Name: ${product.name}\tUnit Price: ${product.unit_price}\tTotal Price: ${total_price}`);
   });
}



/*                     UPDATE PRODUCTS                                      */


function updateProduct(productId: string, quantity: number, unitPrice: number) {

   const productIndex = productData.findIndex((product) => product.id === productId);
   if (productIndex === -1) {
      console.log('Product with id provided doesnt exist ...Cant Update!!!!!!!!');
   } else {

      productData[productIndex].quantity = quantity;
      productData[productIndex].unit_price = unitPrice;

      fs.writeFileSync('./data.json', JSON.stringify(productData, null, 2));
      console.log('PRODUCT UPDATED SUCCESSFULLY!!!!!!!! ');
   }

}


/*                         ADD NEW PRODUCT                                     */

const newProduct: Product = {
   id: "6",
   name: "Toy",
   quantity: 53,
   unit_price: 45
};

addProduct(newProduct);
productList()

const productUpdates: Product = {
  id: "2",
  quantity: 20,
  unit_price: 2,
  name: ''
};

updateProduct(productUpdates.id, productUpdates.quantity, productUpdates.unit_price);
productList();



/*                    REMOVE A PRODUCT CURRENTLY CANT REMOVE PRODUCT                              */

function removeProduct(productId: string){
  const productIndex = productData.findIndex((product) => product.id === productId);
  if (productIndex === -1) {
     console.log('Product with id provided doesnt exist ...Cant Update!!!!!!!!');
  }else{
    productData.splice(productIndex,1);
    fs.writeFileSync('./data.json', JSON.stringify(productData, null, 2));
    console.log('PRODUCT REMOVED SUCCESSFULLY ');

  }

}

const productToRemove: Product = {
 id: "4",
 name: '',
 unit_price: 0,
 quantity: 0
};

removeProduct(productToRemove.id);
