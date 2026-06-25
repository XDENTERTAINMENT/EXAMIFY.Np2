import { useState } from "react";
import { Joyride } from 'react-joyride'; 
import API from "../services/api";

/**
 * First-time guided tour.
 *
 * Reads `user.hasCompletedOnboarding` from localStorage (set at login from the
 * MongoDB field of the same name) to decide whether to run automatically.
 * On finish/skip, calls POST /auth/complete-onboarding so the flag persists
 * in MongoDB — not just localStorage — and updates localStorage to match.
 *
 * Usage:
 * <OnboardingTour
 *   steps={[
 *     { target: ".teacher-hero", content: "This is your dashboard" },
 *     { target: ".sidebar-create-exam", content: "Click here to create exams" },
 *   ]}
 * />
 */
function OnboardingTour({ steps = [] }) {
  const [run, setRun] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && !user.hasCompletedOnboarding;
  });

  const markComplete = async () => {
    setRun(false);

    try {
      await API.post("/auth/complete-onboarding");
    } catch (err) {
      console.log("Failed to save onboarding status:", err);
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      user.hasCompletedOnboarding = true;
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const handleCallback = (data) => {
    const { status } = data;

    if (["finished", "skipped"].includes(status)) {
      markComplete();
    }
  };

  if (steps.length === 0) return null;
  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      callback={handleCallback}
      styles={{
        options: {
          primaryColor: "#111c3d",
          zIndex: 10000,
        },
      }}
    />
  );
}

export default OnboardingTour;
