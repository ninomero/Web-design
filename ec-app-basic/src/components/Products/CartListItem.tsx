import React from 'react'

import { useNavigate } from 'react-router'
import { useUser } from '../../templates/UserContext';

import { db } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

import { Divider, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { PrimaryButton } from '../UIkit';

const CartListItem = (props) => {
    const navigate = useNavigate()

    const [userInfo] = useUser()
    const image = props.product.product.images[0].path
    const name = props.product.product.name
    const price = props.product.product.price.toLocaleString()
    const size = props.product.product.size
    const cartId = props.product.product.cartId
    const productId = props.product.product.productId

    const removeProductFromCart = (cartId) => {
        return deleteDoc(doc(db, "users", userInfo?.uid, "cart", cartId))
    }

    return (
        <>
            <ListItem sx={{
                "@media screen and (max-width:782px)": {
                    width: "390px",
                    display: "block"
                },
            }}>
                <div className='sec-img'>
                    <ListItemAvatar>
                        <img src={image} alt='商品画像' />
                    </ListItemAvatar>
                </div>

                <div>
                    <ListItemText primary={name} secondary={"サイズ" + size} />
                    <ListItemText primary={"￥" + price} />
                </div>
                <PrimaryButton label={"商品詳細を見る"} onClick={() => navigate('/product/' + productId)} />
                <IconButton onClick={() => removeProductFromCart(cartId)}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
            <Divider />
        </>
    )
}

export default CartListItem