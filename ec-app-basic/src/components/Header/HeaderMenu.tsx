import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useCart, useUser, useFav } from '../../templates/UserContext';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';

// mui
import { FavoriteBorder, ShoppingCart } from '@mui/icons-material'
import { Badge, IconButton } from '@mui/material'
import DrawerMenu from './DrawerMenu';


const HeaderMenu = () => {
    const [userCart, setUserCart] = useCart()
    const [userInfo] = useUser()
    const [favItems, setFavItems] = useFav()
    const navigate = useNavigate()

    useEffect(() => {
        let tempCart = []

        if (userInfo.length !== 0 && userInfo !== null && userInfo !== undefined) {
            const q = query(collection(db, "users", userInfo?.uid, "cart"))
            const unsubscribe = onSnapshot(q, snapshots => {
                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data();
                    const changeType = change.type

                    switch (changeType) {
                        case 'added':
                            tempCart = [...tempCart, { product }]
                            break;
                        // カートに追加(firebaseに追加)する処理を改善する必要あり
                        // ドキュメントのIDを発行しながら追加する必要がある
                        // case 'modified':
                        //     const index = tempCart.findIndex(product => product.product.cartId === change.doc.id)
                        //     tempCart[index] = product;
                        //     break;
                        case 'removed':
                            tempCart = tempCart.filter(product => product.product.cartId !== change.doc.id);
                            break;
                        default:
                            break;
                    }
                });

                // 変化したカート情報をコンテキストにセットする
                setUserCart(tempCart)
            })
            return () => unsubscribe
        }
    }, [setFavItems, setUserCart, userInfo])

    return (
        <>
            <IconButton onClick={() => navigate('/cart')}>
                <Badge badgeContent={userCart.length} color='primary'>
                    <ShoppingCart />
                </Badge>
            </IconButton>
            <IconButton onClick={() => navigate('/fav')}>
                <Badge badgeContent={favItems.length} color='secondary'>
                    <FavoriteBorder />
                </Badge>
            </IconButton>
            <DrawerMenu />
        </>
    )
}

export default HeaderMenu