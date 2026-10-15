import React from 'react';
import { CartoonLampContact } from '../components/CartoonLampContact';

interface ContactViewProps {
  onLeadSubmitted?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onLeadSubmitted }) => {
  return (
    <div className="bg-[#070707] min-h-screen">
      <CartoonLampContact onLeadSubmitted={onLeadSubmitted} />
    </div>
  );
};
