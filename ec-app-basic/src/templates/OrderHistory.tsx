import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

import { OrderHistoryItem } from '../components/Products';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUser, useOrder } from './UserContext';
import ReccomendLogin from './ReccomendLogin';

const OrderHistory = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useOrder()
    const [userInfo] = useUser()

    const access_db = async () => {
        if (userInfo.length !== 0 && userInfo !== null && userInfo !== undefined) {
            console.log('access_db')
            const list = []
            const snapshots = await getDocs(collection(db, "users", userInfo?.uid, 'orders'))
            snapshots.forEach(snapshot => {
                const data = snapshot.data();
                // list = [...list, { data }]
                list.push(data)
            });

            if (list !== undefined && list.count !== 0) {
                console.log('push')
                console.log(list)
                setOrders(list)
            }
        }
    }

    useEffect(() => {
        if (userInfo.length !== 0 && userInfo !== null && userInfo !== undefined)
            access_db()
    }, [userInfo])

    console.log('orderの数')
    console.log(orders.count)

    return (
        <>
            {userInfo.length !== 0 && userInfo !== null && userInfo !== undefined ?
                (

                    orders.length > 0 ?
                        (orders.map(order => <OrderHistoryItem order={order} key={order.id} />))
                        : ("注文履歴が存在しません")

                )
                :
                (
                    <ReccomendLogin />
                )
            }
        </>
    )
}

export default OrderHistory