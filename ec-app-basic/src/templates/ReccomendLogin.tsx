import React from 'react'

import { useNavigate } from 'react-router';
import { PrimaryButton } from '../components/UIkit';

const ReccomendLogin = () => {
    const navigate = useNavigate()
    return (
        <div className='rec-login'>
            <div className='center'>ログインしていません</div>
            <div className="module-spacer--medium" />
            <div className="btn">
                <PrimaryButton label={"ログインする"} onClick={() => navigate('/signIn')} />
            </div>
        </div>
    )
}

export default ReccomendLogin