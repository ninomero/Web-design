import React, { useEffect } from 'react'
import HeaderMenu from './HeaderMenu';
import { useNavigate } from 'react-router';

// ロゴ
import logo from "../../assets/img/icons/logo_transparent.png";

// mui
import { AppBar, Toolbar } from '@mui/material';
import { useFav, useUser } from '../../contexts/UserContext';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';

// 型
import { FavObject } from '../../function/types';

const Header = () => {
    const navigate = useNavigate()
    console.log("Headerをレンダリング")
    const [userInfo,] = useUser()
    const [, setFavItems] = useFav()

    useEffect(() => {
        let tempFav: FavObject[]  = []

        if (userInfo.length !== 0 && userInfo !== null && userInfo !== undefined) {
            console.log('useEffect発火')
            const q_fav = query(collection(db, "users", userInfo?.uid, "fav"))
            const unsubscribe = onSnapshot(q_fav, snapshots => {
                snapshots.docChanges().forEach(change => {
                    // 型アサーションは安全性が低いため修正する必要がある
                    const product: FavObject = change.doc.data() as FavObject;
                    const changeType = change.type
                    console.log('Headerでバグ')

                    switch (changeType) {
                        case 'added':
                            tempFav = [...tempFav, product]
                            break;
                        // カートに追加(firebaseに追加)する処理を改善する必要あり
                        // ドキュメントのIDを発行しながら追加する必要がある
                        // case 'modified':
                        //     const index = tempCart.findIndex(product => product.product.cartId === change.doc.id)
                        //     tempCart[index] = product;
                        //     break;
                        case 'removed':
                            tempFav = tempFav.filter(product => product.favId !== change.doc.id);
                            break;
                        default:
                            break;
                    }
                });
                setFavItems(tempFav)
            })

            return () => unsubscribe()
        }
    }, [setFavItems, userInfo])

    return (
        <div className='fixed h-32 w-full z-50'>
                <AppBar position="static" className='h-full'>
                    <Toolbar>
                        <div className="c-menu--bar">
                            <div>
                                <img alt="Logo" src={logo} height="auto" width="128px" role="button" onClick={() => navigate('/')} />
                            </div>
                            <div>
                                <HeaderMenu />
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
        </div>
    )
}

export default Header