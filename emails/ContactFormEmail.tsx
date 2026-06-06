import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from "jsx-email";

export type ContactFormEmailProps = {
  name: string;
  email: string;
  topicLabel: string;
  message: string;
  submittedAt: string;
  recipientEmail: string;
};

const pageBackground = "#f7f3f8";
const cardBackground = "#fbf7fb";
const textColor = "#52325b";
const mutedColor = "#76547d";
const accentColor = "#7c2d86";
const borderColor = "#542a5a2e";

export function ContactFormEmail({
  name,
  email,
  topicLabel,
  message,
  submittedAt,
  recipientEmail,
}: ContactFormEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{`New contact form message from ${name}`}</Preview>
      <Body style={{ backgroundColor: pageBackground, margin: 0, padding: "24px 0" }}>
        <Container
          style={{
            backgroundColor: cardBackground,
            border: `1px solid ${borderColor}`,
            borderRadius: "12px",
            margin: "0 auto",
            maxWidth: "560px",
            padding: "28px 24px",
          }}
        >
          <Heading
            as="h1"
            style={{
              color: textColor,
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "28px",
              fontWeight: 600,
              lineHeight: "1.2",
              margin: "0 0 8px",
            }}
          >
            New contact form message
          </Heading>
          <Text
            style={{
              color: mutedColor,
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "14px",
              lineHeight: "1.5",
              margin: "0 0 20px",
            }}
          >
            A visitor submitted the contact form on the Aunt Becks Place website.
          </Text>

          <Section
            style={{
              backgroundColor: "#ffffff",
              border: `1px solid ${borderColor}`,
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <Text
              style={{
                color: mutedColor,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                margin: "0 0 4px",
                textTransform: "uppercase",
              }}
            >
              Name
            </Text>
            <Text
              style={{
                color: textColor,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "16px",
                lineHeight: "1.5",
                margin: "0 0 16px",
              }}
            >
              {name}
            </Text>

            <Text
              style={{
                color: mutedColor,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                margin: "0 0 4px",
                textTransform: "uppercase",
              }}
            >
              Email
            </Text>
            <Text
              style={{
                color: accentColor,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "16px",
                lineHeight: "1.5",
                margin: "0 0 16px",
              }}
            >
              <Link
                href={`mailto:${email}`}
                style={{ color: accentColor, textDecoration: "underline" }}
              >
                {email}
              </Link>
            </Text>

            <Text
              style={{
                color: mutedColor,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                margin: "0 0 4px",
                textTransform: "uppercase",
              }}
            >
              Topic
            </Text>
            <Text
              style={{
                color: textColor,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "16px",
                lineHeight: "1.5",
                margin: "0 0 16px",
              }}
            >
              {topicLabel}
            </Text>

            <Text
              style={{
                color: mutedColor,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                margin: "0 0 4px",
                textTransform: "uppercase",
              }}
            >
              Message
            </Text>
            <Text
              style={{
                color: textColor,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            >
              {message}
            </Text>
          </Section>

          <Hr style={{ borderColor, margin: "20px 0" }} />

          <Text
            style={{
              color: mutedColor,
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "13px",
              lineHeight: "1.5",
              margin: 0,
            }}
          >
            Sent to {recipientEmail} on {submittedAt}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
