const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { getServantList } = require('../../fetch');
const { makeEmbedServant, servantSkill1Embed, servantSkill2Embed, servantSkill3Embed, servantNP } = require('../../embedservant.js');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('servant')
		.setDescription('Replies with NA Servant names')
		.addIntegerOption(option =>
			option.setName('servantid')
				.setDescription('NA saint graph number of servant')
				.setRequired(true)
				.setAutocomplete(true),
		),

	async execute(interaction) {
		const skill1button = new ButtonBuilder()
			.setCustomId('s1Button')
			.setLabel('S1')
			.setStyle(ButtonStyle.Primary);
		const skill2button = new ButtonBuilder()
			.setCustomId('s2Button')
			.setLabel('S2')
			.setStyle(ButtonStyle.Primary);
		const skill3button = new ButtonBuilder()
			.setCustomId('s3Button')
			.setLabel('S3')
			.setStyle(ButtonStyle.Primary);
		const npButton = new ButtonBuilder()
			.setCustomId('npButton')
			.setLabel('NP')
			.setStyle(ButtonStyle.Secondary);
		const statsButton = new ButtonBuilder()
			.setCustomId('statsButton')
			.setLabel('Stats')
			.setStyle(ButtonStyle.Secondary);
		const buttonRow = new ActionRowBuilder()
			.addComponents(skill1button, skill2button, skill3button, statsButton, npButton);


		await (interaction).deferReply();
		const servantnumber = await interaction.options.getInteger('servantid');
		const servant = (await getServantList()).find(e => e.id === servantnumber);
		const embedpng = await makeEmbedServant(servant);
		const response = await (interaction).editReply({ embeds: [embedpng], components:[buttonRow] });
		await buttonPress(response, buttonRow, servant);
	},
	async autocomplete(interaction) {

		const focusedValue = interaction.options.getFocused().toLowerCase();
		const possibleServants = (await getServantList()).filter(e => e.name.toLowerCase().startsWith(focusedValue)).slice(0, 25);
		await interaction.respond(
			possibleServants.map(x => ({ name: `${x.className} ${x.name}`, value: x.id })),
		);
	},
};
async function buttonPress(response, buttonRow, servant) {
	const button = await response.awaitMessageComponent();
	await button.deferUpdate();
	if (button.customId === 's1Button') {
		const s1Embed = await servantSkill1Embed(servant);
		await button.editReply({ embeds: [s1Embed], components: [buttonRow] });
	}
	if (button.customId === 's2Button') {
		const s2Embed = await servantSkill2Embed(servant);
		await button.editReply({ embeds: [s2Embed], components: [buttonRow] });
	}
	if (button.customId === 's3Button') {
		const s3Embed = await servantSkill3Embed(servant);
		await button.editReply({ embeds: [s3Embed], components: [buttonRow] });
	}
	if (button.customId === 'npButton') {
		const npEmbed = await servantNP(servant);
		await button.editReply({ embeds: [npEmbed], components: [buttonRow] });
	}
	if (button.customId === 'statsButton') {
		const statsEmbed = makeEmbedServant(servant);
		await button.editReply({ embeds: [statsEmbed], components: [buttonRow] });
	}


	buttonPress(response, buttonRow, servant);
}