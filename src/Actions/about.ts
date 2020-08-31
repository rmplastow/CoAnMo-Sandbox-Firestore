import { ActionI } from "coanmo-plugin-cli";

export interface SectionI {
  heading: string;
  main: string;
}

const sections: SectionI[] = [
  {
    heading: "Create a new Google account",
    main: `
Assuming you’re not already signed in
to a Google account:
• Visit https://google.com/account
• Click ‘Create account’, ‘For myself’
• Enter name, eg Jo Fbase
• Choose email, eg jo.fbase@gmail.com
• Choose password, eg GFCW_701_mxvb
• Click ‘Next’, enter your mobile number
• Click ‘Next’, enter the SMS code
@TODO complete these instructions`
  },
  {
    heading: "Start a free Google Cloud trial",
    main: `
Assuming you have a Google account:
• Sign in at https://google.com/account
• Visit https://cloud.google.com
• Click ‘Get started for free’
• Agree to ‘Terms of Service’
• Click ‘Continue’
• Choose ‘Individual’ for ‘Account Type’
• Enter name, address and credit card
• Click ‘Start my free trial’, ‘Got it’`
  },
  {
    heading: "Create a new project",
    main: `
Assuming you signed in to Google Cloud:
• Visit https://console.cloud.google.com
• Click ‘IAM & Admin’ in the sidebar
• Click ‘Manage Resources’
• Click ‘Create Project’
• Choose ‘CoAnMo 1’ for ‘Project name’
• Choose ‘coanmo-1’ for ‘Project ID’
• Click ‘Create’`
  },
  {
    heading: "Delete projects you don’t need",
    main: `
Assuming you signed in to Google Cloud:
• Visit https://console.cloud.google.com
• Click ‘IAM & Admin’ in the sidebar
• Click ‘Manage Resources’
• Copy a project’s id
• Click ‘⋮’, ‘Delete’ for that project
• Enter the project’s id
• Click ‘Shut down’`
  },
  {
    heading: "Create a Firestore database",
    main: `
Assuming you signed in to Google Cloud:
• Visit https://console.cloud.google.com
• Select ‘CoAnMo 1’ in the header
• Click ‘Firestore’ in the sidebar
• Click ‘Select native mode’
• Choose ‘us-east1’, an Always Free Tier
• Click ‘Create database’ and wait`
  },
  {
    heading: "Create a collection called ‘things’",
    main: `
Assuming you have created a Firestore
database in ‘native mode’:
• Visit https://console.cloud.google.com
• Click ‘Firestore’ in the sidebar
• Click ‘Start collection’
• Collection ID: 'things'
• Document ID: 'thing-0'
• Field name: 'title' (keep as ‘string’)
• Field value: ‘Thing 0’, click ‘Save’`
  },
  {
    heading: "Add Firebase to a project",
    main: `
Assuming you have created a project
called ‘CoAnMo 1’ containing a Firestore
collection called ‘things’:
• https://console.firebase.google.com
• Click ‘Add project’
• Choose ‘CoAnMo 1’, click ‘Continue’
• Click ‘Confirm Plan’
• Disable Google Analytics
• Click ‘Add Firebase’, wait, ‘Continue’
• Click ‘Cloud Firestore’, see ‘thing-0’`
  },
  {
    heading: "Add Firebase to your web app",
    main: `
Assuming you have added Firebase to your
‘CoAnMo 1’ project:
• https://console.firebase.google.com
• Click ‘ConAnMo 1’
• Click the cogweel icon, top left
• Click ‘Project settings’
• Click the Web icon, ‘&lt/>’
• Enter ‘CoAnMo App’ for ‘App nickname’
• Click ‘Register app’
• Click ‘Continue to the console’`
  },
  {
    heading: "Store configuration in this CoAnMo",
    main: `
@TODO write these instructions`
  },
  {
    heading: "Connect this CoAnMo to Firebase",
    main: `
@TODO write these instructions`
  },
  {
    heading: "List all ‘things’ in the Firestore",
    main: `
@TODO write these instructions`
  },
  {
    heading: "Add a ‘thing’ to the Firestore",
    main: `
@TODO write these instructions`
  },
  {
    heading: "Remove ‘things’ with a given title",
    main: `
@TODO write these instructions`
  }
];

export const about: ActionI = {
  name: "about",
  summary: "Step-by-step instructions",
  synopsis: `To show all step-by-step instructions:
  > about
To show just the third section:
  > about 3`,
  fn(args: string[]) {
    if (args.length === 0)
      return `These instructions explain how to:\n${sections
        .map(({ heading }, index) => `  ${index + 1}. ${heading}`)
        .join("\n")}\n${sections
        .map(
          ({ heading, main }, index) =>
            `\n${"-".repeat(40)}\n${index + 1}: ${heading}\n${main}`
        )
        .join("\n")}`;
    if (args.length !== 1)
      return `ERROR: 'about' expected 0 or 1 args, but got ${args.length}`;
    if (args[0][0] === "0" || !/^\d+$/.test(args[0]))
      return `ERROR: 'about' expected a positive integer, but got '${args[0]}'`;
    const sectionIndex = +args[0] - 1;
    const section = sections[sectionIndex];
    if (!section) return `ERROR: 'about' has no section '${args[0]}' — try '1'`;
    return `${sectionIndex + 1}. ${section.heading}\n${section.main}`;
  }
};
