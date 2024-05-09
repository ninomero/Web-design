import React from 'react'
import { useNavigate } from 'react-router';

import { PrimaryButton } from '../UIkit';

import { Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const OrderedProducts = ({ products }) => {
    console.log("OrderedProductsをレンダリング")
    const navigate = useNavigate()

    return (
        <List>
            {Object.keys(products).map(key => {
                const product = products[key]

                return (
                    <>
                        <ListItem key={product.id} sx={{
                            "@media screen and (max-width:782px)": {
                                width: "390px",
                                display: "block"
                            },
                        }}>
                            <ListItemAvatar className='sec-img'>
                                <img src={product.images[0].path} alt="商品のTOP画像" />
                            </ListItemAvatar>
                            <div>
                                <ListItemText primary={product.name} secondary={"サイズ：" + product.size} />
                                <ListItemText primary={"¥" + product.price.toLocaleString()} />
                            </div>
                            <PrimaryButton label={"商品詳細を見る"} onClick={() => navigate('/product/' + product.id)} />
                        </ListItem>
                        <Divider />
                    </>
                )
            })}
        </List>
    );
}

export default OrderedProducts