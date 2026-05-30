import { useParams, Navigate } from 'react-router-dom';
import { taxes } from '../data/taxes.js';
import TaxDetail from '../components/TaxDetail.jsx';

function TaxDetailPage() {
  const { dexNumber } = useParams();
  const num = parseInt(dexNumber, 10);
  const tax = taxes.find((t) => t.dexNumber === num);

  if (!tax) {
    return <Navigate to="/" replace />;
  }

  return <TaxDetail tax={tax} />;
}

export default TaxDetailPage;
