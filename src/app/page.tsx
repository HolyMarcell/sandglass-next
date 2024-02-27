import { FWC } from '~/types';
import Image from 'next/image';
import { H1, H2, Li, Ol, P, Strong } from '~/components/ui/typography';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { serverAuthOrRediect } from '~/app/util/serverAuthOrRedirect';
import { serverNotAuthOrRediect } from '~/app/util/serverNotAuthOrRedirect';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { isNil } from 'ramda';
import { redirect } from 'next/navigation';

const Block = ({children}: FWC) => {
  return (
    <div className={'bg-green-50/[0.9] w-full min-h-[200px] py-5 mt-4'}>
      {children}
    </div>
  )
}

const BlockContent = ({left, right}: { left: React.ReactNode, right: React.ReactNode }) => {
  return (
    <div className={'w-4/5 mx-auto flex flex-col space-x-5 md:flex-row'}>
      <div className={'flex-1'}>
        {left}
      </div>
      <div className={'flex-1'}>
        {right}
      </div>
    </div>
  )
}

export default async function HomePage() {
  await serverNotAuthOrRediect('/dashboard');

  return (
    <>
      <Block>
        <BlockContent
          left={
            <div className={'flex justify-center items-center h-full'}>
              <Image
                priority={true}
                placeholder={'empty'}
                src="/uptime_illustration.png" alt="Sandglass.it Reliable Uptime Tracker"
                width={400}
                height={400}
                style={{width: '400px', height: 'auto'}}
              />
            </div>}
          right={
            <>
              <H1>Welcome to Sandglass.it <br/> <small> - Your Reliable Website Uptime Tracker</small></H1>
              <P>
                Have you ever had your website go down without your knowledge? Lost potential customers and revenue
                because of unexpected downtime? We understand the frustration that comes with not knowing when your
                website goes offline. That&apos;s why we are here to help!
              </P>
              <P>
                Introducing Sandglass.it, the ultimate service for tracking the uptime of your website. With our
                cutting-edge technology and reliable monitoring system, we keep a watchful eye on your website&apos;s
                availability, alerting you instantly if any downtime occurs.
              </P>
            </>}
        />
      </Block>



      <Block>
        <BlockContent
          left={
            <>
              <H2>Why Choose Sandglass.it?</H2>
              <Ol>
                <Li>
                  <Strong> Effortless Tracking:</Strong> Our powerful tracking system constantly monitors your website,
                  checking its
                  availability from various locations around the world. You can relax knowing that we&apos;ve got you
                  covered.
                </Li>
                <Li>
                  <Strong>Instant Alerts:</Strong> Receive instant notifications via email or SMS whenever your website
                  experiences any
                  downtime. Be the first to know, allowing you to address the issue promptly and minimize any potential
                  losses.
                </Li>
                <Li>
                  <Strong>Comprehensive Reports:</Strong> Stay informed about your website&apos;s uptime history with
                  detailed reports and
                  analytics. Understand patterns, identify recurring issues, and make informed decisions to improve your
                  website&apos;s reliability.
                </Li>
              </Ol>
            </>}
          right={
            <div className={'flex justify-center items-center h-full'}>
              <Image
                priority={true}
                placeholder={'empty'}
                src="/uptime_illustration_green_pc.png" alt="Sandglass.it Uptime Dashboard alerting"
                width={400}
                height={400}
                style={{width: '400px', height: 'auto'}}
              />
            </div>}
        />
      </Block>

      <Block>
        <BlockContent
          left={
            <div className={'flex justify-center items-center h-full'}>
              <Image
                priority={true}
                placeholder={'empty'}
                src="/uptime_illustration_green.png" alt="Sandglass.it Tracks your SaaS or Service"
                width={400}
                height={400}
                style={{width: '400px', height: 'auto'}}
              />
            </div>}
          right={
            <>
              <H2>What Sandglass offers</H2>
              <Ol>
                <Li>
                  <Strong>Global Monitoring:</Strong> We provide monitoring services from multiple geographic locations,
                  ensuring that
                  you have a worldwide perspective on your website&apos;s uptime. Know how your website performs across
                  different regions and target markets.
                </Li>
                <Li>
                  <Strong>Competitive Pricing:</Strong> We understand the importance of affordability. That&apos;s why we
                  offer flexible
                  pricing plans designed to fit your unique needs and budget. Choose the plan that suits you best and
                  start monitoring your website&apos;s uptime today.
                </Li>
              </Ol>
            </>}
        />
      </Block>

      <Block>
        <BlockContent

          left={
            <>
              <H2>Sign up now</H2>
              <P>
                Don&apos;t let unexpected downtime harm your online presence and business. Sign up with Sandglass.it today
                and gain peace of mind by knowing that your website is being monitored by experts. Take control of your
                website&apos;s uptime and never miss out on valuable opportunities again!
              </P>
            </>}
          right={
            <div className={'flex flex-col justify-center items-center h-full'}>


              <P className={'w-2/3 text-center'}>
                Ready to take charge of your website&apos;s uptime? Sign up with Sandglass.it today and leave the worry
                behind.
              </P>
              <Button asChild={true} size={'xl'}>
                <Link href={'/signup'}>Sign Up</Link>
              </Button>

            </div>}
        />
      </Block>
    </>
  );
}
