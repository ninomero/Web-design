import React from 'react'
import { useNavigate } from 'react-router'
import { deleteDoc, doc } from 'firebase/firestore'

import { db } from '../../firebase'

import { PrimaryButton } from '../UIkit'

import { Divider, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useUser } from '../../templates/UserContext'

// 商品の削除
const removeProductFromCart = (favId, userInfo) => {
    return deleteDoc(doc(db, "users", userInfo?.uid, "fav", favId))
}

// お気に入り商品の表示
const Fav = ({ favItem }) => {
    const navigate = useNavigate()
    const [userInfo] = useUser()

    return (
        <>
            <ListItem key={favItem.favId} sx={{
                "@media screen and (max-width:782px)": {
                    width: "390px",
                    display: "block"
                },
            }}>
                <ListItemAvatar className='sec-img'>
                    <img src={favItem.images[0].path} alt="商品のTOP画像" />
                </ListItemAvatar>
                <div>
                    <ListItemText primary={favItem.name} secondary={"サイズ：" + favItem.size} />
                    <ListItemText primary={"¥" + favItem.price.toLocaleString()} />
                </div>
                <PrimaryButton label={"商品詳細を見る"} onClick={() => navigate('/product/' + favItem.productId)} />
                <IconButton onClick={() => removeProductFromCart(favItem.favId, userInfo)}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
            <Divider />
        </>
    )
}

export default Fav