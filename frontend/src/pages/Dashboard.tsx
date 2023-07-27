import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Dashboard: React.FC = () => {
  const router = useRouter();

  const username = Cookies.get('username');

  useEffect(() => {
    if (!username) {
      router.push('/');
    }
  }, [username]);

  if (!username) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <p>This is your dashboard. You are logged in successfully.</p>
    </div>
  );
};

export default Dashboard;
