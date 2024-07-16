import {
  Container,
  Typography
} from '@mui/material'
import { type FC } from 'react'
import { pageWrapperCSS } from 'theme'


const PrivacyPolicy: FC = () => {
  return (
    <Container css={pageWrapperCSS}>
      <Typography variant="h2" gutterBottom>
        Privacy Policy
      </Typography>
      <Container css={{ maxWidth: '600px' }}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Effective Date:</strong> July 10th, 2024
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to Ideas Down (“we,” “our,” or “us”). Your privacy is important to us. This Privacy Policy outlines how we handle your information. Importantly, Ideas Down does not collect, store, or process any personal data from its users.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Information We Do Not Collect
        </Typography>
        <Typography variant="body1" paragraph>
          At Ideas Down, we are committed to maintaining your privacy. We do not collect, store, or process any personal data, including but not limited to:
        </Typography>
        <ul>
          <li>Personal Identification Information (such as name, email address, or phone number)</li>
          <li>Location Information</li>
          <li>Usage Data</li>
          <li>Device Information</li>
          <li>Payment Information</li>
        </ul>

        <Typography variant="h6" gutterBottom>
          2. Data Retention
        </Typography>
        <Typography variant="body1" paragraph>
          Since we do not collect any personal data, we do not retain any information about you or your activities.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Third-Party Services
        </Typography>
        <Typography variant="body1" paragraph>
          Ideas Down does not integrate with any third-party services that would collect your data. Our app is designed to operate independently without needing to share or transfer any information about you to third parties.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Cookies and Tracking Technologies
        </Typography>
        <Typography variant="body1" paragraph>
          We do not use cookies, web beacons, or any other tracking technologies to collect information about your usage or behavior within the app.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Security
        </Typography>
        <Typography variant="body1" paragraph>
          Even though we do not collect personal data, we take security seriously. We employ standard security measures to ensure that the app itself remains secure and free from vulnerabilities.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Children's Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          Ideas Down does not knowingly collect or solicit any personal information from anyone under the age of 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. Any changes will be posted in this section with the revised date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </Typography>
        <ul>
          <li><strong>Website:</strong> https://ideas.sillysideprojects.com/contact</li>
        </ul>
      </Container>
    </Container>
  )
}

export default PrivacyPolicy
