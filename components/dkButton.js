const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const dkButton = () => {
	const button1 = new ButtonBuilder()
		.setCustomId('button1')
		.setLabel('idk what a label is, lemme see')
		.setStyle(ButtonStyle.Primary);
	const button2 = new ButtonBuilder()
		.setCustomId('button2')
		.setLabel('still dk what label is')
		.setStyle(ButtonStyle.Secondary);
	const row = new ActionRowBuilder()
		.addComponents(button1, button2);
	return row;
};

module.exports = dkButton;