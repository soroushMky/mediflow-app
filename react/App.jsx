import { useState } from 'react';
import SignOff from './SignOff';
import NoteFiled from './NoteFiled';
import DraftReview from './DraftReview';
import PatientProfile from './PatientProfile';
import Scheduling from './Scheduling';
import VantaBackground from './VantaBackground';

const SCREENS = {
  draft: DraftReview,
  signoff: SignOff,
  filed: NoteFiled,
  profile: PatientProfile,
  scheduling: Scheduling,
};

export default function App() {
  const [view, setView] = useState('signoff');
  const Screen = SCREENS[view];

  return (
    <>
      <VantaBackground />
      <Screen onNavigate={setView} />
    </>
  );
}
