const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getCCList } = require('../../fetch');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('commandcodes')
		.setDescription ('outputs command code information')
		.addIntegerOption(option =>
			option.setName('cc_id')
				.setDescription('input CC ID')
				.setRequired(true)
				.setAutocomplete(true),
		),
	async execute(interaction) {
		await (interaction).deferReply();
		const commandCodeNumber = await interaction.options.getInteger('cc_id');
		const CC = (await getCCList()).find(e => e.id === commandCodeNumber);
		const embedpng = new EmbedBuilder()
			.setTitle(`${CC.name} ${CC.rarity}*`)
			.setThumbnail(CC.extraAssets.faces.cc[commandCodeNumber])
			.addFields(
				{
					name: 'Effects',
					value: `${CC.skills[0].detail}`,
				},
			);

		await (interaction).editReply({ embeds: [embedpng] });
	},
	async autocomplete(interaction) {

		const focusedValue = interaction.options.getFocused().toLowerCase();
		const possibleCEs = (await getCCList()).filter(e => e.name.toLowerCase().startsWith(focusedValue)).slice(0, 25);
		await interaction.respond(
			possibleCEs.map(x => ({ name: x.name, value: x.id })),
		);
	},

};