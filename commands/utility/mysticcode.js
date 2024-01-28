const { SlashCommandBuilder } = require('discord.js');
const { getMysticCodeList } = require('../../fetch');
const { makeEmbedMC } = require('../../embedMC');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('mystic_codes')
		.setDescription ('outputs mystic code information')
		.addIntegerOption(option =>
			option.setName('mystic_code_id')
				.setDescription('input Mystic Code ID')
				.setRequired(true)
				.setAutocomplete(true),
		),
	async execute(interaction) {
		await (interaction).deferReply();
		const mysticCodeNumber = await interaction.options.getInteger('mystic_code_id');
		const MC = (await getMysticCodeList()).find(e => e.id === mysticCodeNumber);
		const embedpng = await makeEmbedMC(MC);

		await (interaction).editReply({ embeds: [embedpng] });
	},
	async autocomplete(interaction) {

		const focusedValue = interaction.options.getFocused().toLowerCase();
		const possibleMCs = (await getMysticCodeList()).filter(e => e.name.toLowerCase().startsWith(focusedValue)).slice(0, 25);
		await interaction.respond(
			possibleMCs.map(x => ({ name: x.name, value: x.id })),
		);
	},

};