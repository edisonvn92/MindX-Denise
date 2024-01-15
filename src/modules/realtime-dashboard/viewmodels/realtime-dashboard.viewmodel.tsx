import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { RealtimeDashboardRepo } from '../adapters/repositories';
import { useBaseViewModel } from '@/core';
import { FindAllRealtimeDashboardUsecase } from '@/domains/realtime-dashboard/usecases';
import {
  EventCommand,
  RealtimeDashboardEntity,
  StudentStatusEntity,
} from '@/domains/realtime-dashboard/entities';
import { FindAllStudentCourseUsecase } from '@/domains/student-course/usecases';
import { StudentCourseHttpRepository } from '@/modules/student-course/adapters/repositories';
import { StudentCourseEntity } from '@/domains/student-course/entities';
import { GetAllStudentStatusUsecase } from '@/domains/realtime-dashboard/usecases/student-status.usecase';
import { socket } from '@/core/context/SocketContext';
import { StudentStatusFilter } from '@/domains/realtime-dashboard/ports/payloads';

const realtimeDashboardViewModel = () => {
  const { loading, error, catchAction } = useBaseViewModel();
  const repo = new RealtimeDashboardRepo();
  const FindAllRealtimeDashboardUC = new FindAllRealtimeDashboardUsecase(repo);
  const GetAllStudentStatusUC = new GetAllStudentStatusUsecase(repo);
  const findAllStudentCourseUC = new FindAllStudentCourseUsecase(new StudentCourseHttpRepository());

  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const [overviewDatas, setOverviewDatas] = useState<RealtimeDashboardEntity[]>([]);
  const [courses, setCourses] = useState<StudentCourseEntity[]>([]);
  const [studentStatusData, setStudentStatusData] = useState<StudentStatusEntity[]>([]);
  const [isDetailDialogOpened, setIsDetailDialogOpened] = useState<boolean>(false);

  const initialStateFilter: StudentStatusFilter = {
    orderBy: '',
    order: 'ASC',
    status: '',
    studentName: '',
    courseId: '',
  };
  const filterRef = useRef<StudentStatusFilter>(initialStateFilter);

  const [filter, setFilter] = useState<StudentStatusFilter>(initialStateFilter);

  // Avoice re-render every filter
  if (!_.isEqual(filter, filterRef.current)) {
    filterRef.current = filter;
  }

  const actionGetOverviewData = async () => {
    await catchAction(async () => {
      const data = await FindAllRealtimeDashboardUC.run();
      setOverviewDatas(data);
    });
  };

  const actionGetAllStudentStatus = async () => {
    await catchAction(async () => {
      const data = await GetAllStudentStatusUC.run(filter);
      setStudentStatusData(data);
    });
  };

  const actionGetAllCourseData = async () => {
    await catchAction(async () => {
      const data = await findAllStudentCourseUC.run({});
      setCourses(data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await actionGetOverviewData();
      await actionGetAllCourseData();
      await actionGetAllStudentStatus();

      setIsLoadingData(() => false);
    };

    fetchData();
  }, [filterRef.current]);

  useEffect(() => {
    socket.on(EventCommand.UserStatus, async () => {
      await actionGetOverviewData();
    });

    socket.on(EventCommand.CxOMonitorStudent, async () => {
      await actionGetAllStudentStatus();
    });

    socket.on(EventCommand.CxOMonitorMentor, async () => {
      await actionGetAllStudentStatus();
    });
  }, []);

  return {
    loading,
    actionGetOverviewData,
    overviewDatas,
    courses,
    isLoadingData,
    setIsLoadingData,
    studentStatusData,
    filter,
    setFilter,
    actionGetAllCourseData,
    initialStateFilter,
    setIsDetailDialogOpened,
    isDetailDialogOpened,
  };
};

export default realtimeDashboardViewModel;
