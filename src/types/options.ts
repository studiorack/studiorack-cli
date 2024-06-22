import { PluginTemplate, Tools } from '@studiorack/core';

export interface CliOptions {
  json?: boolean;
  log?: boolean;
}

export interface CliRunOptions extends CliOptions {
  tool: keyof Tools;
}

export interface CliValidateOptions extends CliOptions {
  files?: boolean;
  summary?: boolean;
  txt?: boolean;
  zip?: boolean;
}

export interface CliPluginCreateOptions extends CliOptions {
  type?: keyof PluginTemplate;
}

export interface CliProjectCreateOptions extends CliOptions {
  prompt?: boolean;
}
