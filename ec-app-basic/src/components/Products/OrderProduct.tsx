import React from 'react'
import { auth, db, timestamp } from '../../firebase';
import { collection, doc, getDoc, writeBatch } from 'firebase/firestore';

const OrderProduct = (productsInCart, price) => {
    return async () => {
        console.log("OrderProduct")
        const uid = auth.currentUser?.uid;
        const userRef = collection(db, "users", uid);
        let products = {};
        let soldOutProducts = [];

        const batch = writeBatch(db);

        for (const product of productsInCart) {
            const snapshot = await getDoc(doc(db, product.productId))
            const sizes = snapshot.data().sizes;

            // Create a new array of the product sizes
            const updateSizes = sizes.map(size => {
                if (size.size === product.size) {
                    if (size.quantity === 0) {
                        soldOutProducts.push(product.name);
                        return size
                    }
                    return {
                        size: size.size,
                        quantity: size.quantity - 1
                    }
                } else {
                    return size
                }
            });

            products[product.productId] = {
                id: product.productId,
                images: product.images,
                name: product.name,
                price: product.price,
                size: product.size
            };

            batch.update(doc(db, 'products', product.productId), { sizes: updateSizes });
            batch.delete(doc(userRef, "cart"));
        }

        if (soldOutProducts.length > 0) {
            const errorMessage = (soldOutProducts.length > 1) ? soldOutProducts.join('と') : soldOutProducts[0];
            alert('大変申し訳ありません。' + errorMessage + 'が在庫切れとなったため注文処理を中断しました。');
            return false
        } else {
            // 注文履歴データを作成
            const orderRef = doc(userRef, 'orders');
            const date = timestamp.toDate();
            // 配送日を3日後に設定
            const shippingDate = timestamp.fromDate(new Date(date.setDate(date.getDate() + 3)));

            const history = {
                amount: price,
                created_at: timestamp,
                id: orderRef.id,
                products: products,
                shipping_date: shippingDate,
                updated_at: timestamp
            };

            batch.set(orderRef, history, { merge: true });

        }
    }
}

export default OrderProduct