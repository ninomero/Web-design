import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";

export type UserObject = {
  userId: string
}

export type FavObject = {
  added_at: Timestamp;
  description: string;
  favId: string;
  gender: string;
  images: [{ id: string; path: string }];
  name: string;
  price: number;
  produceId: string;
  quantity: number;
  size: string;
};

export type CartObject = {
  added_at: Timestamp;
  cartId: string;
  description: string;
  gender: string;
  images: [{ id: string; path: string }];
  name: string;
  price: number;
  produceId: string;
  quantity: number;
  size: string;
}

export type OrdersObject = {
  amount: number;
  created_at: Timestamp;
  id: string;
  products: [{
    id: string;
    images: [{ id: string; path: string }];
    name: string;
    price: number;
    size: string;
  }]
  shipping_date: Timestamp;
  updated_at: Timestamp;
}

export const userConverter: FirestoreDataConverter<FavObject> = {
  toFirestore(doc): DocumentData {
    return {
      added_at: doc.added_at,
      description: doc.description,
      favId: doc.favId,
      gender: doc.gender,
      images: doc.images,
      name: doc.name,
      price: doc.price,
      produceId: doc.produceId,
      quantity: doc.quantity,
      size: doc.size,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot<FavObject>,
    options
  ): FavObject {
    const data = snapshot.data(options);
    const entity: FavObject = {
      added_at: data.added_at,
      description: data.description,
      favId: snapshot.id,
      gender: data.gender,
      images: data.images,
      name: data.name,
      price: data.price,
      produceId: data.produceId,
      quantity: data.quantity,
      size: data.size,
    };
    return entity;
  },
};
