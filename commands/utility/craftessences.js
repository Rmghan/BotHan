const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getCeList } = require('../../fetch');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('craftessence')
		.setDescription ('outputs CE information')
		.addIntegerOption(option =>
			option.setName('ce_id')
				.setDescription('input CE ID')
				.setRequired(true)
				.setAutocomplete(true),
		),
	async execute(interaction) {
		await (interaction).deferReply();
		const craftEssenceNumber = await interaction.options.getInteger('ce_id');
		const CE = (await getCeList()).find(e => e.id === craftEssenceNumber);
		const MLBeffect = CE.skills.find(e => e.num === 1 && e.priority === 2);
		const embedpng = new EmbedBuilder()
			.setTitle(`${CE.name} ${CE.rarity}*`)
			.setThumbnail(CE.extraAssets.faces.equip[craftEssenceNumber])
			.addFields(
				{
					name : 'HP',
					value: `${CE.hpBase}/${CE.hpMax}`,
					inline: true,
				},
				{
					name: 'Atk',
					value: `${CE.atkBase}/${CE.atkMax}`,
					inline: true,

				},
				{
					name: '\u200B',
					value: '\u200B',
				},
				{
					name: 'Effects',
					value: `${CE.skills[0].detail}`,
				},
				{
					name: 'MLB Effects',
					value: `${MLBeffect.detail}`,
				},
			);

		await (interaction).editReply({ embeds: [embedpng] });
	},
	async autocomplete(interaction) {

		const focusedValue = interaction.options.getFocused().toLowerCase();
		const possibleCEs = (await getCeList()).filter(e => e.name.toLowerCase().startsWith(focusedValue)).slice(0, 25);
		await interaction.respond(
			possibleCEs.map(x => ({ name: x.name, value: x.id })),
		);
	},

};