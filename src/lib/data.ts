// import { ConfigField } from "./ConfigurationForm";

// Mock data for available apps
export const availableTrigger = {
  webhook: [
    {
      id: "webhook",
      name: "Webhook",
      description: "Trigger when the webhook is hit",
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
  dropbox: [
    {
      id: "new_file",
      name: "New File",
      description: "Triggers when a new file is added to Dropbox",
    },
  ],
  sheets: [
    {
      id: "new_row",
      name: "New Row",
      description: "Triggers when a new row is added in Sheets",
    },
  ],
  // Add others like calendar, twitter, facebook, etc.
};

// Mock data for triggers and actions
export const descTriggers = {
  webhook: [
    {
      id: "webhook",
      name: "give a predefined webhook",
      description: "trigger when the webhook is hit",
    },
  ],
  // slack: [
  //   {
  //     id: "new_message",
  //     name: "New Message",
  //     description: "Triggers when a new message is posted to a channel",
  //   },
  //   {
  //     id: "new_mention",
  //     name: "New Mention",
  //     description: "Triggers when you are mentioned in a channel",
  //   },
  // ],
  // Add more app triggers as needed
};

export const availableActions = {
  email: [
    { id: "send_email", name: "Send Email", description: "Send a new email" },
  ],
  solana: [
    {
      id: "transfer_sol",
      name: "Transfer Solana",
      description: "Send solana to given address",
    }
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
