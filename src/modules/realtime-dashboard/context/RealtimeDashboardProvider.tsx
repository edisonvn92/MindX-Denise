import useViewModel from '../viewmodels/realtime-dashboard.viewmodel';
import { PageProvider } from '@/core/context/PageContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RealtimeDashboardProvider = (props: any) => {
  const { children } = props;

  const {
    loading,
    actionGetOverviewData,
    overviewDatas,
    courses,
    isLoadingData,
    setIsLoadingData,
    studentStatusData,
    actionGetAllCourseData,
    filter,
    setFilter,
    initialStateFilter,
    setIsDetailDialogOpened,
    isDetailDialogOpened,
  } = useViewModel();

  const data = {
    loading,
    actionGetOverviewData,
    overviewDatas,
    courses,
    isLoadingData,
    setIsLoadingData,
    studentStatusData,
    actionGetAllCourseData,
    filter,
    setFilter,
    initialStateFilter,
    setIsDetailDialogOpened,
    isDetailDialogOpened,
  };

  /* eslint-disable */
  return <PageProvider {...data}>{children}</PageProvider>;
  /* eslint-disable */
};
