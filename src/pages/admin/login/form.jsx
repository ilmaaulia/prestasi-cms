import React from 'react'
import { Form } from 'react-bootstrap'
import TextInputWithLabel from '../../../components/TextInputWithLabel'
import AppButton from '../../../components/Button'

function LoginForm({ form, handleChange, handleSubmit, isLoading }) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={'Masukan email'}
        label={'Email'}
        name="email"
        value={form?.email}
        type="email"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={'Masukan Kata Sandi'}
        label={'Password'}
        name="password"
        value={form?.password}
        type="password"
        onChange={handleChange}
      />

      <AppButton
        loading={isLoading}
        disabled={isLoading}
        variant="primary"
        action={handleSubmit}
        className={'w-100 mt-2'}
      >
				Masuk
      </AppButton>
    </Form>
  )
}

export default LoginForm
