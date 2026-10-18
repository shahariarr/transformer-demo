import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" sections={[
      ['Information we collect', 'Describe what visitors share through the contact form, email and WhatsApp, and any data collected automatically.'],
      ['How we use it', 'Explain that enquiry details are used to respond to requests and prepare quotations.'],
      ['Sharing and storage', 'State who the information may be shared with, where it is stored and for how long.'],
      ['Your rights', 'Explain how people can ask to see, correct or delete their information.'],
      ['Contact', 'Give the contact details for privacy questions.']
    ]} />
  );
}
