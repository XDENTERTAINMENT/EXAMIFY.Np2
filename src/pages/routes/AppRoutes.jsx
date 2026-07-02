import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import React from "react";
import StudentLogin from "../auth/StudentLogin";
import LandingPage from "../landingPage/landingPage";
import TeacherDashboard from "../teacher/TeacherDashboard";
import StudentDashboard from "../student/StudentDashboard";
import Features from "../Features/Features";
import Pricing from "../Pricing/Pricing";
import About from "../About/About";
import Loginpage from "../student/Loginpages";
import Loginpaget from "../teacher/Loginpaget";
import StudentSignup from "../auth/StudentSignup";
import TeacherLogin from "../auth/TeacherLogin";
import TeacherSignup from "../auth/TeacherSignup";
import CreateExamPage from "../teacher/CreateExamPage";
import Exampage from "../student/exampage";
import ViewQuestion from "../teacher/ViewQuestions";
import TeacherAnalytics from "../teacher/anlytic";
import ResultsPage from "../teacher/result";
import PaymentVerify from "../Payment/PaymentVerify";
import ExamLimitReached from "../student/ExamLimitReached";
import Settings from "../teacher/Settings";
import TeacherSupport from "../teacher/TeacherSupport";   // ✅ ADDED
import StudentSupport from "../student/StudentSupport";   // ✅ ADDED
import NotFound from "../NotFound/NotFound";
import AdminLogin from "../admin/AdminLogin";               // ✅ ADDED — Phase 2
import AdminDashboard from "../admin/AdminDashboard";        // ✅ ADDED — Phase 2
import AdminProtectedRoute from "./AdminProtectedRoute";     // ✅ ADDED — Phase 2


function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route
          path="/studentdashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/studentloginpage" element={<Loginpage />} />
        <Route path="/teacherloginpage" element={<Loginpaget />} />
        <Route path="/studentsignup" element={<StudentSignup />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />
        <Route path="/teachersignup" element={<TeacherSignup />} />
        <Route
          path="/teacherdashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/examexampage" element={<CreateExamPage />} />
        <Route path="/exampage/:examCode" element={<Exampage />} />
        <Route path="/viewQuestions" element={<ViewQuestion />} />
        <Route path="/teacherAnalytics" element={<TeacherAnalytics />} />
        <Route
          path="/resultsPage"
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/payment/verify" element={<PaymentVerify />} />
        <Route path="/exam-limit-reached" element={<ExamLimitReached />} />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        {/* ✅ ADDED — Teacher Help & Support (protected, teacher-only guard inside component) */}
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <TeacherSupport />
            </ProtectedRoute>
          }
        />
        {/* ✅ ADDED — Student Help & Support (protected) */}
        <Route
          path="/student-support"
          element={
            <ProtectedRoute>
              <StudentSupport />
            </ProtectedRoute>
          }
        />

        {/* ✅ ADDED — Phase 2: Admin dashboard */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* ✅ ADDED — must stay LAST; React Router matches top-down, and "*"
            would swallow every route declared after it. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </div>
  );
}

export default AppRoutes;
