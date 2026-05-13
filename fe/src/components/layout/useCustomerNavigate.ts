import { useNavigate } from 'react-router-dom';
import { resolveCustomerPath } from './customerNavigation';

export function useCustomerNavigate() {
  const navigate = useNavigate();

  return (page: string, data?: any) => {
    navigate(resolveCustomerPath(page), { state: data });
  };
}
