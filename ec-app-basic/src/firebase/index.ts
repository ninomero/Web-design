import { initializeApp } from 'firebase/app';
// 'firebase/firestore/lite'とfirebase/firestore"を同時に使用することはできない
// import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, doc, serverTimestamp, setDoc, getFirestore } from "firebase/firestore";

console.log("Firebase index.tsxをレンダリング")

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGINGSENDR_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// firebaseの初期化処理
// config情報を使用して初期化している
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Timestamp
export const timestamp = serverTimestamp();
// export const timestamp = serverTimestamp(app);

// ユーザ作成
// emailはxxxx@xxx.comのように正しく作成しないと400エラーとなる
export const createAccount = async (email: string, password: string, setUserInfo: React.Dispatch<React.SetStateAction<User>>, navigate: React.Dispatch<React.SetStateAction<string>>) => {
    
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        if (auth.currentUser !== null){
            setUserInfo(auth.currentUser)
        }
        navigate('/')
    }
    catch (error) {
        console.log(`There was an error: ${error}`);
        alert("メールアドレス or パスワードが正しくありません、確認しなおしてください");
    }
}

// ログイン
export const loginEmailPassword = async (email: string, password: string, setUserInfo: React.Dispatch<React.SetStateAction<User>>, navigate: React.Dispatch<React.SetStateAction<string>>) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        if (auth.currentUser !== null){
            setUserInfo(auth.currentUser)
        }
        navigate("/")
    }
    catch (error) {
        console.log(`There was an error: ${error}`);
        alert("メールアドレス or パスワードが正しくありません、確認しなおしてください");
    }
}

// ログアウト
export const logout = async (rest: React.Dispatch<React.SetStateAction<undefined>>, navigate: React.Dispatch<React.SetStateAction<string>>) => {
    rest(undefined)
    await signOut(auth);
    navigate("/")
}

// 商品情報登録
export const saveProduct = async (name: string, description: string, category: [string, string], gender: [string, string], price: string, sizes: [string, string], images: number) => {
    try {
        // productsはFireStore上のコレクション名と紐づいている
        // もしFireStore上に設定されていない場合エラーとなる
        const ref = doc(collection(db, "products"));

        const data = {
            images: images,
            category: category,
            description: description,
            gender: gender,
            name: name,
            price: parseInt(price, 10),
            sizes: sizes,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
            // updated_at: serverTimestamp(app),
            id: '',
        }
        // ドキュメントIDをデータに設定している(一意になる)
        const id = ref.id;
        data.id = id;

        // Firebaseにデータを登録する
        await setDoc(ref, data)
    }
    catch (error) {
        console.log(`There was an error: ${error}`);
        alert("商品情報を確認してください");
    }

}

// Monitor auth state
function monitorAuthState() {
    return new Promise<void>(resolve => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log(user)
                console.log('ログイン中')
            }
            else {
                // ログイン画面に遷移するようにしたりするとよい?
                console.log('ログインしていない')
            }
            resolve()
        })
    })
}

await monitorAuthState();