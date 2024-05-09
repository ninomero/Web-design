import React from 'react'
import { useNavigate } from 'react-router'
import { PrimaryButton } from '../components/UIkit'

const OrderConfirmed = () => {
    const navigate = useNavigate()
    return (
        <div className='order-confirmed'>
            <div className='order-cmp-msg'>商品購入完了いたしました!</div>
            <div className="order-top">
                <PrimaryButton label={"TOPページへ戻る"} onClick={() => navigate('/')} />
            </div>
        </div>
    )
}

export default OrderConfirmed