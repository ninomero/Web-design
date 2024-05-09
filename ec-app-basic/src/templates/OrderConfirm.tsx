
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router'

import { useCart } from './UserContext'
import { CartListItem } from '../components/Products'
import { PrimaryButton, TextDetail } from '../components/UIkit'

import { collection, doc, getDoc, writeBatch } from 'firebase/firestore'
import { db, timestamp, auth } from '../firebase'

import { Divider, List } from '@mui/material'

const OrderConfirm = () => {
    const [userCart] = useCart()
    const navigate = useNavigate()

    const subtotal = useMemo(() => {
        return userCart.reduce((sum, product) => sum += product.product.price, 0)
        // return 20
    }, [userCart])

    const shippingFee = useMemo(() =>
        (subtotal >= 10000) ? 0 : 210
        , [subtotal])

    const tax = useMemo(() =>
        Math.floor((subtotal + shippingFee) * 0.1)
        , [subtotal, shippingFee])

    const total = useMemo(() => subtotal + shippingFee + tax, [subtotal, shippingFee, tax])

    // const order = useCallback(() => {
    //     <OrderProduct productsInCart={userCart} price={total}/>
    // }, [userCart])

    const order = (productsInCart, price) => {
        return async () => {
            const uid = auth.currentUser?.uid;
            let products = [];
            let soldOutProducts = [];

            const batch = writeBatch(db);

            for (const product of productsInCart) {
                const snapshot = await getDoc(doc(db, "products", product.product.productId))
                const sizes = snapshot.data().sizes;

                // Create a new array of the product sizes
                const updateSizes = sizes.map(size => {
                    if (size.size === product.product.size) {
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

                products.push({
                    id: product.product.productId,
                    images: product.product.images,
                    name: product.product.name,
                    price: product.product.price,
                    size: product.product.size
                })

                batch.update(doc(db, 'products', product.product.productId), { sizes: updateSizes });
                batch.delete(doc(db, "users", uid, "cart", product.product.cartId));
            }

            if (soldOutProducts.length > 0) {
                const errorMessage = (soldOutProducts.length > 1) ? soldOutProducts.join('と') : soldOutProducts[0];
                alert('大変申し訳ありません。' + errorMessage + 'が在庫切れとなったため注文処理を中断しました。');
                return false
            } else {
                // 注文履歴データを作成
                const orderRef = doc(collection(db, "users", uid, "orders"));
                // const date = timestamp.toDate();
                // 配送日を3日後に設定
                // 日時の計算の仕方は調べる必要がある
                // const shippingDate = timestamp.fromDate(new Date(date.setDate(date.getDate() + 3)));

                const history = {
                    amount: price,
                    created_at: timestamp,
                    id: orderRef.id,
                    products: products,
                    shipping_date: timestamp,
                    updated_at: timestamp
                };

                batch.set(orderRef, history, { merge: true });
            }

            // Commit the batch
            await batch.commit();

            navigate('/order/confirmed')
        }
    }

    return (
        <section className='c-section-wrapin'>
            <h2 className='u-text__headline'>注文の確認</h2>
            <Divider />
            <div className='p-grid__row'>
                <div className='p_grid__left'>
                    <List>
                        {userCart.length > 0 && (
                            userCart.map(product => <CartListItem product={product} key={product.product.cartId} />)
                        )}
                    </List>
                </div>
                <div className='p_grid__right'>
                    <h1>ご注文内容</h1>
                    <TextDetail label={"小計"} value={"￥" + subtotal.toLocaleString()} />
                    <div className='module-spacer--extra-extra-small' />
                    <TextDetail label={"送料"} value={"￥" + shippingFee.toLocaleString()} />
                    <div className='module-spacer--extra-extra-small' />
                    <TextDetail label={"消費税"} value={"￥" + tax.toLocaleString()} />
                    <div className='module-spacer--extra-small' />
                    <Divider />
                    <div className='module-spacer--extra-small' />
                    <TextDetail label={"合計(税込み)"} value={"￥" + total.toLocaleString()} />
                    <div className='module-spacer--extra-small' />
                    <PrimaryButton label={"注文を確定する"} onClick={order(userCart, total)} />
                </div>
            </div>
            <Divider />
        </section>
    )
}

export default OrderConfirm