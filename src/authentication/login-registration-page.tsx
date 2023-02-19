import { useInjection } from 'inversify-react'
import { observer } from 'mobx-react'
import { LoginRegisterPresenter } from './login-registration-presenter';
import { useState } from 'react';


export const LoginRegistrationPage = observer((props: any) => {
    const loginRegisterPresenter = useInjection(LoginRegisterPresenter);
  
    const {email, password, option} = loginRegisterPresenter

    const [loginRegisterFormValues, setLoginRegisterFormValues] = useState<any>({
      email: email ?? "",
      password: password ?? ""
    })

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginRegisterFormValues({
        ...loginRegisterFormValues,
        [event.target.name]: event.target.value
      })
    }

    return (
        <>
      <div className="logo">
        <img
          alt="logo"
          style={{ width: 60, filter: 'grayscale(100%)' }}
          src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/1537017/settings_images/1UxqoCceShyczTsmzsLy_logo.png"
        />
      </div>
      <div className="option">
        <input
          style={{ backgroundColor: '#e4257d' }}
          type="submit"
          value="login"
          onClick={() => {
            loginRegisterPresenter.setOption("login")
          }}
        />
        <input
          style={{ backgroundColor: '#2E91FC' }}
          type="submit"
          value="register"
          onClick={() => {
            loginRegisterPresenter.setOption("register")
          }}
        />
      </div>
      <div
        className="login-register"
        style={{
          backgroundColor: option === 'login' ? '#E4257D' : '#2E91FC'
        }}
      >
        <form
          className="login"
          onSubmit={(event) => {
            event.preventDefault();
            if (option === 'login') loginRegisterPresenter.login(loginRegisterFormValues)
            if (option === 'register') loginRegisterPresenter.register(loginRegisterFormValues)
          }}
        >
          <label>
            <input
              type="text"
              name="email"
              value={loginRegisterFormValues.email}
              placeholder="Email"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              value={loginRegisterFormValues.password}
              placeholder="Password"
              onChange={handleOnChange}
            />
          </label>
          {option === 'login' ? (
            <input type="submit" value="login" />
          ) : (
            <input type="submit" value="register" />
          )}
        </form>

        <div className="validation-message"  style={{
          backgroundColor: option === 'login' ? '#E4257D' : '#2E91FC'
        }}>
        </div>
      </div>
    </>
       
    )
})
