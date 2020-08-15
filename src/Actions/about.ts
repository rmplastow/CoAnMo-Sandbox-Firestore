import { ActionI } from "coanmo-plugin-cli";

export interface SectionI {
  heading: string;
  main: string;
}

const sections: SectionI[] = [
  {
    heading: "Create a new Google Cloud account",
    main: `
@TODO write these instructions`
  },
  {
    heading: "Create a new Project",
    main: `
@TODO write these instructions`
  },
  {
    heading: "Create a new Firebase database",
    main: `
@TODO write these instructions`
  },
  {
    heading: "Create a collection called ‘things’",
    main: `
@TODO write these instructions`
  },
  {
    heading: "Store configuration in this CoAnMo",
    main: `
@TODO write these instructions`
  },
  {
    heading: "Connect this CoAnMo to the database",
    main: `
@TODO write these instructions`
  },
  {
    heading: "Add a ‘thing’ to the collection",
    main: `
@TODO write these instructions`
  },
  {
    heading: "List all ‘things’ in the collection",
    main: `
@TODO write these instructions`
  },
  {
    heading: "Remove ‘things’ with a given title",
    main: `
@TODO write these instructions`
  },
];

export const about: ActionI = {
  name: "about",
  summary: "Step-by-step instructions",
  synopsis:
`To show all step-by-step instructions:
  > about
To show just the third section:
  > about 3`,
  fn(args: string[]) {
    if (args.length === 0)
      return `These instructions explain how to:\n${
        sections.map( ({heading}, index) =>
          `  ${index + 1}. ${heading}` ).join("\n")
      }\n${
        sections.map( ({heading, main}, index) =>
        `\n${"-".repeat(40)}\n${index + 1}: ${heading}\n${main}` ).join("\n")
      }`;
    if (args.length !== 1)
      return `ERROR: 'about' expected 0 or 1 args, but got ${args.length}`;
    if (args[0][0] === '0' || ! /^\d+$/.test(args[0]))
      return `ERROR: 'about' expected a positive integer, but got '${args[0]}'`;
    const sectionIndex = (+args[0]) - 1;
    const section = sections[sectionIndex];
    if (!section)
      return `ERROR: 'about' has no section '${args[0]}' — try '1'`;
    return `${sectionIndex + 1}. ${section.heading}\n${section.main}`;
  }
};
