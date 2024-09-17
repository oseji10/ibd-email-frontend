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
        {/* <Typography>All Nominees</Typography> */}
        {/* <NomineesTable/> */}
        <Nominees/>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

