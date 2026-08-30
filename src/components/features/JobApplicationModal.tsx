import React from 'react';
import { Modal } from '../common/Modal';
import { useModal } from '../../context/ModalContext';
import { JobPosting } from '../../types';
import { Briefcase } from 'lucide-react';

export const JobApplicationModal: React.FC = () => {
  const { activeModal, modalData, closeModal } = useModal();
  const job: JobPosting | null = activeModal === 'job' && modalData ? (modalData as JobPosting) : null;

  if (!job) return null;

  return (
    <Modal
      isOpen={activeModal === 'job'}
      onClose={closeModal}
      title={job.title}
      subtitle={job.location}
    >
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <Briefcase size={32} style={{ color: 'rgba(255,255,255,0.15)', marginBottom: '0.75rem' }} />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-disabled)', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto' }}>
          This position is not currently accepting applications. Cristedor Group is early-stage and roles will be published when they genuinely exist.
        </p>
      </div>
    </Modal>
  );
};
