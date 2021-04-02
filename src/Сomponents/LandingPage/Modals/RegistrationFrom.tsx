import React from 'react';
import "./RegistrationForm.scss"
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AuthorizationState, createNewUser } from '../../../store/reducers/authorizationSlice';

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
  } = useForm()

  const dispatch = useDispatch()

  const onSubmit = (data: AuthorizationState) => {
    console.log(data)
    dispatch(createNewUser(data))
  }

  return (
    <div className="formContainer" onSubmit={handleSubmit(onSubmit)}>
      <form>
        <input name="email" ref={register({ required: true })}/>
        <input name="password" ref={register({ required: true })}/>
        <input name="image" type="file" ref={register({ required: true })}/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default RegistrationForm;

