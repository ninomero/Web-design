import React from 'react'

import { useNavigate } from 'react-router-dom';

import { PrimaryButton } from '../components/UIkit'

import { logout } from '../firebase'
import { useCart, useFav, useOrder, useUser } from './UserContext';

const LogOut = () => {
    // リダイレクトをかける
    const navigate = useNavigate()

    // Context呼び出し
    const [, setUserInfo] = useUser()
    const [, setUserCart] = useCart()
    const [, setFavItems] = useFav()
    const [, setOrders] = useOrder()

    // ログアウト時に状態をリセットする
    const rest = () => {
        setUserInfo([])
        setUserCart([])
        setFavItems([])
        setOrders([])
    }
    return (
        <div className="log-out">
            <PrimaryButton label={"ログアウト"}
                onClick={() => logout(() => rest(), navigate)} />
        </div>
    )
}

export default LogOut