import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Terms of Use' };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" sections={[
      ['Use of this website', 'Set out the conditions for using the site and its content.'],
      ['Product information', 'Note that specifications on the site are indicative and confirmed in each quotation.'],
      ['Intellectual property', 'State who owns the text, images, logos and documents on the site.'],
      ['Liability', 'Describe the limits of liability for use of the site and its information.'],
      ['Governing law', 'Name the law and courts that apply to these terms.']
    ]} />
  );
}
