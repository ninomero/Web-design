import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router';
import { PrimaryButton, TextInput } from '../components/UIkit'

// Firebaseのアカウント作成、ログインなどを読み込んでいる
import { loginEmailPassword } from '../firebase';
import { useUser } from './UserContext';

const SignIn = () => {
    // リダイレクトをかける
    const navigate = useNavigate()
    const [, setUserInfo] = useUser()

    // useCallback関数を使用して無駄なレンダリングを防いでいる
    // eventはonChangeのイベント時の値が入ってくる
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    }, [setEmail]);

    const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [setPassword]);

    const handleClick = async () => {
        loginEmailPassword(email, password, {setUserInfo}, navigate);        
    }

    return (
        <div className='c-section-container'>
            <h2 className='u-text_headline u-text-center'>ログイン</h2>
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
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <div className="module-spacer--medium" />
            <div className='center'>
                <PrimaryButton label={"ログイン"}
                    onClick={() => handleClick(email, password)} />
            </div>
            <div className="module-spacer--medium" />
            <div className='center pointer' onClick={() => navigate('/signUp')}>
                アカウント登録されていない方はこちら
            </div>
        </div>
    )
}

export default SignIn