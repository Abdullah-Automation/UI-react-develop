import Link from 'next/link';
import { Box } from '@mui/material';

import { Page } from '~/components/ui';
import { ROUTES } from '~/config';

import {
  Wrapper,
  Title,
  SubTitle,
  Desc,
  FormLink,
  Block,
  BlockTitle,
  FormLinkSmall,
} from '../TermsOfService';

export const PrivacyPolicyPage = () => {
  return (
    <Page>
      <Wrapper>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='baseline'
          mb={2.5}
        >
          <Box>
            <Title>Privacy Policy</Title>
            <SubTitle>Effective September 2022</SubTitle>
          </Box>

          <Box display='flex'>
            <Desc>See also: &nbsp;</Desc>
            <Link href={ROUTES.TERMSOFSERVICE}>
              <FormLink>Terms of Service</FormLink>
            </Link>
          </Box>
        </Box>

        <Box>
          <Block>
            This privacy policy (“Policy”) informs you of our practices when
            handling your Personal Information through the Services (both as
            defined below). In this Policy, “Speechlab.ai”, “we” or “us” refers to
            Speechlab, Inc., a company registered in Delaware with its
            registered address located at 415 Ellsworth Street, San Francisco,
            CA 94110. We are the data controller under the applicable privacy
            laws.
            <br />
            <br />
            Where we have an agreement in place with an organization who is
            asking you to use our Services (for example your employer), we
            obtain and process your Personal Information on behalf of and at the
            instructions of that organization. In that context, these
            organizations are the data controllers and their privacy policies
            will apply to the processing of your Information. We encourage you
            to read their privacy policies.
            <br />
            <br />
            For the purpose of this Policy, “Personal Information” means any
            information relating to an identified or identifiable individual.
            This includes Personal Information you provide or generate when you
            use: services offered through our website at <a href='https://speechlab.ai' target='_blank' rel="noreferrer">https://speechlab.ai</a>
            (the “Services”). When you use the Services, you accept and
            understand that we collect, process, use, and store your Personal
            Information as described in this Policy.
            <br />
            <br />
            If you do not agree with this Policy, you must not use any of the
            Services. If you change your mind in the future you must stop using
            the Services and you may exercise your rights concerning your
            Personal Information as set out in this Policy.
          </Block>
          <Box>
            <BlockTitle>1. INFORMATION WE COLLECT</BlockTitle>
            <Block>
              We will collect and use the following Personal Information about
              you:
              <br />
              <br />
              Information you provide to us
              <br />
              <br />
              Registration Information. When you create an account on our
              Services, you will be asked to provide your name, email, and a
              password.
              <br />
              <br />
              Video and Audio Information. When you use the Services, you may
              provide us with audio and video recordings
              (collectively“Recordings”) that includes additional information
              about you or others.
              <br />
              <br />
              Communication Information. When you contact us, you provide us
              with your phone number, email, and any other information you
              choose to provide over such communication, including information
              about your query.
              <br />
              <br />
              Information you provide us about others
              <br />
              <br />
              If you provide Recordings, this may contain the Personal
              Information of third parties. Before you do so, please make sure
              you have the necessary permissions before sharing this Personal
              Information
              <br />
              <br />
              Information we automatically collect or is generated about you
              when use the Services
              <br />
              <br />
              Usage Information: When you use the Services, you generate
              information pertaining to your use, including timestamps for
              access, upload, process, edit and data export events,, additional
              data related to interactions with our team, and transaction
              records are also captured
              <br />
              <br />
              Technology Information: We collect information about the computer
              or mobile device you use to access the Speechlab Service and other
              platform information, including the hardware model, operating
              system and version,browser, and network information.
              <br />
              <br />
              Cookies: We use Cookies and other similar technologies (“Cookies”)
              to enhance your experience when using the Service. For more
              information about our Cookies policy, see HOW WE USE COOKIES AND
              SIMILAR TECHNOLOGIES below.
            </Block>
          </Box>

          <Box>
            <BlockTitle>2. HOW WE USE YOUR PERSONAL INFORMATION</BlockTitle>
            <Block>
              We use your Personal Information to:
              <br />
              <br />
              Set up your account. We use your registration information in order
              to set up an account for you to use our Services.
              <br />
              <br />
              Provide you with the Services. We use your Recordings, usage
              information and technology information in order to provide you
              with the Services.
              <br />
              <br />
              Improve and monitor the Services. We use information we
              automatically collect or generate about you when you use the
              Services, as well as non-personal information about your device
              and browser. We may train our proprietary artificial intelligence
              technology on aggregated, de-identified Recordings and other data
              that you transmit to the service in the course of editing
              transcripts and associated translated text. Only with your
              explicit permission will we manually review certain Recordings to
              further refine our model training data.
              <br />
              <br />
              Communicate with you. If you contact us, we will use your contact
              information to communicate with you and, if applicable, your usage
              information to support your use of the Services. We will send you
              emails with news or updates pertaining to our Services. When doing
              so, we process your email address, name and may process your usage
              information. Your consent can be withdrawn at any time by
              following the unsubscribe mechanism at the bottom of each
              communication.
            </Block>
          </Box>

          <Box>
            <BlockTitle>
              3. HOW WE USE COOKIES AND SIMILAR TECHNOLOGIES
            </BlockTitle>
            <Block>
              We and our third party partners use Cookies, pixel tags, and
              similar technologies to collect information about your browsing
              activities and to distinguish you from other users of our Services
              in order to aid your experience and measure and improve our
              advertising effectiveness.
              <br />
              <br />
              Cookies are small files of letters and numbers that we store on
              your browser or on your device. They contain information that is
              transferred to your device.
              <br />
              <br />
              We use Cookies to collect information about your browsing
              activities and to distinguish you from other users of our Services
              in order to aid your experience.
              <br />
              <br />
              We use the following types of Cookies and similar technologies:
              <br />
              <br />
              Strictly necessary Cookies: Some Cookies are strictly necessary to
              make our Services available to you; for example, to provide login
              functionality, user authentication and security. We cannot provide
              you with the Services without this type of Cookie.
              <br />
              <br />
              Functional Cookies: These are used to recognize you when you
              return to our Website. This enables us to personalize our content
              for you and remember your preferences (for example, your choice of
              language)
              <br />
              <br />
              You can block Cookies by setting your internet browser to block
              some or all or Cookies. However, if you use your browser settings
              to block all Cookies (including essential Cookies) you may not be
              able to use our Services.
              <br />
              <br />
              Except for essential Cookies, all Cookies will expire after a
              maximum of two years.
            </Block>
          </Box>

          <Box>
            <BlockTitle>
              4. WITH WHOM WE SHARE YOUR PERSONAL INFORMATION
            </BlockTitle>
            <Block>
              We share your Personal Information with selected third parties,
              including:
              <br />
              <br />
              Vendors and service providers we rely on for the provision of the
              Services, for example:
              <br />
              <ul>
                <li>
                  Cloud service providers who we rely on for compute, data
                  storage, and authentication services including Amazon Web
                  Services, based in the United States.
                </li>
                <br />
                <li>
                  Analytics providers who provide utilization statistics to help
                  us understand our user base. We work with a number of
                  analytics providers, including Google LLC, which is based in
                  the U.S. You can learn about Google’s practices by going to
                  https://www.google.com/policies/privacy/partners/, and opt-out
                  of them by downloading the Google Analytics opt-out browser
                  add-on, available at https://tools.google.com/dlpage/gaoptout.
                </li>
              </ul>
              Law enforcement agencies, public authorities or other judicial
              bodies and organizations. We disclose Personal Information if we
              are legally required to do so, or if we have a good faith belief
              that such use is reasonably necessary to comply with a legal
              obligation, process or request; enforce our terms of service and
              other agreements, policies, and standards, including investigation
              of any potential violation thereof; detect, prevent or otherwise
              address security, fraud or technical issues; or protect the
              rights, property or safety of us, our users, a third party or the
              public as required or permitted by law (including exchanging
              information with other companies and organizations for the
              purposes of fraud protection).
              <br />
              <br />
              Change of corporate ownership. If we are involved in a merger,
              acquisition, bankruptcy, reorganization, partnership, asset sale
              or other transaction, we may disclose your Personal Information as
              part of that transaction.
            </Block>
          </Box>

          <Box>
            <BlockTitle>5. HOW LONG WE STORE YOUR INFORMATION</BlockTitle>
            <Block>
              Speechlab stores all Personal Information for as long as necessary
              to fulfill the purposes set out in this Policy, or for as long as
              we are required to do so by law or in order to comply with a
              regulatory obligation. When deleting Personal Information, we will
              take measures to render such Personal Information irrecoverable or
              irreproducible, and the electronic files which contain Personal
              Information will be permanently deleted.
            </Block>
          </Box>

          <Box>
            <BlockTitle>6. YOUR RIGHTS</BlockTitle>
            <Block>
              In certain circumstances you have the following rights in relation
              to your Personal Information that we hold.
              <br />
              <br />
              <Box display="inline-block" fontWeight={800} />Access. You
              have the right to access the Personal Information we hold about
              you, and to receive an explanation of how we use it and who we
              share it with.
              <br />
              <br />
              <Box display="inline-block" fontWeight={800}>
                Correction.&nbsp;
              </Box>{' '}
              You have the right to correct any Personal Information we hold
              about you that is inaccurate or incomplete.
              <br />
              <Box display="inline-block" fontWeight={800}>
                Erasure.&nbsp;
              </Box>{' '}
              You have the right to request for your Personal Information to be
              erased or deleted. <br />
              <Box display="inline-block" fontWeight={800}>
                Object to processing.&nbsp;
              </Box>{' '}
              You have the right to object to our processing of your Personal
              Information if we are processing your Personal Information for
              direct marketing purposes. <br />
              <Box display="inline-block" fontWeight={800}>
                Restrict processing.&nbsp;
              </Box>{' '}
              You have a right in certain circumstances to stop us from
              processing your Personal Information other than for storage
              purposes. <br />
              <Box display="inline-block" fontWeight={800}>
                Portability.&nbsp;
              </Box>{' '}
              You have the right to receive, in a structured, commonly used and
              machine-readable format, Personal Information that you have
              provided to us if we process it on the basis of our contract with
              you, or with your consent, or to request that we transfer such
              Personal Information to a third party. <br />
              <Box display="inline-block" fontWeight={800}>
                Withdraw consent.&nbsp;
              </Box>{' '}
              You have the right to withdraw any consent you previously applied
              to us. We will apply your preferences going forward, and this will
              not affect the lawfulness of processing before your consent was
              given.
              <br />
              <br />
              Please note that, prior to any response to the exercise of such
              rights, we will require you to verify your identity. In addition,
              we may require additional information (for example, why you
              believe the information we hold about you is inaccurate or
              incomplete) and may have valid legal reasons to refuse your
              request. We will inform you if that is the case. For more
              information on how to exercise your rights, or to exercise your
              rights, please email{' '}
              <FormLinkSmall sx={{ display: 'inline-block' }}>
                support@speechlab.ai
              </FormLinkSmall>
            </Block>
          </Box>

          <Box>
            <BlockTitle>7. CHILDREN</BlockTitle>
            <Block>
              The Service and Website are not targeted at children, and we do
              not knowingly collect Personal Information from children under the
              age of 13. If you learn that a child has provided us with Personal
              Information in violation of this Policy, please contact us as
              indicated below.
            </Block>
          </Box>

          <Box>
            <BlockTitle>8. CONTACT & COMPLAINTS</BlockTitle>
            <Block>
              For inquiries or complaints regarding this Policy, please first
              contact us at{' '}
              <FormLinkSmall sx={{ display: 'inline-block' }}>
                support@speechlab.ai
              </FormLinkSmall>{' '}
              and we will endeavor to deal with your complaint as soon as
              possible. This is without prejudice to your right to launch a
              claim with a data protection authority .
              <br />
              <br />
              If you are based in the EEA or the UK, you may also make a
              complaint to either the Irish Data Protection Commission (on +353
              578 684 800 or via https://forms.dataprotection.ie/contact) or the
              UK’s ICO (on +44 303 123 1113 or via
              https://ico.org.uk/make-a-complaint/), or to the supervisory
              authority where you are located.
            </Block>
          </Box>

          <Box>
            <BlockTitle>9. DATA SECURITY</BlockTitle>
            <Block>
              We use certain physical, managerial, and technical safeguards that
              are designed to improve the integrity and security of Personal
              Information that we collect and maintain. However, the transfer of
              Personal Information through the internet will carry its own
              inherent risks and we do not guarantee the security of your data
              transmitted through the internet. You make any such transfer at
              your own risk.
              <br />
              <br />
              The Website and Service may provide features or links to websites
              and services provided by third parties. Any information you
              provide on Apps, third-party websites or services is provided
              directly to the operators of such websites or services and is
              subject to their policies governing privacy and security, even if
              accessed via our Website or in connection with our Service.
            </Block>
          </Box>

          <Box>
            <BlockTitle>10. CROSS-BORDER DATA TRANSFERS</BlockTitle>
            <Block>
              To facilitate our global operations, speechlab.ai may transfer,
              store and process your operations with our partners and service
              providers based outside of the country in which you are based.
              Laws in those countries may differ from the laws applicable to
              your country of residence. Where we transfer, store and process
              your Personal Information outside of the EEA or the UK we will
              ensure that the appropriate safeguards are in place to ensure an
              adequate level of protection such as through acceding to the
              Standard Contractual Clauses. Further details regarding the
              relevant safeguards can be obtained from us on request.
            </Block>
          </Box>

          <Box>
            <BlockTitle>11. CHANGES</BlockTitle>
            <Block>
              Where required, we will update this Policy from time to time. When
              we do so, we will make it available on this page and indicate the
              date of the latest revision. Please check this page frequently to
              see any updates or changes to this Policy.
            </Block>
          </Box>

          <Box>
            <BlockTitle>12. ABOUT US</BlockTitle>
            <Block>
              If you have any questions, comments or concerns about our Privacy
              Policy, you may contact us by email at{' '}
              <FormLinkSmall sx={{ display: 'inline-block' }}>
                support@speechlab.ai
              </FormLinkSmall>
              <br />
              attn: Privacy Officer or by mail to:
              <br />
              <br />
              Speechlab, Inc.
              <br />
              Attn: Privacy Officer
              <br />
              415 Ellsworth Street
              <br />
              San Francisco, CA 94110
              <br />
            </Block>
          </Box>
        </Box>
      </Wrapper>
    </Page>
  );
};
