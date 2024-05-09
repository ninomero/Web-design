import React from 'react'
import { useCart, useUser } from './UserContext'
import { useNavigate } from 'react-router'

import { CartListItem } from '../components/Products'
import { PrimaryButton } from '../components/UIkit'

import { Divider, List } from '@mui/material'
import ReccomendLogin from './ReccomendLogin'

const CartList = () => {
    const [userCart] = useCart()
    const [userInfo] = useUser()
    const navigate = useNavigate()

    // 商品決済画面に飛ばす
    const goToOrder = () => {
        navigate('/order/confirm')
    }

    // 商品一覧ページに飛ばす
    const backToHome = () => {
        navigate('/')
    }

    return (
        <>
            {
                userInfo.length !== 0 && userInfo !== null && userInfo !== undefined ?
                    (
                        <section className='c-section-wrapin'>
                            <h2 className='u-text__headline'>
                                ショッピングカート
                            </h2>
                            <Divider />
                            <List>
                                {userCart.length !== 0 && (
                                    userCart.map(product => <CartListItem product={product} key={product.product.cartId} />)
                                )}
                            </List>
                            <div className='module-spacer--medium'>
                                <div className='p-gird__column'>
                                    {userCart.length !== 0 ? <PrimaryButton label={"レジへ進む"} onClick={goToOrder} /> :
                                        <div className="non-msg">商品がありません</div>
                                    }
                                    <div className='module-spacer--extra-extra-small'></div>
                                    <PrimaryButton label={"ショッピングを続ける"} onClick={backToHome} />
                                </div>
                            </div>
                        </section>
                    )
                    :
                    (
                        <ReccomendLogin />
                    )
            }
        </>
    )
}

export default CartList