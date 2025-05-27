// import { ConfigField } from "./ConfigurationForm";

// Mock data for available apps
export const availableApps = [
  { id: "gmail", name: "Gmail", icon: "📧", category: "Email" },
  { id: "slack", name: "Slack", icon: "💬", category: "Communication" },
  { id: "dropbox", name: "Dropbox", icon: "📁", category: "Storage" },
  { id: "sheets", name: "Google Sheets", icon: "📊", category: "Spreadsheets" },
  { id: "calendar", name: "Google Calendar", icon: "📅", category: "Calendar" },
  { id: "twitter", name: "Twitter", icon: "🐦", category: "Social Media" },
  { id: "facebook", name: "Facebook", icon: "👍", category: "Social Media" },
  { id: "trello", name: "Trello", icon: "📋", category: "Project Management" },
];

// Mock data for triggers and actions
export const appTriggers = {
  gmail: [
    {
      id: "new_email",
      name: "New Email",
      description: "Triggers when a new email is received",
    },
    {
      id: "new_labeled_email",
      name: "New Labeled Email",
      description: "Triggers when an email with a specific label is received",
    },
  ],
  slack: [
    {
      id: "new_message",
      name: "New Message",
      description: "Triggers when a new message is posted to a channel",
    },
    {
      id: "new_mention",
      name: "New Mention",
      description: "Triggers when you are mentioned in a channel",
    },
  ],
  // Add more app triggers as needed
};

export const appActions = {
  gmail: [
    { id: "send_email", name: "Send Email", description: "Send a new email" },
    {
      id: "create_draft",
      name: "Create Draft",
      description: "Create a new draft email",
    },
  ],
  slack: [
    {
      id: "send_message",
      name: "Send Message",
      description: "Send a message to a channel",
    },
    {
      id: "create_channel",
      name: "Create Channel",
      description: "Create a new channel",
    },
  ],
  // Add more app actions as needed
};

// Mock configuration fields by event ID
// export const mockConfigFields: Record<string, ConfigField[]> = {
//   new_email: [
//     {
//       id: "folder",
//       label: "Folder",
//       type: "select",
//       options: [
//         { value: "inbox", label: "Inbox" },
//         { value: "sent", label: "Sent" },
//         { value: "drafts", label: "Drafts" },
//       ],
//     },
//   ],
//   send_email: [
//     {
//       id: "to",
//       label: "To",
//       type: "email",
//       placeholder: "recipient@example.com",
//     },
//     {
//       id: "subject",
//       label: "Subject",
//       type: "text",
//       placeholder: "Email Subject",
//     },
//   ],
//   new_message: [
//     {
//       id: "channel",
//       label: "Channel",
//       type: "select",
//       options: [
//         { value: "general", label: "#general" },
//         { value: "random", label: "#random" },
//       ],
//     },
//   ],
//   send_message: [
//     {
//       id: "channel",
//       label: "Channel",
//       type: "select",
//       options: [
//         { value: "general", label: "#general" },
//         { value: "random", label: "#random" },
//       ],
//     },
//     {
//       id: "message",
//       label: "Message",
//       type: "text",
//       placeholder: "Your message",
//     },
//   ],
// };

// export type Step = {
//   id: string;
//   type: "trigger" | "action";
//   appId: string;
//   eventId: string;
//   config: { [key: string]: string };
// };
