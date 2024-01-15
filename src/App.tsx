import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContextProvider } from '@mx/ui';
import { Authorize, useDocumentTitle } from './core';
import './assets/scss/app.scss';
import './i18n';
import { CourseList } from './modules/course/screens/List';
import { CourseDetail } from './modules/course/screens/Detail';
import { LessonPreview } from './modules/lesson/screens/LessonPreview/LessonPreview';
import { LessonFormPage } from './modules/lesson/screens/LessonFormPage';
import { LiveBlockRoomScreen } from './modules/liveblock-room/screens/LiveBlockRoomScreen';
import { SupportChatPage } from './modules/support/screens/SupportChat';
import { SupportList } from './modules/support/screens/List';
import { TagContextInit } from './core/context/TagContext';
import { useGTM } from './core/gtag-manager/hooks/useGTM';
import { SocketProvider } from './core/context/SocketContext';
import { AppProvider } from '@/core/context/AppContext';
import { config, PERMISSIONS } from '@/config';

const StudentCourseList = React.lazy(() =>
  import('./modules/student-course/screens/list').then((module) => ({
    default: module.StudentCourseList,
  })),
);

const StudentLessonList = React.lazy(() =>
  import('./modules/student-lesson/screens/List').then((module) => ({
    default: module.StudentLessonList,
  })),
);

const StudentLessonWithSupportScreen = React.lazy(() =>
  import('./modules/support/screens/StudentLessonWithSupport').then((module) => ({
    default: module.StudentLessonWithSupportScreen,
  })),
);

const Sidebar = React.lazy(() =>
  import('@/components/Sidebar').then((module) => ({ default: module.Sidebar })),
);

const RealtimeDashboardPage = React.lazy(() =>
  import('./modules/realtime-dashboard/screens').then((module) => ({
    default: module.RealtimeDashboard,
  })),
);

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { gtmHandler, initScript, noScript } = useGTM();
  const isInLessonRoute = config.screenCollapsedUrlList.includes(location.pathname.split('/')[1]);
  useDocumentTitle();

  return (
    <AppProvider>
      <TagContextInit scripts={[initScript, noScript]} handlers={[gtmHandler]}>
        <ToastContextProvider>
          <SocketProvider>
            <div className="flex bg-mx-gray-50 h-full min-h-screen relative">
              {!isInLessonRoute ? (
                <React.Suspense fallback={false}>
                  <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                </React.Suspense>
              ) : undefined}
              <div className="flex flex-1 flex-col w-[84.5%]">
                <Routes>
                  <Route path="/courses">
                    <Route path="" element={<CourseList />} />
                    <Route path=":id" element={<CourseDetail />} />
                  </Route>
                  <Route path="/lesson">
                    <Route path="" element={<Navigate to="create" />} />
                    <Route path="create" element={<LessonFormPage />} />
                    <Route path="edit/:id" element={<LessonFormPage />} />
                    <Route path="preview" element={<LessonPreview />} />
                  </Route>

                  <Route path="/student-courses">
                    <Route
                      path=""
                      element={
                        <React.Suspense fallback={false}>
                          <StudentCourseList />
                        </React.Suspense>
                      }
                    />
                    <Route
                      path=":id"
                      element={
                        <React.Suspense fallback={false}>
                          <StudentLessonList />
                        </React.Suspense>
                      }
                    />
                  </Route>
                  <Route path="/student-lesson">
                    <Route
                      path=":id"
                      element={
                        <React.Suspense fallback={false}>
                          <StudentLessonWithSupportScreen />
                        </React.Suspense>
                      }
                    />
                  </Route>
                  <Route path="/support">
                    <Route path="" element={<SupportList />} />
                  </Route>
                  <Route path="/support-chat" element={<SupportChatPage isSupported />} />
                  <Route path="/liveblock-room">
                    <Route path=":liveBlockId" element={<LiveBlockRoomScreen />} />
                  </Route>
                  <Route
                    path="/realtime"
                    element={
                      <React.Suspense fallback={false}>
                        <RealtimeDashboardPage />
                      </React.Suspense>
                    }
                  />
                </Routes>
              </div>
            </div>
          </SocketProvider>
        </ToastContextProvider>
      </TagContextInit>
    </AppProvider>
  );
};

export default Authorize(App, PERMISSIONS.APP.VIEW);
