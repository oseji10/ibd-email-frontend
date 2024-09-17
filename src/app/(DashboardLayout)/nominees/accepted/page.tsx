'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import NomineesTable from '../../components/tables/NomineesTable';
import ProductPerformance from '../../components/dashboard/ProductPerformance';
import Nominees from '../../components/tables/Nominees';


const SamplePage = () => {
  return (
    <PageContainer title="Nominees" description="List of all nominees">
      <DashboardCard >
        <h5>Thank you Accepting This nomination. Kindly reach out to the Registrar/CEO: Dr. Paul Ikile on 08034520370</h5>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

