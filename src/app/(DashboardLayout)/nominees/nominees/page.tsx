'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import NomineesTable from '../../components/tables/NomineesTable';


const SamplePage = () => {
  return (
    <PageContainer title="Nominees" description="List of all nominees">
      <DashboardCard >
        {/* <Typography>All Nominees</Typography> */}
        <NomineesTable/>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

