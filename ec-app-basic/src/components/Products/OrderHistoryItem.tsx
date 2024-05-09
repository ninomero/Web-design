import React from 'react'
import { TextDetail } from '../UIkit'
import OrderedProducts from './OrderedProducts'

const OrderHistoryItem = (props) => {
  const orderedDatetime = props.order.updated_at.toDate().toLocaleString()
  // const shippingDate = props.order.shipping_date.toDate().toLocaleString()
  const totalPrice = "¥" + props.order.amount.toLocaleString()
  const products = props.order.products

  return (
    <>
      <div className="module-spacer--small" />
      <div className='order-history'>
        <TextDetail label={"注文ID"} value={props.order.id} />
        <TextDetail label={"注文日時"} value={orderedDatetime} />
        {/* <TextDetail label={"発送予定日"} value={shippingDate} /> */}
        <TextDetail label={"注文金額"} value={totalPrice} />
      </div>
      {Object.keys(products).length > 0 && (
        <OrderedProducts products={products} key={props.order.id} />
      )}
      <div className="module-spacer--extra-extra-small" />
    </>
  )
}

export default OrderHistoryItem