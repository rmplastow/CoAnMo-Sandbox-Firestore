import { CoAnMoPluginCliActions } from "coanmo-plugin-cli";
import { about } from "./about";
import { connect } from "./connect";

export const actions = [
  about,
  connect,
  ...CoAnMoPluginCliActions
];
