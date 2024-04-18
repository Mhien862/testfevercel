import { Card } from 'antd';
import { Outlet } from 'react-router-dom';

const LayoutLogin = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card>
        <Outlet />
      </Card>
    </div>
  );
};

export default LayoutLogin;
