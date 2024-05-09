import React, { useCallback, useEffect, useState } from 'react'

import { returnCodeToBr } from "../function/common";
import { ImageSwiper, SizeTable } from "../components/Products";

import { db, timestamp, auth } from '../firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

// カートに追加するメソッド
const addProductToCart = async (addedProduct, type) => {
    switch (type) {
        case 'add':
            try {
                console.log('cartに追加')
                const collectionPath = collection(db, "users", auth.currentUser?.uid, "cart");
                // add
                const cartRef = doc(collectionPath)
                addedProduct['cartId'] = cartRef.id;
                // modify となっている
                await setDoc(cartRef, addedProduct)
            } catch (error) {
                console.log(`There was an error: ${error}`);
            }
            break;
        case 'fav':
            try {
                console.log('favに追加')
                const collectionPath = collection(db, "users", auth.currentUser?.uid, "fav");
                // add
                const cartRef = doc(collectionPath)
                addedProduct['favId'] = cartRef.id;
                // modify となっている
                await setDoc(cartRef, addedProduct)
            } catch (error) {
                console.log(`There was an error: ${error}`);
            }
            break;
        default:
            break;
    }

}

const ProductDetail = () => {
    const path = window.location.pathname;
    const id = path.split('/product/')[1];

    const [product, setProduct] = useState(null);

    // カートのバッチを更新するメソッド
    const addProduct = useCallback((selectedSize, type) => {
        // cartに追加
        addProductToCart({
            added_at: timestamp,
            description: product.description,
            gender: product.gender,
            images: product.images,
            name: product.name,
            price: product.price,
            productId: product.id,
            quantity: 1,
            size: selectedSize
        }, type)
    })

    useEffect(() => {
        (async () => {
            const docRef = doc(db, 'products', id);
            const docSnap = await getDoc(docRef)
            setProduct(docSnap.data())
        })()
    }, [id])

    return (
        <div className='c-section-wrapin'>
            {product && (
                <div className='p-gird__row'>
                    <div className='product-list'>
                        <ImageSwiper images={product.images} />
                    </div>
                    <div className='p_media__desc'>
                        <h2 className='u-text__headline'>{product.name}</h2>
                        {/* toLocaleString = 1,800の「,」を付けてくれる */}
                        <p>¥{(product.price).toLocaleString()}</p>
                        <div className="module-spacer--small" />
                        <SizeTable addProduct={addProduct} sizes={product.sizes} />
                        <div className="module-spacer--small" />
                        <p>{returnCodeToBr(product.description)}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetail