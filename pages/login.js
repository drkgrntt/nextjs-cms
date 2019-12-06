import React from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

export default () => (
  <div className="login-page">
    <LoginForm />
    <RegisterForm className="login-page__form" />
  </div>
)
