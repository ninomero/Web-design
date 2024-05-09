import React, { useEffect, useState } from 'react'
import { ProductCard } from './../components/UIkit'

import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore';

const ProductList = () => {
  console.log("ProductListをレンダリング")
  const [lists, setList] = useState([]);

  // FireStore データ取得
  useEffect(() => {
    async function fetchData() {
      try {
        const snapshots = collection(db, "products")
        await getDocs(snapshots).then((snapShot) => {
          setList(snapShot.docs.map((doc) => ({ ...doc.data() })))
        })
      }
      catch (error) {
        console.log(`There was an error: ${error}`);
        alert("データが正しく取得できておりません");
      }
    }

    fetchData()
  }, [])

  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center h-96">
        {lists.map((list) => (
          <div key={list.id} className="col-span-1 justify-center items-center h-full">
            <ProductCard name={list.name} price={list.price} images={list.images} id={list.id} key={list.id}/>
          </div>
        )
        )}
    </section>
  )
}

export default ProductList