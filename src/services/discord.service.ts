import { Client, GatewayIntentBits, Partials, Message } from 'discord.js';
import { handleIncomingMessage } from './message_handler.service';

export const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel] // Required to receive DMs
});

export const launchDiscordBot = async () => {
    const token = process.env.DISCORD_BOT_TOKEN;
    if (!token || token === 'your_discord_bot_token' || token === 'dummy_token') {
        console.warn('⚠️ DISCORD_BOT_TOKEN missing or invalid. Discord bot skipped.');
        return;
    }

    discordClient.once('ready', () => {
        console.log(`🚀 Discord Bot logged in as ${discordClient.user?.tag}`);
    });

    discordClient.on('messageCreate', async (message: Message) => {
        // Ignore messages from other bots or itself
        if (message.author.bot) return;

        // Process direct DMs or mentions in guilds
        const isDM = !message.guild;
        const isMentioned = message.mentions.users.has(discordClient.user?.id || '');

        if (isDM || isMentioned) {
            const userId = message.author.id;
            const userName = message.author.username;
            let text = message.content;

            // Strip the bot mention if mentioned in a guild
            if (isMentioned && discordClient.user) {
                const mentionRegex = new RegExp(`<@!?${discordClient.user.id}>`, 'g');
                text = text.replace(mentionRegex, '').trim();
            }

            try {
                // Route message to NLP and handle reminder creation
                await handleIncomingMessage('discord', userId, userName, text);
            } catch (error) {
                console.error('Discord Message Error:', error);
                await message.reply('Sorry, I encountered an error processing your request.');
            }
        }
    });

    try {
        console.log('🚀 Attempting to launch Discord Bot...');
        await discordClient.login(token);
    } catch (error) {
        console.error('❌ Failed to login to Discord:', error);
    }
};
