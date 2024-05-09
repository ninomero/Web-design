import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, TextInput } from '../components/UIkit'

// Firebaseのアカウント作成、ログインなどを読み込んでいる
import { createAccount } from '../firebase';
import { useUser } from '../contexts/UserContext';

// グローバル定数を読み込む
const SignUp = () => {
    console.log("SignUpをレンダリング")

    // リダイレクトをかける
    const navigate = useNavigate()

    const [, setUserInfo] = useUser()

    // useCallback関数を使用して無駄なレンダリングを防いでいる
    // eventはonChangeのイベント時の値が入ってくる
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [username, setUsername] = useState("")

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    }, [setEmail]);

    const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [setPassword]);

    const inputConfirmPassword = useCallback((e) => {
        setConfirmPassword(e.target.value)
    }, [setConfirmPassword]);

    const inputUsername = useCallback((e) => {
        setUsername(e.target.value)
    }, [setUsername]);

    const handleClick = async () => {
        if (
            username === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            alert("必須項目が未入力です");
            return false;
        }

        if (password !== confirmPassword) {
            alert("パスワードが一致しません。もう一度お試しください。");
            return false;
        }

        if (password.length < 6) {
            alert("パスワードは6文字以上で入力してください。");
            return false;
        }

        createAccount(email, password, {setUserInfo}, navigate);
    }

    return (
        <div className='c-section-container'>
            <h2 className='u-text_headline u-text-center'>アカウント登録</h2>
            <div className="module-spacer--medium" />
            {/* TextInputコンポーネントを使用して作成していく */}
            {/* 
             * fullWidth = containerの最大サイズまで表示する
             * label = 選択する前に表示されているテキスト例(灰色文字)
             * multiline = 行を改行して複数表示するかどうかを設定する
             * required = 設定する値が絶対に必要かどうか設定する
             * rows = 行数
             * value = 設定する値(ユーザがタイピングする値)
             * type = TEXTの種類
             * onChange = eventをキャッチする(※勝手に推測して記載)
            */}
            <TextInput
                fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
                rows={2} value={username} type={"text"} onChange={inputUsername}
            />
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <TextInput
                fullWidth={true} label={"パスワード(再確認)"} multiline={false} required={true}
                rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
            />
            <div className="module-spacer--medium" />
            <div className='center'>
                <PrimaryButton label={"アカウント登録する"}
                    onClick={() => handleClick(username, email, password, confirmPassword)} />
            </div>
        </div>
    )
}

export default SignUp