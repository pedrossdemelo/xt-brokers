import { Timeline } from "flowbite-react";

export default function Announcements() {
  return (
    <div className="p-4 max-w-md md:px-6">
      <h3 className="font-medium text-xl mb-4">Announcements</h3>

      <Timeline>
        <Timeline.Item>
          <Timeline.Point />

          <Timeline.Content>
            <Timeline.Time>23 July 2022</Timeline.Time>

            <Timeline.Title>Realtime updates are now live!</Timeline.Title>

            <Timeline.Body>
              <span className="text-sm">
                Supabase fixed a bug that caused the realtime subscriptions
                triggers to not work. The<> </>
                <a
                  className="text-blue-700 underline"
                  href="https://github.com/supabase/realtime/issues/268#issuecomment-1193184394"
                >
                  issue
                </a>{" "}
                was reported and fixed within 24 hours. Props to them!
              </span>
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Point />

          <Timeline.Content>
            <Timeline.Time>18 July 2022</Timeline.Time>

            <Timeline.Title>Deposits are now free!</Timeline.Title>

            <Timeline.Body>
              <span className="text-sm">
                The manager has gone crazy! We are now accepting deposits
                without fees, and... without any payments! That&apos;s right, we
                are giving free fake virtual money!
              </span>
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Point />

          <Timeline.Content>
            <Timeline.Time>9 July 2022</Timeline.Time>

            <Timeline.Title>XT Inc. is hiring!</Timeline.Title>

            <Timeline.Body>
              <span className="text-sm">
                Brazil&apos;s leading financial services company is opening up
                100 positions tailored towards early-career software engineers.
                Let&apos;s hope they notice me!
              </span>
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
