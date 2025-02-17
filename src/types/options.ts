export interface CliOptions {
  json?: boolean;
  log?: boolean;
}

export interface CliValidateOptions extends CliOptions {
  files?: boolean;
  summary?: boolean;
  txt?: boolean;
  zip?: boolean;
}

export interface CliProjectCreateOptions extends CliOptions {
  prompt?: boolean;
}
