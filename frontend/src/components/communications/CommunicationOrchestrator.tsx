import React, { useEffect } from 'react';
import { useCommunicationStore } from '@/stores/communication-store';
import { useUIStore } from '@/stores/ui-store';
import { CommunicationPlanCard } from './CommunicationPlanCard';

export function CommunicationOrchestrator() {
  const { 
    lifecycleState, 
    setLifecycleState, 
    messages, 
    updateMessageStatus 
  } = useCommunicationStore();
  const { demoMode, revealStage } = useUIStore();

  // In demo mode, once we reach the presentation stage for communications,
  // we animate through the communication lifecycle.
  useEffect(() => {
    if (!demoMode) return;
    
    // Assuming revealStage 4 is when Communication Plan is shown
    if (revealStage >= 4 && lifecycleState === 'PLAN_CREATED') {
      setTimeout(() => setLifecycleState('WAITING_APPROVAL'), 1000);
    }
    
    if (lifecycleState === 'WAITING_APPROVAL') {
      // Simulate Operator Approval after 2 seconds
      const timer = setTimeout(() => setLifecycleState('APPROVED'), 2000);
      return () => clearTimeout(timer);
    }

    if (lifecycleState === 'APPROVED') {
      const timer = setTimeout(() => setLifecycleState('SENDING'), 1000);
      return () => clearTimeout(timer);
    }

    if (lifecycleState === 'SENDING') {
      const timer = setTimeout(() => {
        messages.forEach(msg => updateMessageStatus(msg.id, 'Sent'));
        setLifecycleState('PARTIALLY_DELIVERED');
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (lifecycleState === 'PARTIALLY_DELIVERED') {
      const timer = setTimeout(() => {
        messages.forEach(msg => {
          updateMessageStatus(msg.id, 'Delivered');
          setTimeout(() => updateMessageStatus(msg.id, 'Read'), 500);
          setTimeout(() => updateMessageStatus(msg.id, 'Acknowledged'), 1000);
        });
        setTimeout(() => setLifecycleState('ACKNOWLEDGED'), 1500);
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (lifecycleState === 'ACKNOWLEDGED') {
      const timer = setTimeout(() => setLifecycleState('COMPLETED'), 1000);
      return () => clearTimeout(timer);
    }
  }, [demoMode, revealStage, lifecycleState, setLifecycleState, messages, updateMessageStatus]);

  return (
    <div className="space-y-4">
      {/* 
        This acts as the bridge in IncidentWorkspace.
        We show the plan when we reach the appropriate reveal stage.
      */}
      <CommunicationPlanCard messages={messages} />
    </div>
  );
}
