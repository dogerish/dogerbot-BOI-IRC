const readline = require("readline"); // for taking input from terminal
const Discord = require("discord.js");
const client = new Discord.Client(); // bot client
// config
const config = require("./config.json");

var channel; // channel to send stuff to

client.on('ready', async () => 
{
	try
	{
		let guild = await client.guilds.resolve(config.channel[0]);
		channel = await guild.channels.resolve(config.channel[1]);
	}
	catch (err) { console.error("Failed to get channel!", err); }
	console.log("Ready.");
});

const rl = readline.createInterface
({
	input: process.stdin,
	output: process.stdout
});

// close everything
function close()
{
	client.destroy();
	rl.close();
}

// closing with ctrl-d or ctrl-c
rl.on("close", close);

// relay every line to discord
rl.on("line", input => 
{
	// quitting
	if (input == "/exit" || input == "/quit" || input == "/q")
		close();
	else
		channel.send(input).catch(console.error);
});

// log the bot in
client.login(config.token);
