#!/usr/bin/env node

import axios from 'axios';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { Command } from 'commander';
import process from 'process';

const CONFIG_PATH = path.join(
  os.homedir(),
  '.config/cliclockwork/settings.json',
);

const program = new Command();

/**
 * Return the config file as a JSON object
 */
async function getConfig() {
  try {
    const config = await fs.readJson(CONFIG_PATH);
    return config;
  } catch (e) {
    console.error('Error reading config file:', e);
    return null;
  }
}

/**
 * Save the given data to the config file (key: value pairs)
 */
async function saveConfig(newData) {
  try {
    const config = await getConfig();
    const updatedConfig = { ...config, ...newData };
    await fs.ensureDir(path.dirname(CONFIG_PATH));
    await fs.writeJson(CONFIG_PATH, updatedConfig, { spaces: 2 });
  } catch (error) {
    console.error('Error saving config:', error);
  }
}

/**
 * Return the token, if it exists, otherwise prompt for it
 */
async function getToken() {
  const config = await getConfig();
  if (config && config.token) {
    return config.token;
  }

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'token',
      message: 'Please enter your Clockwork API token:',
    },
  ]);

  const newConfig = { token: answers.token };
  await saveConfig(newConfig);

  return answers.token;
}

/**
 * Start the timer for the given Ticket
 */
async function startTimer(issueKey) {
  const token = await getToken();
  try {
    const response = await axios.post(
      'https://api.clockwork.report/v1/start_timer',
      { issue_key: issueKey },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    const newTimer = { timer: issueKey };
    await saveConfig(newTimer);
    console.log(response.data.messages[0].body);
  } catch (error) {
    console.error('Error starting the timer:', error.response.data);
  }
}

/**
 * Stop the current timer, if any
 */
async function stopTimer() {
  const token = await getToken();
  const config = await getConfig();
  const runningTask = config?.timer;

  if (!runningTask) {
    console.error('No active timer found.');
    return;
  }

  try {
    const response = await axios.post(
      'https://api.clockwork.report/v1/stop_timer',
      { issue_key: runningTask },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    await saveConfig({ timer: null });
    console.log(response.data.messages[0].body);
  } catch (error) {
    console.error('Error stopping the timer:', error.response.data);
  }
}

/**
 * Clear current state in case of sync problems
 */
async function reset() {
  await saveConfig({ timer: null });
  console.log('Clockwork timer reset');
}
/**
 * Get the current timer, if any
 */
async function getCurrentTimer() {
  const config = await getConfig();
  const runningTask = config?.timer;

  if (!runningTask) {
    console.error('No active timer found.');
    return;
  }

  console.log(`Running timer for ticket ${runningTask}`);
}

/**
 * Print the token, if it exists, otherwise prompt for it
 */
async function authorization() {
  const token = await getToken();
  console.log(token);
}

const ASCII_ART = `
 .d8888b.  888      8888888       .d8888b.  888                   888                                     888      
d88P  Y88b 888        888        d88P  Y88b 888                   888                                     888      
888    888 888        888        888    888 888                   888                                     888      
888        888        888        888        888  .d88b.   .d8888b 888  888 888  888  888  .d88b.  888d888 888  888 
888        888        888        888        888 d88""88b d88P"    888 .88P 888  888  888 d88""88b 888P"   888 .88P 
888    888 888        888        888    888 888 888  888 888      888888K  888  888  888 888  888 888     888888K  
Y88b  d88P 888        888        Y88b  d88P 888 Y88..88P Y88b.    888 "88b Y88b 888 d88P Y88..88P 888     888 "88b 
 "Y8888P"  88888888 8888888       "Y8888P"  888  "Y88P"   "Y8888P 888  888  "Y8888888P"   "Y88P"  888     888  888`;

program
  .name('cliclockwork')
  .description(`${ASCII_ART}\n\nA little CLI to manage Clockwork in Jira.`)
  .version('1.0.0');

program
  .command('start <ticketName>')
  .description(
    'Start a timer for the given a ticket name. Starting a new timer will stop the current one.',
  )
  .action(startTimer);

program
  .command('stop')
  .description('Stop the current timer, if there is one.')
  .action(stopTimer);

program
  .command('info')
  .description('Get info if a timer is currently active.')
  .action(getCurrentTimer);

program
  .command('reset')
  .description('Reset the current timer in case of sync problems.')
  .action(reset);

program
  .command('auth')
  .description('Get the current API token or set one if it does not exist.')
  .action(authorization);

program.parse(process.argv);
