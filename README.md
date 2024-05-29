# CLI Clockwork

CLI Clockwork is a command-line interface (CLI) tool for managing Clockwork timers on Jira issues. It allows you to start, stop, and get information about active timers directly from your terminal using the Clockwork API for Jira time tracking.

## Features

- Start a timer for a specific Jira issue.
- Stop the currently running timer.
- Retrieve information about the current active timer.
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
