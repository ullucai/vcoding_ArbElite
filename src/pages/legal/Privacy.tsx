import InfoPageLayout from '../../layouts/InfoPageLayout';

export default function Privacy() {
  return (
    <InfoPageLayout
      title="Privacy Policy"
      description="Last updated: January 2025"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            We collect information that you provide directly to us, including when you create an account, use our services, communicate with us, or participate in surveys or promotions. This information may include:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>Name, email address, and contact information</li>
            <li>Account credentials and authentication data</li>
            <li>Payment and billing information</li>
            <li>Trading preferences and settings</li>
            <li>Communications and correspondence with our support team</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            We use the information we collect to provide, maintain, and improve our services. Specifically, we use your information to:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>Create and manage your account</li>
            <li>Process transactions and send related information</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Send technical notices, updates, and security alerts</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, prevent, and address technical issues and fraudulent activity</li>
            <li>Comply with legal obligations and enforce our terms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Data Sharing and Disclosure</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            We do not sell your personal information. We may share your information in the following circumstances:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>With service providers who perform services on our behalf</li>
            <li>With payment processors to facilitate transactions</li>
            <li>When required by law or to protect rights and safety</li>
            <li>In connection with a merger, acquisition, or sale of assets</li>
            <li>With your consent or at your direction</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
          <p className="text-neutral-300 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption of data in transit and at rest, regular security assessments, access controls, and employee training. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights (GDPR & CCPA)</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li><strong>Access:</strong> You can request a copy of your personal information</li>
            <li><strong>Correction:</strong> You can request correction of inaccurate data</li>
            <li><strong>Deletion:</strong> You can request deletion of your personal information</li>
            <li><strong>Portability:</strong> You can request transfer of your data</li>
            <li><strong>Objection:</strong> You can object to certain processing activities</li>
            <li><strong>Opt-out:</strong> You can opt-out of marketing communications</li>
          </ul>
          <p className="text-neutral-300 leading-relaxed mt-4">
            To exercise these rights, please contact us at privacy@arbelite.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking</h2>
          <p className="text-neutral-300 leading-relaxed">
            We use cookies and similar tracking technologies to collect information about your browsing activities. This includes essential cookies for site functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings. You can control cookie preferences through your browser settings. For more information, see our Cookie Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
          <p className="text-neutral-300 leading-relaxed">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When we no longer need your information, we will securely delete or anonymize it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
          <p className="text-neutral-300 leading-relaxed">
            Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards, including standard contractual clauses approved by regulatory authorities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
          <p className="text-neutral-300 leading-relaxed">
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete such information promptly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
          <p className="text-neutral-300 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
          <p className="text-neutral-300 leading-relaxed">
            For questions or concerns about this Privacy Policy or our data practices, please contact us at: privacy@arbelite.com
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
