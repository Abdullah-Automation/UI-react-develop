/* eslint-disable react/function-component-definition */
import Link from 'next/link';
import type { NextPage } from 'next';
import { Box } from '@mui/material';

import { Page } from '~/components/ui';
import { ROUTES } from '~/config';

import {
  Wrapper,
  Title,
  Desc,
  FormLink,
  Block,
  SubTitle,
  BlockTitle,
  FormLinkSmall,
} from './TermsOfService.styled';

export const TermsOfServicePage: NextPage = () => {
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
            <Title>Terms of Service</Title>
            <SubTitle>Last Updated: [May 22nd, 2023]</SubTitle>
          </Box>

          <Box display='flex'>
            <Desc>See also: &nbsp;</Desc>
            <Link href={ROUTES.PRIVACYPOLICY}>
              <FormLink>Privacy Policy</FormLink>
            </Link>
          </Box>
        </Box>

        <Box>
          <Block>
            These Speechlab Terms of Service (these “Terms”) govern your use of
            and access to the websites and services provided to you by
            Speechlab, Inc. (“us”, “we”, or “our”), which include the Speechlab,
            Inc. website (the “Site”), and all related tools and services
            (collectively, the “Speechlab Service”). BY ACCEPTING THESE TERMS OR
            USING THE SPEECHLAB SERVICE YOU AGREE THAT YOU ARE ENTERING INTO AN
            AGREEMENT WITH US AND AGREE TO BE BOUND BY THESE TERMS. IF YOU DO
            NOT AGREE TO ALL OF THESE TERMS, DO NOT USE THE SPEECHLAB SERVICE.
            IF YOU ARE ENTERING INTO THIS AGREEMENT ON BEHALF OF AN
            ORGANIZATION, YOU REPRESENT THAT YOU ARE AN EMPLOYEE OR AGENT OF
            SUCH ORGANIZATION AND YOU HAVE THE AUTHORITY TO ENTER INTO THIS
            AGREEMENT ON BEHALF OF SUCH ORGANIZATION.
          </Block>
          <Block>
            IMPORTANT: PLEASE REVIEW THE MUTUAL ARBITRATION AGREEMENT SET FORTH
            BELOW CAREFULLY, AS IT WILL REQUIRE YOU TO RESOLVE DISPUTES WITH
            SPEECHLAB ON AN INDIVIDUAL BASIS (WAIVING CUSTOMER’S RIGHT TO A
            CLASS ACTION) THROUGH FINAL AND BINDING ARBITRATION. BY ENTERING
            THIS AGREEMENT, YOU EXPRESSLY ACKNOWLEDGE THAT YOU HAVE READ AND
            UNDERSTAND ALL OF THE TERMS OF THIS MUTUAL ARBITRATION AGREEMENT AND
            HAVE TAKEN THE TIME TO CONSIDER THE CONSEQUENCES OF THIS DECISION.
            THESE TERMS AND CONDITIONS ALSO CONTAIN RELEASES, LIMITATIONS ON
            LIABILITY, AND PROVISIONS ON INDEMNITY AND ASSUMPTION OF RISK, ALL
            OF WHICH MAY LIMIT CUSTOMER’S LEGAL RIGHTS AND REMEDIES. PLEASE
            REVIEW THEM CAREFULLY.
          </Block>
          <Block>
            We may make changes to these Terms from time to time. The “Last
            Updated” date indicates when these Terms were last changed. If we
            make future changes, we will provide you with notice of such
            changes, for instance by sending an email, providing a notice
            through the Speechlab Service or updating the date at the top of
            these Terms. Unless we say otherwise in our notice, the amended
            Terms will be effective immediately, and your continued use of our
            Services after we provide such notice will confirm your acceptance
            of the changes. If you do not agree to the amended Terms, you must
            stop using the Speechlab Service.
          </Block>

          <Box>
            <BlockTitle>1. Service</BlockTitle>
            <Block>
              The Service enables Automated Speech Translation for recorded
              audio and video. The Service lets you (a) upload audio or video to
              generate a transcript or caption file, (b) translate the resultant
              transcripts to generate a subtitle in a new target language (c)
              generate audio dubs in the new target language, (d) generate video
              with the associated dubs (e) export captions, subtitles and
              associated dubs in a number of file formats for use in production.
            </Block>
          </Box>

          <Box>
            <BlockTitle>2. Eligibility</BlockTitle>

            <Block>
              You must be at least 13 years old to use the Service. By agreeing
              to these Terms, you represent and warrant to us that: (a) you are
              at least 13 years old; (b) you have not previously been suspended
              or removed from the Service; and (c) your registration and your
              use of the Service is in compliance with any and all applicable
              laws and regulations. If you are an Organization, the individual
              accepting these Terms on your behalf represents and warrants that
              they have authority to bind you to these Terms and you agree to be
              bound by these Terms.
            </Block>
          </Box>

          <Box>
            <BlockTitle>3. Registration and Account Information</BlockTitle>

            <Block>
              You must create an account before using the Speechlab Service. You
              must provide complete and accurate information as requested in the
              registration process, and must maintain and update all information
              provided as required to keep it current, complete and accurate.
              Any failure to do so may, among other things, result in deletion
              of your account and a refusal to allow you to resume any use of
              the Speechlab Service. Account credentials may not be shared or
              transferred except with others who have agreed to abide by these
              Terms and who are only authorized to use the Speechlab Service for
              the purpose of performing a job function for you (each, an
              “Authorized User”). You agree to maintain (and will ensure that
              your Authorized Users maintain) the security and confidentiality
              of user names and passwords. You are responsible for any and all
              activities that occur under your account, and you agree to
              immediately notify us of any unauthorized use of your account or
              any other breach of security related to your account or the
              Speechlab Service.
            </Block>
          </Box>

          <Box>
            <BlockTitle>4. Privacy</BlockTitle>

            <Block>
              Please refer to our&nbsp;
              <Link href={ROUTES.PRIVACYPOLICY}>
                <FormLinkSmall sx={{ display: 'inline-block' }}>
                  Privacy Policy
                </FormLinkSmall>
              </Link>
              &nbsp;for information about how we collect, use and disclose
              information about you.
            </Block>
          </Box>

          <Box>
            <BlockTitle>5. License</BlockTitle>

            <Block>
              <Box display='inline-block' fontWeight={800}>
                5.1. License Grant. &nbsp;
              </Box>
              Subject to these Terms, we hereby grant to you a limited,
              nonexclusive, nontransferable, non-sublicensable, revocable
              license to access and use the Speechlab Service for your own
              personal, noncommercial use.
              <br />
              <Box display='inline-block' fontWeight={800}>
                5.2. Restrictions and Limitations. &nbsp;
              </Box>
              Such license does not include the right to: (a) license,
              sublicense, sell, resell, rent, transfer, assign, distribute or
              otherwise commercially exploit or make the Speechlab Service, or
              any portion thereof, available to any third party, except as
              expressly permitted herein and subject to the terms set forth in
              these Terms; (b) reverse engineer, disassemble, or decompile the
              Service or otherwise attempt to discover the source code for, or
              any trade secrets related to the Speechlab Service; (c) remove any
              copyright, trademark or other proprietary notices from the
              Speechlab service, or any component thereof; (d) modify, alter or
              create any derivative works of the Speechlab Service or any
              component thereof; (e) reproduce or distribute the Speechlab
              Service or copy any ideas, features, functions, or content
              thereof, except as expressly permitted under these Terms; or (f)
              use the Speechlab Service, or any component thereof, for any
              purposes other than as expressly permitted herein. All rights not
              expressly granted in these Terms are reserved by us.
            </Block>
          </Box>

          <Box>
            <BlockTitle>6. Ownership; Trademarks</BlockTitle>

            <Block>
              Ownership of the Speechlab Service, and all content and materials
              contained therein other than any User Content (as defined below),
              are owned solely by us or our licensees and are protected by U.S.
              and international copyright laws. No title to or ownership of the
              Site, the Speechlab Service or any proprietary rights associated
              with them is transferred to you by these Terms. Speechlab and our
              logos, our product or service names, our slogans and the look and
              feel of the Speechlab Service are our intellectual property and
              may not be copied, imitated or used, in whole or in part, without
              our prior written permission. All other trademarks, registered
              trademarks, product names and company names or logos mentioned on
              the Speechlab Service are the property of their respective owners.
              Reference to any products, services, processes or other
              information by trade name, trademark, manufacturer, supplier or
              otherwise does not constitute or imply endorsement, sponsorship or
              recommendation by us.
            </Block>
          </Box>

          <Box>
            <BlockTitle>7. Feedback</BlockTitle>

            <Block>
              If you choose to provide input and suggestions regarding problems
              with or proposed modifications or improvements to the Service
              (“Feedback”), then you hereby grant Speechlab an unrestricted,
              perpetual, irrevocable, non-exclusive, fully-paid, royalty-free
              right to exploit the Feedback in any manner and for any purpose,
              including to improve the Service and create other products and
              services
            </Block>
          </Box>

          <Box>
            <BlockTitle>8. User Content and Conduct</BlockTitle>

            <Block mb={2}>
              <Box display='inline-block' fontWeight={800}>
                8.1. User Content Rules.
              </Box>{' '}
              Users of the Speechlab Service (each a “User”) may provide, store
              and share audio files, video files, text and other items
              (collectively, the “User Content”) including for use in connection
              with projects User creates using the Speechlab Service
              (collectively the “Projects”). You are solely responsible for your
              User Content, and we are neither responsible nor liable for any
              User Content or for the use, availability, deletion, correction,
              destruction, damage, or loss thereof. You may post or otherwise
              share only User Content that is nonconfidential and that you have
              all necessary rights to disclose. You will not create, upload,
              transmit, publish or otherwise use, on or in connection with the
              Speechlab Service, any User Content that: (a) infringes upon or
              violates the rights of any third party including any copyright,
              trademark, trade secret, or other intellectual property rights,
              rights of publicity, rights of privacy, or contract rights; (b) is
              illegal, defamatory, obscene, pornographic, vulgar, indecent,
              lewd, offensive, threatening, abusive, harmful, inflammatory,
              deceptive, false, misleading, or fraudulent; (c) promotes hatred,
              discrimination, bigotry, racism, harassment, violence or harm
              against any individual or group; (d) violates, or encourages any
              conduct that would violate, any applicable laws, rules or
              regulations or give rise to any civil liability; (e) contains any
              viruses, corrupted data or other harmful, disruptive or
              destructive files; (f) restricts, interferes with or inhibits any
              other person from using or enjoying the Speechlab Service; (g)
              attempts to generate the voice of a non-consenting speaker using
              our Dub technology; (h) impersonates, or misrepresents your
              affiliation with, any person or entity; (i) contains any
              unsolicited promotions, political campaigning, advertising or
              solicitations; (j) in our sole judgment, is objectionable,
              restricts or inhibits any other person from using or enjoying the
              Speechlab Service; or (k) that would otherwise expose us or any
              third party to liability, special regulations, or harm of any
              kind. We reserve the right to delete or block access to any User
              Content at any time and for any reason in its sole discretion,
              including if it receives any notices or otherwise believes that
              such User Content may be in violation of these Terms or may
              otherwise violate the rights of, or cause any harm or liability of
              any kind to, us or any third party. In addition, this Section 8
              does not create any private right of action on the part of any
              third party or any reasonable expectation that the Speechlab
              Service will not contain any content that is prohibited by such
              rules.
            </Block>
            <Block mb={2}>
              <Box display='inline-block' fontWeight={800}>
                8.2 License to User Content.
              </Box>{' '}
              We claim no ownership rights in your User Content. You hereby
              grant to us a perpetual, irrevocable, nonexclusive, royalty-free,
              sublicensable, fully paid, worldwide license to create derivative
              works from, access, reproduce, distribute, process, publish,
              display, perform, adapt, modify, analyze, and otherwise use the
              User Content and any name, username or likeness provided in
              connection with your User Content in all media formats and
              channels now known or later developed without compensation to you
              or a third party to provide, maintain, and improve the Speechlab
              Service; provided that our use of any Projects you create is
              subject to the usage limitations and confidentiality obligations
              set forth in Section 9 below.
            </Block>

            <Block>
              <Box display='inline-block' fontWeight={800}>
                8.3 User Conduct Rules.
              </Box>{' '}
              In using the Speechlab Service, you must at all times comply with
              all applicable laws, rules and regulations. All rights not
              expressly granted in these Terms are reserved by us. You are
              solely responsible for your conduct while using the Speechlab
              Service. User is solely responsible for User’s conduct and agrees
              not to do any of the following in connection with the Speechlab
              Service: (a) use the Speechlab Service other than for its intended
              purpose and in any manner that could interfere with, disrupt,
              negatively affect or inhibit other users from fully enjoying and
              using the Speechlab Service or that could damage, disable,
              disrupt, overburden or impair the functioning of the Speechlab
              Service in any manner; (b) use or attempt to use another user’s
              account without authorization from that user and us; impersonate
              or post on behalf of any person or entity or otherwise
              misrepresent your affiliation with a person or entity; (c) stalk,
              intimidate, threaten, or otherwise harass or cause discomfort to
              other users; (d) send distribute or post spam, unsolicited or bulk
              commercial electronic communications, chain letters, or pyramid
              schemes; (e) harvest or otherwise collect or disclose information
              about other users without their consent; (f) use the Speechlab
              Service for any illegal or unauthorized purpose or engage in,
              encourage, or promote any illegal activity, or any activity that
              violates these Terms; (g) circumvent or attempt to circumvent any
              filtering, security measures or other features we may from time to
              time adopt to protect us, the Speechlab Service, its users or
              third parties; (h) use any data mining, robots or similar data
              gathering or extraction methods designed to scrape or extract data
              from the Speechlab website or Service; (i) develop or use any
              applications that interact with the Speechlab Service without our
              prior written consent; (j) bypass or ignore instructions contained
              in our robots.txt file; (k) distribute or enable any malware,
              spyware, adware or other malicious code; and (l) reverse engineer,
              disassemble, or decompile any aspect of Speechlab Service or
              otherwise attempt to discover the source code for, or any trade
              secrets related to, the Speechlab Service. You acknowledge and
              agree that we are not liable in any manner for the conduct of
              other users of the Speechlab Service.
            </Block>
          </Box>

          <Box>
            <BlockTitle>
              9. Use of Project Information; Confidentiality
            </BlockTitle>

            <Block mb={2}>
              <Box display='inline-block' fontWeight={800}>
                9.1 Use of Project Information.
              </Box>
              When you create a Project, we may access and use such Project for
              the following purposes (the “Permitted Purposes), subject to the
              confidentiality obligations set forth in Section 9.2 below: (a) We
              may use your Project for the purpose of providing the Speechlab
              Service. We automatically process your Projects, but it does not
              involve human access to your Projects unless: (i) you ask or
              otherwise give permission for us to do so (e.g., for the purpose
              of providing customer support); or (iii) we are required to do so
              by law. (b) If we access your Project in accordance with 9.1(a),
              we may also use your Projects to analyze and improve the quality
              of our service and our technology.‍
            </Block>

            <Block mb={2}>
              <Box display='inline-block' fontWeight={800}>
                9.2 Confidentiality.
              </Box>{' '}
              We treat your Projects and the User Content contained therein
              (including audio and video files and associated transcripts and
              translated text) as your "Confidential Information" in accordance
              with the terms of this Section 9.2. We will not, without your
              consent, use the Confidential Information other than for the
              Permitted Purposes or disclose the Confidential Information to any
              third party other than to our officers, directors, employees,
              agents, assigns, consultants, contractors, service providers,
              representatives or affiliated entities who need to access such
              Confidential Information in connection with the Permitted Purpose
              and who are bound by confidentiality obligations to protect the
              confidentiality of such information or as required by law.
              <br />
              <br />
              We will use at least reasonable care to protect the
              confidentiality of the Confidential Information. In the event that
              we are required by law to disclose any of your Confidential
              Information, by subpoena, judicial or administrative order or
              otherwise, we will (to the extent legally permissible) use
              commercially reasonable efforts to give you notice of such
              requirement and permit you to intervene in any relevant
              proceedings to protect your interests in your Confidential
              Information. Confidential Information will not include, and the
              obligations herein will not apply to, any information or content:
              <br />
              <br />
              (a) that is known to us, prior to receipt from you, or is obtained
              from a source other than one having an obligation of
              confidentiality to you;
              <br />
              (b) that has become known (independent of disclosure by you) to us
              directly or indirectly from a source other than one having an
              obligation of confidentiality to you; or
              <br />
              (c) that has become publicly known or otherwise ceases to be
              secret or confidential, except through a breach of this Section by
              us, including if you designate a Project as “public” or post such
              information or content in a public area of the Site.
              <br />
              <br />
              <Box display='inline-block' fontWeight={800}>
                9.3 Use of Dubbing Feature.
              </Box>{' '}
              Dubbing is a feature of the Speechlab Service that allows you to
              create synthesized voice recordings that sound like the original
              speaker speaking in the target language. A synthesized voice is an
              AI model trained on voice recordings of the original speaker and
              other speakers.
              <br />
              <br />
              We automatically generate new synthesized voices that seek to
              mimic the original source speaker by using audio in the original
              source audio and video as training audio (“Training Audio”). By
              submitting Training Audio to us, represent and warrant that you
              have obtained the consent of all speakers in the original source
              content to our use and storage of the audio recordings and voices
              you submit as follows:
              <br />
              <br />
              (a) to use voices from the source video and audio, to synthesize
              and otherwise use such voices as described herein, and to
              otherwise operate the Speechlab Service;
              <br />
              <br />
              (b) as part of our research datasets to analyze, maintain, and
              improve our voice technology, and other technology, and for other
              research and development and data analysis purpose, provided that
              if we add your Training Audio to our research datasets, we first
              de-identify the data so it is no longer associated with your
              account;
              <br />
              <br />
              (c) our employees and contractors may listen to audio samples of
              your Training Audio and your synthesized audio in order to test
              the quality of the synthesized voice and monitor for potential
              misuse; and
              <br />
              <br />
              (d) our employees and contractors may use synthesized voices to
              create a series of non-defamatory utterances, solely for internal
              quality assurance purposes.
              <br />
              <br />
              Other than as described above, only you, and people you explicitly
              share access with, will have access to generate dubbed audio using
              synthesized voices generated using your content. We will not share
              your Training Audio and associated synthesized with third parties
              except as expressly described above and in our Privacy Policy.
            </Block>
          </Box>

          <Box>
            <BlockTitle>10. Representations and Warranties</BlockTitle>

            <Block>
              You represent and warrant that (a) the User Content is original to
              you and does not and will not infringe upon or violate the
              intellectual property, privacy or other rights of any third party
              or these Terms, and (b) you will comply with all applicable laws,
              rules or regulations in connection with your use of the Speechlab
              Service.
            </Block>
          </Box>

          <Box>
            <BlockTitle>11. Digital Millennium Copyright Act</BlockTitle>

            <Block>
              <Box display='inline-block' fontWeight={800}>
                11.1 DMCA Notification.
              </Box>{' '}
              We comply with the provisions of the Digital Millennium Copyright
              Act applicable to Internet service providers (17 U.S.C. §512, as
              amended). If you have an intellectual property rights-related
              complaint about material posted on the Service, you may contact
              our Designated Agent at the following address:
              <br />
              <br />
              <Box>
                Speechlab, Inc.
                <br /> Attn: Legal Department (Copyright Notification)
                <br />
                415 Ellsworth Street, San Francisco, CA 94110 <br />
                Email:{' '}
                <FormLinkSmall sx={{ display: 'inline-block' }}>
                  dmca@speechlab.ai
                </FormLinkSmall>
              </Box>
              <br />
              Any notice alleging that materials hosted by or distributed
              through the Service infringe intellectual property rights must
              include the following information:
              <br />
              <br />
              a. an electronic or physical signature of the person authorized to
              act on behalf of the owner of the copyright or other right being
              infringed;
              <br />
              b. a description of the copyrighted work or other intellectual
              property that you claim has been infringed; <br /> c. a
              description of the material that you claim is infringing and where
              it is located on the Service; <br />
              d. your address, telephone number, and email address; <br />
              e. a statement by you that you have a good faith belief that the
              use of the materials on the Service of which you are complaining
              is not authorized by the copyright owner, its agent, or the law;
              and <br />
              f. a statement by you that the above information in your notice is
              accurate and that, under penalty of perjury, you are the copyright
              or intellectual property owner or authorized to act on the
              copyright or intellectual property owner’s behalf.
              <br />
              <br />
              <Box display='inline-block' fontWeight={800}>
                11.2 Repeat Infringers.&nbsp;
              </Box>
              Speechlab will promptly terminate the accounts of users that are
              determined by Speechlab to be repeat infringers.
            </Block>
          </Box>

          <Box>
            <BlockTitle>12. Refund Policy</BlockTitle>
            <Block>
              <Box display='inline-block' fontWeight={800}>
                12.1 Overview.
              </Box>{' '}
              Our primary goal at Speechlab is to ensure that our customers are
              100% satisfied with our automated dubbing services. We acknowledge
              that there may be certain situations where you might feel the need
              to request a refund, and for such cases, we have designed this
              comprehensive policy to guide you through the process. This policy
              does not override or impact any statutory rights you may have
              under applicable consumer law.
              <br />
              <br />
              <Box display='inline-block' fontWeight={800}>
                12.2 Refund Eligibility.
              </Box>{' '}
              You may be eligible for a refund if:
              <br />
              <br />
              a. There is a technical error on our part that prevents you from
              using our services properly, and we are unable to rectify this
              error within 72 hours of your reporting it to our customer service
              team.
              <br />
              b. The quality of the dubbing service you received is
              significantly different from what was promised or not up to
              standard, and you have notified us within 24 hours of receiving
              the service.
              <br />
              <br />
              Please note, we are unable to provide refunds for dissatisfaction
              with the service due to personal taste or expectations beyond the
              quality standards we have communicated.
              <br />
              <br />
              <Box display='inline-block' fontWeight={800}>
                12.3 Non-refundable Situations.
              </Box>{' '}
              We cannot offer a refund under the following instances:
              <br />
              <br />
              a. If the service has been delivered correctly and meets the
              quality standards we have communicated.
              <br />
              b. For small technical errors that do not significantly impact the
              overall quality and usage of the service.
              <br />
              c. For change of mind or if you no longer need the service after
              it has been processed.
              <br />
              <br />
              <Box display='inline-block' fontWeight={800}>
                12.4 Refund Request.
              </Box>{' '}
              To request a refund, please get in touch with our customer service
              team via our Contact Us page. Please include the following details
              in your request:
              <br />
              <br />
              a. Your name and contact information.
              <br />
              b. The details of the service you purchased (including the time
              and date of purchase).
              <br />
              c. The reason for your refund request.
              <br />
              d. Any relevant supporting documents or evidence.
              <br />
              <br />
              <Box display='inline-block' fontWeight={800}>
                12.5 Refund Process.
              </Box>{' '}
              Once we receive your request, we will review it within 3-5
              business days. If your refund is approved, it will be processed,
              and a credit will automatically be applied to your original method
              of payment. This could take up to 10 business days depending on
              your payment provider.
              <br />
              <br />
              <Box display='inline-block' fontWeight={800}>
                12.7 Contact Us.
              </Box>{' '}
              If you have any questions about our refund policy, please contact
              us at support@speechlab.ai.
            </Block>
          </Box>

          <Box>
            <BlockTitle>13. Third-Party Content and Services</BlockTitle>

            <Block>
              We may include or provide access to third party data, information
              and content, including from other users of the Speechlab Service
              (collectively the “Third Party Content”) as a service to those
              interested in this information. We do not control, endorse or
              adopt any Third Party Content and make no representation or
              warranties of any kind regarding the Third Party Content,
              including without limitation regarding its accuracy or
              completeness or non-infringement. You acknowledge and agree that
              we are not responsible or liable in any manner for any Third Party
              Content, or for any use thereof in connection with the Speechlab
              Service. We undertake no responsibility to update or review any
              Third Party Content. Your dealings or correspondence with third
              parties and your use of or interaction with any Third-Party
              Content are solely between you and the third party.
            </Block>
          </Box>

          <Box>
            <BlockTitle>14. Indemnification</BlockTitle>

            <Block>
              To the fullest extent permitted by applicable law, you will
              indemnify, defend and hold harmless us and our subsidiaries and
              affiliates, and each of our respective officers, directors,
              agents, partners and employees (individually and collectively, the
              “Company Parties”) from and against any losses, liabilities,
              claims, demands, damages, expenses or costs (“Claims”) arising out
              of or related to (a) your access to or use of the Speechlab
              Service; (b) your User Content or Feedback; (c) your violation of
              these Terms; (d) your violation, misappropriation or infringement
              of any rights of another (including intellectual property rights
              or privacy rights); (e) your conduct in connection with the
              Speechlab Service; (f) the use of any Training Audio you submit;
              or (g) any breach or alleged breach of any of the representations
              or warranties set forth in these Terms. You agree to promptly
              notify Company Parties of any third-party Claims, cooperate with
              Company Parties in defending such Claims and pay all fees, costs
              and expenses associated with defending such Claims (including
              attorneys' fees). You also agree that the Company Parties will
              have control of the defense or settlement, at our sole option, of
              any third-party Claims. This indemnity is in addition to, and not
              in lieu of, any other indemnities set forth in a written agreement
              between you and us or the other Company Parties.
            </Block>
          </Box>

          <Box>
            <BlockTitle>15. Disclaimer</BlockTitle>

            <Block>
              EXCEPT AS OTHERWISE EXPRESSLY PROVIDED IN THIS AGREEMENT, YOU
              ACKNOWLEDGE THAT THE SPEECLAB SERVICE AND ALL ITEMS, CONTENT, AND
              SERVICES PROVIDED OR MADE AVAILABLE IN CONNECTION THEREWITH ARE
              BEING PROVIDED ON AN “AS IS,” “AS AVAILABLE” BASIS, WITH NO
              WARRANTIES OF ANY KIND, EXPRESS, IMPLIED OR ARISING BY LAW,
              INCLUDING WITHOUT LIMITATION REGARDING THE RELIABILITY,
              AVAILABILITY, TIMELINESS, QUALITY, SUITABILITY, PERFORMANCE,
              SECURITY, ACCURACY OR COMPLETENESS OF THE SPEECHLAB SERVICE. WE
              EXPRESSLY DISCLAIM ALL WARRANTIES OF MERCHANTABILITY, FITNESS FOR
              A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. IN ADDITION,
              WITHOUT LIMITING THE FOREGOING, SPEECHLAB DOES NOT REPRESENT OR
              WARRANT THAT (A) THE SPEECHLAB SERVICE WILL MEET YOUR REQUIREMENTS
              OR EXPECTATIONS OR ACHIEVE ANY PARTICULAR RESULTS; (B) ANY
              TRANSCRIPTION, DATA, ANALYSIS OR REPORTS WILL BE ACCURATE OR
              RELIABLE; (C) MINOR ERRORS OR DEFECTS WILL BE CORRECTED; (D) THAT
              THE SPEECHLAB SERVICE WILL BE UNINTERRUPTED OR FREE FROM BUGS,
              ERRORS, OMISSIONS OR INTERRUPTIONS; OR (E) THE SPEECHLAB SERVICE
              OR THE SERVERS THAT MAKE THE SPEECHLAB SERVICE AVAILABLE ARE FREE
              OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOU ASSUME THE ENTIRE RISK
              AS TO THE QUALITY AND PERFORMANCE OF THE SPEECHLAB SERVICE.
            </Block>
          </Box>

          <Box>
            <BlockTitle>16. Limitation of Liability</BlockTitle>

            <Block>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW: (A) IN NO EVENT
              WILL WE BE LIABLE TO YOU OR ANY OTHER THIRD PARTY FOR ANY
              INDIRECT, CONSEQUENTIAL, SPECIAL, EXEMPLARY, INCIDENTAL, OR
              PUNITIVE DAMAGES, LOST PROFITS, LOSS OF DATA, LOST REVENUES, LOST
              BUSINESS OPPORTUNITIES OR OTHER ECONOMIC ADVANTAGE, FOR ANY CAUSE
              OF ACTION, WHETHER IN CONTRACT, TORT OR OTHERWISE, ARISING OUT OF,
              OR IN ANY WAY CONNECTED WITH THESE TERMS OR THE OPERATION, USE OF,
              OR INABILITY TO USE THE SPEECHLAB SERVICE, EVEN IF WE HAVE BEEN
              ADVISED OR IS OTHERWISE AWARE OF THE POSSIBILITY OF SUCH DAMAGES;
              AND (B) IN NO EVENT SHALL OUR AGGREGATE LIABILITY, WHETHER IN
              CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE, WHETHER ACTIVE,
              PASSIVE OR IMPUTED), PRODUCT LIABILITY, STRICT LIABILITY OR OTHER
              THEORY, ARISING OUT OF OR RELATING TO THESE TERMS, SPEECHLAB OR
              ANY OF OUR ACTIONS IN CONNECTION THEREWITH, OR YOUR USE OF OR
              INABILITY TO USE THE SPEECHLAB SERVICE, EXCEED THE GREATER OF
              $100.00 OR THE COMPENSATION YOU PAY, IF ANY, TO US FOR ACCESS TO
              OR USE OF THE SPEECHLAB SERVICE. THE LIMITATIONS SET FORTH IN THIS
              SECTION 16 WILL NOT LIMIT OR EXCLUDE LIABILITY FOR THE GROSS
              NEGLIGENCE, FRAUD OR INTENTIONAL MISCONDUCT OF US OR THE OTHER
              COMPANY PARTIES OR FOR ANY OTHER MATTERS IN WHICH LIABILITY CANNOT
              BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW. ADDITIONALLY, SOME
              JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
              INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATIONS OR
              EXCLUSIONS MAY NOT APPLY TO YOU
            </Block>
          </Box>

          <Box>
            <BlockTitle>17. Release</BlockTitle>

            <Block>
              To the fullest extent permitted by applicable law, you release us
              and the other Company Parties from responsibility, liability,
              claims, demands and/or damages (actual and consequential) of every
              kind and nature, known and unknown (including claims of
              negligence), arising out of or related to disputes between users
              and the acts or omissions of third parties. If you are a consumer
              who resides in California, you hereby waive your rights under
              California Civil Code § 1542, which provides: “A general release
              does not extend to claims which the creditor does not know or
              suspect to exist in his or her favor at the time of executing the
              release, which if known by him or her must have materially
              affected his or her settlement with the debtor.”
            </Block>
          </Box>

          <Box>
            <BlockTitle>18. Termination</BlockTitle>

            <Block>
              Notwithstanding any of these Terms, we reserve the right, without
              notice and in our sole discretion, to terminate or suspend your
              account and your license to use the Speechlab Service, and to
              block or prevent future your access to and use of the Speechlab
              Service at any time with or without cause. Upon any termination of
              your right to access or use the Speechlab Service, you will cease
              all use of the Speechlab Service , and we will delete all of the
              User Content that may be stored in connection with the Speechlab
              Service. You are solely responsible for making backup copies of
              any User Content.
            </Block>
          </Box>

          <Box>
            <BlockTitle>19. Transfer and Processing Data</BlockTitle>

            <Block>
              In order for us to provide the Speechlab Service, you agree that
              we may process, transfer and store information about you in the
              United States and other countries, where you may not have the same
              rights and protections as you do under local law.
            </Block>
          </Box>

          <Box>
            <BlockTitle>
              20. Binding Arbitration; Class Waiver; Waiver of Trial by Jury
            </BlockTitle>

            <Block>
              PLEASE READ THIS SECTION CAREFULLY BECAUSE THEY REQUIRE YOU TO
              ARBITRATE DISPUTES WITH US AND LIMIT THE MANNER IN WHICH YOU CAN
              SEEK RELIEF FROM US, UNLESS YOU OPT OUT OF ARBITRATION BY
              FOLLOWING THE INSTRUCTIONS SET FORTH BELOW
              <br />
              <ul>
                <li>
                  All claims and disputes in connection with these Terms or the
                  use of the Speechlab Service that cannot be resolved
                  informally or in small claims court or disputes in which you
                  or we seek equitable and other relief for the alleged unlawful
                  use of copyrights, trademarks, trade names, logos, trade
                  secrets, or patents, you and we waive our rights to a jury
                  trial and to have any other dispute arising out of or related
                  to these Terms or the Speechlab Service, including claims
                  related to privacy and data security (collectively “Disputes”)
                  resolved in court. Instead, for any Dispute that you have
                  against us, you agree to first contact us and attempt to
                  resolve the claim informally by sending a written notice of
                  your claim (“Notice”) to us by email at info@speechlab.ai or
                  by certified mail addressed to Legal, 415 Ellsworth Street,
                  San Francisco, CA 94110. The Notice must (a) include your
                  name, residence address, email address, and telephone number;
                  (b) describe the nature and basis of the Dispute; and (c) set
                  forth the specific relief sought. Our notice to you will be
                  similar in form to that described above. If you and us cannot
                  reach an agreement to resolve the Dispute within thirty (30)
                  days after such Notice is received, then either party may
                  submit the Dispute to binding arbitration administered by
                  American Arbitration Association (“AAA”) or, under the limited
                  circumstances set forth above, in court.
                  <br />
                  <br />
                </li>
                <li>
                  <Box display='inline-block' fontWeight={800}>
                    Arbitration Rules.&nbsp;
                  </Box>
                  You and we agree that these Terms affect interstate commerce
                  and that the enforceability of this Section 20 will be
                  substantively and procedurally governed by the Federal
                  Arbitration Act, 9 U.S.C. § 1, et seq. (the “FAA”), to the
                  maximum extent permitted by applicable law. The Federal
                  Arbitration Act governs the interpretation and enforcement of
                  this dispute-resolution provision. Arbitration will be
                  initiated through the American Arbitration Association
                  (“AAA”), an established alternative dispute resolution
                  provider (“ADR Provider”) that offers arbitration as set forth
                  in this section. If AAA is not available to arbitrate, the
                  parties will select an alternative ADR Provider. The rules of
                  the ADR Provider will govern all aspects of this arbitration,
                  including but not limited to the method of initiating and/or
                  demanding arbitration, except to the extent such rules
                  conflict with these Terms or as limited by the FAA
                  (“Arbitration Rules”). The AAA Consumer Arbitration Rules
                  governing the arbitration are available online at www.adr.org
                  or by calling the AAA at 1-800-778-7879. The arbitration will
                  be conducted by a single, neutral arbitrator. The arbitrator
                  may conduct only an individual arbitration and may not
                  consolidate more than one individual’s claims, preside over
                  any type of class or representative proceeding or preside over
                  any proceeding involving more than one individual. Any claims
                  or disputes where the total amount of the award sought is less
                  than ten thousand U.S. dollars (US $10,000.00) may be resolved
                  through binding non-appearance-based arbitration, at the
                  option of the party seeking relief. Arbitration proceedings
                  will be held in San Francisco, California unless you are a
                  consumer, in which case you may elect to hold the arbitration
                  in your county of residence. For claims or disputes where the
                  total amount of the award sought is ten thousand U.S. dollars
                  (US $10,000.00) or more, the right to a hearing will be
                  determined by the Arbitration Rules. Any judgment on the award
                  rendered by the arbitrator may be entered in any court of
                  competent jurisdiction.
                </li>
                <br />
                <li>
                  Any Dispute must be filed within one year after the relevant
                  claim arose; otherwise, the Dispute is permanently barred,
                  which means that you and we will not have the right to assert
                  the claim.
                </li>
                <br />
                <li>
                  <Box display='inline-block' fontWeight={800}>
                    Additional Rules for Non-appearance Based Arbitration.&nbsp;
                  </Box>
                  If non-appearance arbitration is elected as provided above,
                  the arbitration will be conducted by telephone, online, and/or
                  based solely on written submissions; the specific manner will
                  be chosen by the party initiating the arbitration. The
                  arbitration will not involve any personal appearance by the
                  parties or witnesses unless otherwise mutually agreed by the
                  parties.
                </li>
                <br />
                <li>
                  <Box display='inline-block' fontWeight={800}>
                    Authority of the Arbitrator.&nbsp;
                  </Box>
                  The arbitrator will decide the rights and liabilities, if any,
                  of you and us, and the dispute will not be consolidated with
                  any other matters or joined with any other cases or parties.
                  The arbitrator will have the authority to grant motions
                  dispositive of all or part of any claim. The arbitrator will
                  have the authority to award monetary damages and to grant any
                  non-monetary remedy or relief available to an individual under
                  applicable law, the Arbitration Rules, and these Terms. The
                  arbitrator will issue a written award and statement of
                  decision describing the essential findings and conclusions on
                  which the award is based, including the calculation of any
                  damages awarded. The arbitrator has the same authority to
                  award relief on an individual basis that a judge in a court of
                  law would have. The award of the arbitrator is final and
                  binding upon you and us.
                </li>
                <br />
                <li>
                  <Box display='inline-block' fontWeight={800}>
                    Fees.&nbsp;
                  </Box>
                  You and we agree that for any arbitration you initiate, you
                  will pay the filing fee (up to a maximum of $250 if you are a
                  consumer), and we will pay the remaining AAA fees and costs.
                  For any arbitration initiated by us, we will pay all AAA fees
                  and costs.
                </li>
                <br />
                <li>
                  <Box display='inline-block' fontWeight={800}>
                    Waiver of Jury Trial.&nbsp;
                  </Box>
                  YOU AND US HEREBY WAIVE ANY CONSTITUTIONAL AND STATUTORY
                  RIGHTS TO GO TO COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR
                  A JURY, instead electing that all claims and disputes will be
                  resolved by arbitration under this Section. Arbitration
                  procedures are typically more limited, more efficient, and
                  less costly than rules applicable in court and are subject to
                  very limited review by a court. In the event any litigation
                  should arise between you and us in any state or federal court
                  in a suit to vacate or enforce an arbitration award or
                  otherwise, YOU AND US WAIVE ALL RIGHTS TO A JURY TRIAL,
                  instead electing that the dispute be resolved by a judge.
                </li>
                <br />
                <li>
                  <Box display='inline-block' fontWeight={800}>
                    Waiver of Class or Consolidated Actions.&nbsp;
                  </Box>
                  ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THIS SECTION MUST
                  BE ARBITRATED OR LITIGATED ON AN INDIVIDUAL BASIS AND NOT ON A
                  CLASS BASIS, AND CLAIMS OF MORE THAN ONE USER CANNOT BE
                  ARBITRATED OR LITIGATED JOINTLY OR CONSOLIDATED WITH THOSE OF
                  ANY OTHER USER. Notwithstanding any other provision in these
                  Terms, in the event that this subparagraph is deemed invalid
                  or unenforceable, neither party is entitled to arbitration and
                  instead all claims and disputes will be resolved in a court
                  located in San Francisco County, California.
                </li>
                <br />
                <li>
                  <Box display='inline-block' fontWeight={800}>
                    Confidentiality.&nbsp;
                  </Box>
                  The arbitration will allow for the discovery or exchange of
                  non-privileged information relevant to the Dispute. No part of
                  the procedures will be open to the public or the media. All
                  evidence discovered or submitted at the hearing is
                  confidential and may not be disclosed, except by written
                  agreement of the parties, pursuant to court order or unless
                  required by law. Notwithstanding the foregoing, no party will
                  be prevented from submitting to a court of law any information
                  necessary to enforce this Section, to enforce an arbitration
                  award, or to seek injunctive or equitable relief.
                </li>
                <br />
                <li>
                  <Box display='inline-block' fontWeight={800}>
                    Right to Waive. &nbsp;
                  </Box>
                  Any or all of the rights and limitations set forth in this
                  Section may be waived by the party against whom the claim is
                  asserted. Such waiver will not waive or affect any other
                  portion of this Section.
                </li>
                <br />
                <li>
                  <Box display='inline-block' fontWeight={800}>
                    Courts.&nbsp;
                  </Box>
                  In any circumstances where the foregoing Section permits the
                  parties to litigate in court, the parties hereby agree to
                  submit to the personal jurisdiction of the courts located in
                  San Francisco, California, for such purpose.
                </li>
                <br />
                <li>
                  <Box display='inline-block' fontWeight={800}>
                    Survival.&nbsp;
                  </Box>
                  This Section will survive the termination of your relationship
                  with us. If any portion of this Section is found to be
                  unenforceable or unlawful for any reason, (a) the
                  unenforceable or unlawful provision shall be severed from
                  these Terms; (b) severance of the unenforceable or unlawful
                  provision shall have no impact whatsoever on the remainder of
                  this Section or the parties’ ability to compel arbitration of
                  any remaining claims on an individual basis pursuant to this
                  Section; and (c) to the extent that any claims must therefore
                  proceed on a class, collective, consolidated, or
                  representative basis, such claims must be litigated in a civil
                  court of competent jurisdiction and not in arbitration, and
                  the parties agree that litigation of those claims shall be
                  stayed pending the outcome of any individual claims in
                  arbitration. Further, if any part of this Section is found to
                  prohibit an individual claim seeking public injunctive relief,
                  that provision will have no effect to the extent such relief
                  is allowed to be sought out of arbitration, and the remainder
                  of this Section will be enforceable.
                </li>
                <br />
                <li>
                  <Box display='inline-block' fontWeight={800}>
                    Opt-Out.&nbsp;
                  </Box>
                  You have the right to opt out of binding arbitration within 30
                  days of the date you first accepted the terms of this Section
                  20 by writing to us at Attn: Legal, 415 Ellsworth Street, San
                  Francisco, CA 94110 Telephone Number:(415) XXX-XXXX E-Mail
                  Address: info@speechlab.ai. In order to be effective, the
                  opt-out notice must include your full name and address and
                  clearly indicate your intent to opt out of binding
                  arbitration. By opting out of binding arbitration, you are
                  agreeing to resolve disputes in accordance with Section 22.
                </li>
              </ul>
            </Block>
          </Box>

          <Box>
            <BlockTitle>21. Electronic Communications</BlockTitle>

            <Block>
              You agree that communications and transactions between us may be
              conducted electronically. By creating a Speechlab Service account,
              you also consent to receive electronic communications from us
              (e.g., via email or by posting notices on our Site). These
              communications may include notices about your account (e.g.,
              payment authorizations, password changes and other transactional
              information) and are part of your relationship with us. You agree
              that any notices, agreements, disclosures or other communications
              that we send to you electronically will satisfy any legal
              communication requirements, including, but not limited to, that
              such communications be in writing.
            </Block>
          </Box>

          <Box>
            <BlockTitle>22. Governing Law and Venue</BlockTitle>

            <Block>
              These Terms will be governed by and construed in accordance with
              the laws of the State of California, without resort to its
              conflict of law provisions. The parties expressly consent to the
              venue and jurisdiction of the Federal or state courts located in
              San Francisco County, California, with respect to any actions that
              may arise out of, or relate to, these Terms or the Speechlab
              Service.
            </Block>
          </Box>

          <Box>
            <BlockTitle>23. General Provisions</BlockTitle>

            <Block>
              These Terms set forth the entire agreement and understanding of
              the parties relating to the subject matter hereof, and supersede
              all prior or contemporaneous agreements, proposals, negotiations,
              conversations, discussions and understandings, written or oral,
              with respect to such subject matter and all past dealing or
              industry custom. Neither party will, for any purpose, be deemed to
              be an agent, franchisor, franchise, employee, representative,
              owner or partner of the other party, and the relationship between
              the parties will only be that of independent contractors. Neither
              party will have any right or authority to assume or create any
              obligations or to make any representations or warranties on behalf
              of any other party, whether express or implied, or to bind the
              other party in any respect whatsoever. Except as otherwise
              provided herein, these Terms are intended solely for the benefit
              of the parties and are not intended to confer third-party
              beneficiary rights upon any other person or entity.
              Notwithstanding any other provisions of these Terms, Sections 4,
              5, 6, 7, 8, 11, 14, 15, 16, 17, 20, 21, 22, and 23 survive any
              expiration or termination of these terms. Our failure to exercise
              or enforce any right or provision of these Terms will not operate
              as a waiver of such right or provision. The section titles in
              these Terms are for convenience only and have no legal or
              contractual effect. Use of the word “including” will be
              interpreted to mean “including without limitation.” If any
              provision of these Terms are invalid, illegal, or incapable of
              being enforced by any rule of law or public policy, all other
              provisions of these Terms will nonetheless remain in full force
              and effect. Upon such determination that any provision is invalid,
              illegal, or incapable of being enforced, the parties will
              negotiate in good faith to modify these Terms so as to effect the
              original intent of the parties as closely as possible in an
              acceptable manner to the end that the transactions contemplated
              hereby are fulfilled. Neither these Terms nor any right or duty
              under these Terms may be transferred, assigned or delegated by
              you, by operation of law or otherwise, without the prior written
              consent of us, and any attempted transfer, assignment or
              delegation without such consent will be void and without effect.
              We may freely transfer or assign these Terms or its rights and
              duties under these Terms without your consent. Subject to the
              foregoing, these Terms will be binding upon and will inure to the
              benefit of the parties and their respective representatives,
              heirs, administrators, successors and permitted assigns. Our
              failure to exercise or enforce any right or provision of these
              Terms will not operate as a waiver of such right or provision.
            </Block>
          </Box>

          <Box>
            <BlockTitle>
              24. Modifying and Terminating Speechlab Services
            </BlockTitle>

            <Block>
              We may modify or stop providing any and all features of the
              Speechlab Service at any time. You also have the right to stop
              using the Speechlab Service at any time. We are not responsible
              for any loss or harm related to your inability to access or use
              the Speechlab Service.
            </Block>
          </Box>
        </Box>
      </Wrapper>
    </Page>
  );
};
