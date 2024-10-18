# CLI Clockwork

CLI Clockwork is a command-line interface (CLI) tool for managing Clockwork timers on Jira issues. It allows you to start, stop, and get information about active timers directly from your terminal using the Clockwork API for Jira time tracking.

It can also generate a report to use during your daily, eventually generated with ChatGPT if you have a OpenAI API Key saved in your system.

## Features

- Start a timer for a specific Jira issue.
- Stop the currently running timer.
- Retrieve information about the current active timer.
- Create a report of the work done yesterday, to help during daily meetings. (Textual if you have OpenAI API Key saved in your system, otherwise in JSON format)
- Save and reuse your Clockwork API token.

## Installation

1. Clone the repository or download the script.
2. Ensure you have Node.js installed on your machine.
3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Make the script executable:

   ```bash
   chmod +x cliclockwork.mjs
   ```

## Create an Alias

For convenience, you can create an alias to use the command with a shorter name, such as `cw`.

### Bash

Add the following line to your `~/.bashrc` file:

```bash
alias cw='~/path/to/cliclockwork.mjs'
```

Then, reload your `~/.bashrc` file:

```bash
source ~/.bashrc
```

### Zsh

Add the following line to your `~/.zshrc` file:

```bash
alias cw='~/path/to/cliclockwork.mjs'
```

Then, reload your `~/.zshrc` file:

```bash
source ~/.zshrc
```

### Fish

Add the following line to your `~/.config/fish/config.fish` file:

```fish
alias cw '~/path/to/cliclockwork.mjs'
```

Then, reload your Fish config:

```fish
source ~/.config/fish/config.fish
```

## Usage

Before using the CLI commands, you need to save your Clockwork API token. This only needs to be done once.

### Save API Token

Retrieve and save your Clockwork API token for future use:

```bash
cw auth
```

### Start a Timer

Start a timer for a specific Jira issue key.

```bash
cw start <issueKey>
```

### Stop the Timer

Stop the currently running timer.

```bash
cw stop
```

### Get Timer Info

Get information about the currently running timer.

```bash
cw info
```

### Reset in case of problems

Sometimes some inconsistency can happen, e.g. when you start a timer from the CLI but you stop in through the web interface.
In this case, the timer is stopped but your CLI does not know that. You can use this command to reset the timer.

```bash
cw reset
```

### Create daily report
Create a report of the work done yesterday, to help during daily meetings.

If you have the OpenAI API Key saved in path, then the CLI will send the prompt to ChatGPT to generate a textual report in form of notes. It generate automatically the text in Markdown, so you can easily copy/paste the text where you want (or keep it in the terminal, as you want).

If you are not interested in the AI capabilities and you do not have a OpenAI API key, then the CLI will just generate a JSON report.

```bash
cw daily
```

### Help

For help and more information about the available commands:

```bash
cw --help
```

## Configuration

The CLI stores the Clockwork API token and the active timer information in a configuration file located at `~/.config/cliclockwork/settings.json`. The first time you run the CLI, it will prompt you to enter your Clockwork API token, which will then be saved for future use.

## Example

Here's an example workflow using the CLI:

1. Save your API token:

   ```bash
   cw auth
   ```

2. Start a timer for a Jira issue:

   ```bash
   cw start SSP-13
   ```

   Output:

   ```
   Clockwork timer started: Counting working time on SSP-13 for John Doe
   ```

3. Get information about the currently running timer:

   ```bash
   cw info
   ```

   Output:

   ```
   Running timer for ticket SSP-13
   ```

4. Stop the running timer:

   ```bash
   cw stop
   ```

   Output:

   ```
   Clockwork timer stopped: Will report 30m on behalf of John Doe
   ```
