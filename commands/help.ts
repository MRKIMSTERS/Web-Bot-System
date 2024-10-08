import type { Settings, CommandType } from "./types/CommandType";

// Typescript sucks, believe me, don't use it for this sake.

const { commands, config, aliases } = global.Webbot as {
  commands: { [key: string]: CommandType };
  config: { [key: string]: string };
  aliases: { [key: string]: string };
};

export class Command {
  public settings: Settings = {
    name: "help2",
    version: "1.1.0",
    category: "system",
    cooldown: "10",
    permission: "0",
    creator: "MrkimstersDEV x Liane Cagara",
    description: "Shows all commands or detailed info about a specific command",
    noPrefix: true,
  };

  async main({ send, event, args }) {
    const commandsPerPage: number = 10;
    const validCommands: CommandType[] = Object.values(commands);
    const totalCommands: number = validCommands.length;
    const totalPages: number = Math.ceil(totalCommands / commandsPerPage);

    if (args[0] === "all") {
      const categorizedCommands = {};

      for (const command of validCommands) {
        const category: string = command.settings.category || "Uncategorized";
        if (!categorizedCommands[category]) {
          categorizedCommands[category] = [];
        }
        categorizedCommands[category].push(command.settings.name);
      }

      let result: string = "✨ All Commands\n\n";

      for (const [category, commandsList] of Object.entries(
        categorizedCommands,
      )) {
        result += `『 ${category} 』\n${(commandsList as string[]).join(", ")}\n\n`;
      }

      return send(result.trim());
    }

    if (args[0] && isNaN(parseInt(args[0], 10))) {
      const commandName = args[0];
      const command = validCommands.find(
        (cmd) => cmd.settings.name === commandName,
      );

      if (!command) {
        return send("Command not found.");
      }

      const { settings } = command;
      const description = settings.description || "No description available.";

      return send(
        `『 ${settings.name} 』\n${description}\n\n` +
          `•  Version: ${settings.version || "1.0"}\n` +
          `•  Category: ${settings.category || "General"}\n` +
          `•  Cooldown: ${settings.cooldown || 0}\n` +
          `•  Permission: ${settings.permission || 0} (All users)\n` +
          `• Aliases: ${settings.aliases ? settings.aliases.join(", ") : "None"}` +
          `•  Creator: ${settings.creator || "Unknown"}`,
      );
    }

    let page = parseInt(args[0], 10) || 1;
    if (page < 1) page = 1;

    if (page > totalPages) {
      return send(
        `Page ${page} is not available. There are only ${totalPages} pages.`,
      );
    }

    let result = `✨ Commands List\n\n`;
    let index = (page - 1) * commandsPerPage + 1;
    const commandsList: CommandType[] = validCommands.slice(
      (page - 1) * commandsPerPage,
      page * commandsPerPage,
    );

    for (const command of commandsList) {
      const { settings }: { settings: Settings } = command;
      const description: string =
        settings.description || "No description available.";
      result += `『 ${index++} 』 ${settings.name}: ${description}\n`;
    }
    result += `\n» Page: ${page}/${totalPages}\n» Use ${config.PREFIX}help [page number] to display the information on the additional pages.`;

    send(result);
  }
}
