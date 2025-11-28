import CommonHeader from '../reuseable/CommonHeader';
import LoginForm from './LoginForm';

const LoginPage = () => {

    return (
        <>
            <CommonHeader headerName={"Login"}/>
            <LoginForm />
        </>
    );
};

export default LoginPage;