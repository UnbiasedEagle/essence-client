import Nav from '../../components/home/Nav';
import Header from '../../components/home/Header';
import AccountList from '../../components/home/AccountList';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyPaymentQuery } from '../../store/services/paymentService';
import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { emptyCart } from '../../store/reducers/cartReducer';

const Dashboard = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get('session_id');

  const { data, isSuccess } = useVerifyPaymentQuery(sessionId, {
    skip: sessionId ? false : true,
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem('cart');
      toast.success(data.msg);
      dispatch(emptyCart());
      navigate('/user');
    }
  }, [isSuccess, data?.msg, dispatch, navigate]);

  return (
    <>
      <Nav />
      <Toaster position='top-right' reverseOrder={false} />
      <div className='mt-[70px]'>
        <Header>my account</Header>
        <div className='custom-container mt-[40px]'>
          <div className='flex flex-wrap -mx-6'>
            <div className='w-full p-6 md:w-4/12'>
              <AccountList />
            </div>
            <div className='w-full p-6 md:w-8/12'>
              <h1 className='heading'>name</h1>
              <span className='block mt-3 text-sm font-medium capitalize'>
                {user && user.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
