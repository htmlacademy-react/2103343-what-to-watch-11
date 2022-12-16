import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useRef, FormEvent, useEffect, useState } from 'react';
import { loginAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus, EMAIL_PATTERN, PASSWORD_PATTERN } from '../../const';
import { AuthData } from '../../types/auth-data';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function getSignInErrorMessage(inputId: string): string {
  if (inputId === 'user-email') {
    return 'Please enter a valid email address';
  }
  if (inputId === 'user-password') {
    return 'Please enter a valid password';
  }
  return '';
}

export default function SignInScreen(): JSX.Element {

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const authStatus = useAppSelector(getAuthorizationStatus);
  const [errFieldId, setErrFieldId] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      if (!EMAIL_PATTERN.test(loginRef.current?.value)) {
        setErrFieldId('user-email');
        return;
      }
      if (!PASSWORD_PATTERN.test(passwordRef.current?.value)) {
        setErrFieldId('user-password');
        return;
      }
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
    navigate(AppRoute.Main);
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authStatus, navigate]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">

        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit} noValidate>
          <div className="sign-in__message">
            <p>{getSignInErrorMessage(errFieldId)}</p>
          </div>
          <div className="sign-in__fields">
            <div className={`sign-in__field ${errFieldId === 'user-email' ? 'sign-in__field--error' : ''}`}>
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={loginRef}
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={`sign-in__field ${errFieldId === 'user-password' ? 'sign-in__field--error' : ''}`}>
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                ref={passwordRef}
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>

    </div>
  );
}
