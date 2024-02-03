const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const skillSection = () => {
	// your function for extracting skills of a servent comes here
	let someText = 'Sad as fuck';
	const button1 = new ButtonBuilder()
		.setCustomId('skill1')
		.setLabel('idk what a label is, lemme see')
		.setStyle(ButtonStyle.Primary);
	const button2 = new ButtonBuilder()
		.setCustomId('skill2')
		.setLabel('still dk what label is')
		.setStyle(ButtonStyle.Secondary);
	const row = new ActionRowBuilder()
		.addComponents(button1, button2);
	return ({ content: someText, component: [row] });
};

module.exports = skillSection;