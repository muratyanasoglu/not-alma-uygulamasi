import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Dropdown, Menu, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { GoogleLogin } from 'react-google-login';
import ReCAPTCHA from 'react-google-recaptcha';
import './login.css';

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'EN');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [recaptchaValue, setRecaptchaValue] = useState('');

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const handleChangeLanguage = ({ key }) => {
        setLanguage(key);
    };

    const responseGoogle = (response) => {
        console.log(response);
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };

    const languageMenu = (
        <Menu onClick={handleChangeLanguage}>
            <Menu.Item key="EN">English</Menu.Item>
            <Menu.Item key="TR">Türkçe</Menu.Item>
            {/* Diğer dil seçenekleri buraya eklenir */}
        </Menu>
    );

    const handleSubmit = (values) => {
        if (loginAttempts >= 15) {
            message.error(language === 'EN' ? 'Too many login attempts. Please try again later.' : 'Çok fazla giriş denemesi. Lütfen daha sonra tekrar deneyin.');
            return;
        }

        if (!recaptchaValue) {
            message.error(language === 'EN' ? 'Please complete the captcha.' : "Lütfen reCAPTCHA'yı tamamlayın.");
            return;
        }

        setLoading(true);
        // Giriş işlemlerini burada gerçekleştirin
        setTimeout(() => {
            setLoading(false);
            if (values.username === 'demo' && values.password === 'demo') {
                message.success(language === 'EN' ? 'Logged in successfully!' : 'Başarıyla giriş yapıldı!');
            } else {
                setLoginAttempts(loginAttempts + 1);
                message.error(language === 'EN' ? 'Invalid username or password!' : 'Geçersiz kullanıcı adı veya şifre!');
            }
        }, 1000);
    };

    const handleForgotPassword = () => {
        // Şifremi Unuttum işlemleri
    };

    const handleSignUp = () => {
        // Kayıt olma işlemleri
    };

    return (
        <div className="login-container">
            <Dropdown overlay={languageMenu} trigger={['click']} placement="bottomRight">
                <Button>{language === 'EN' ? 'English' : 'Türkçe'} <DownOutlined /></Button>
            </Dropdown>
            <h2 className="login-title">{language === 'EN' ? 'Welcome Back!' : 'Hoş Geldiniz!'}</h2>
            <Form form={form} onFinish={handleSubmit} className="login-form">
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: language === 'EN' ? 'Please input your username or email!' : 'Lütfen kullanıcı adınızı veya e-postanızı girin!' }]}
                >
                    <Input placeholder={language === 'EN' ? 'Username or Email' : 'Kullanıcı Adı veya E-posta'} size="large" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: language === 'EN' ? 'Please input your password!' : 'Lütfen şifrenizi girin!' }]}
                >
                    <Input.Password placeholder={language === 'EN' ? 'Password' : 'Şifre'} size="large" />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox onChange={handleRememberMeChange}>{language === 'EN' ? 'Remember me' : 'Beni Hatırla'}</Checkbox>
                </Form.Item>
                <Form.Item>
                    <ReCAPTCHA
                        sitekey="YOUR_RECAPTCHA_SITE_KEY"
                        onChange={handleRecaptchaChange}
                        className="captcha"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} size="large" block>
                        {language === 'EN' ? 'Log in' : 'Giriş Yap'}
                    </Button>
                </Form.Item>
            </Form>
            <div className="additional-options">
                <a href="#" onClick={handleForgotPassword} className="forgot-password-link">
                    {language === 'EN' ? 'Forgot password?' : 'Şifremi Unuttum?'}
                </a>
                <Button type="link" onClick={handleSignUp} className="signup-button" size="large">
                    {language === 'EN' ? 'Sign Up' : 'Kayıt Ol'}
                </Button>
            </div>
            <GoogleLogin
                clientId="YOUR_GOOGLE_CLIENT_ID"
                buttonText={language === 'EN' ? 'Login with Google' : 'Google ile Giriş Yap'}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                className="google-login-button"
            />
            {/* Diğer giriş alanları buraya eklenecek */}
        </div>
    );
};

export default Login;
