import "./style";
import { description, name, version } from "../package.json";
import { CoAnMoPluginCli } from "coanmo-plugin-cli";
import { actions } from "./Actions/actions";

class CoAnMoSandboxFirestore {
  private cli: CoAnMoPluginCli;

  constructor(
    name: string,
    version: string,
    selector: string,
    doc: HTMLDocument,
    meta: string,
  ) {
    this.cli = new CoAnMoPluginCli(
      name,
      version,
      `${selector} .stdin`,
      `${selector} .stdout`,
      doc,
      meta,
      window.localStorage
    );

    this.cli.addActions(actions);
    this.cli.log(
      ["-".repeat(40),
      description,
      "To get started, run:",
      "  > about",
      "-".repeat(40)
    ].join("\n"));
  }

  receiveMessage(event: MessageEvent) {
    // @TODO add validation and security
    if (typeof event.data === "string") this.cli.run(event.data);
  }
}

const coanmo = new CoAnMoSandboxFirestore(
  name,
  version,
  "#coanmo-sandbox-firestore",
  document,
  'Sandbox-Firestore'
);

window.addEventListener(
  "message",
  (event: MessageEvent) => coanmo.receiveMessage(event),
  false
);
